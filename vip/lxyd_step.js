/*
* 使用方法
* [MINT] hostname = sports.lifesense.com
* # 乐心运动刷步数
*/
const step = init();
const time_key = 'yd_xg_time';  /*运动修改时间，防止重复修改每日只修改一次，且必须过早晨9点*/
const step_key = 'yd_step_count'; /*修改的步数*/

let time = step.getdata(time_key);
let stepCount = step.getdata(step_key);
let curTime = new Date().getTime();
if (!time || time == '') {
  // 未设置过
  if (!isOffTime(curTime)) {
    // 未超出指定时间
    step.done();
    step.msg(`乐心运动`, `时间早于9点，请晚点再试`, ``);
  } else {
    doMerge();
  }
} else if (!isToday(time)) {
  // 上次设置不是今天
  if (!isOffTime(curTime)) {
    // 未超出指定时间
    step.done();
    step.msg(`乐心运动`, `时间早于9点，请晚点再试`, ``);
  } else {
    doMerge();
  }
} else {
  step.done();
  step.msg(`乐心运动`, `今天已经设置过,无需重复设置。`, ``);
}
/*修改*/
function doMerge(){
  let body = $request.body;
  let bodyObj = JSON.parse(body);
  if (bodyObj.list.length <= 1) {
    step.done();
    step.msg(`乐心运动`, `设置未成功`, ``);
    return;
  }
  let newStepCount = -1;
  do {
    newStepCount = randomStep();
  } while (parseInt(stepCount) == newStepCount);
  step.setdata(time_key, curTime + '');
  step.setdata(step_key, newStepCount + '');
  for (var i = 0; i < bodyObj.list.length; i++) {
    bodyObj.list[i].step = newStepCount;
  }
  step.done({body: JSON.stringify(bodyObj)});
  step.msg(`乐心运动`, `步数修改: 成功`, `设置步数：${newStepCount}`);
}
/*低调*/
function randomStep(){
  return 6000 + parseInt(2000 * Math.random());
}

/*是否今天*/
function isToday(timelong){
  return new Date().toDateString() === new Date(parseInt(timelong)).toDateString();
}
/*是否超出指定限定时间*/
function isOffTime(timelong){
  return new Date(parseInt(timelong)).getHours() >= 9;
}

function init() {
  getdata = (key) => {
    return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    return $prefs.setValueForKey(val, key)
  }
  msg = (title, subtitle, body) => {
    $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    url.method = 'GET'
    $task.fetch(url).then((resp) => cb(null, {}, resp.body))
  }
  post = (url, cb) => {
    url.method = 'POST'
    $task.fetch(url).then((resp) => cb(null, {}, resp.body))
  }
  put = (url, cb) => {
    url.method = 'PUT'
    $task.fetch(url).then((resp) => cb(null, {}, resp.body))
  }
  done = (value = {}) => {
    $done(value)
  }
  return { msg, log, getdata, setdata, get, post, put, done }
}
