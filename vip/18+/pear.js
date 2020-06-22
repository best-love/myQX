/*
* 使用方法
* [MINT] hostname = m.pearkin.com, ps.leachu.com, s1.wangjulong.com, ayk.tmdidi.com, www.baidu.com2.club, souhu.mett.me, bkcd.b-cdn.net,
* # 雪梨Pear全局VIP
*/
// 涉及到vip修改的口
const vip_urls = [
  '/api/account/IndexDetail',
  '/api/account/IsVip',
  '/api/account/UserSetting',
  '/api/account/TabRedTip',
  '/api/Account/Suport',
  '/api/cartoon/VipInfo',
  '/api/cartoon/GetAllTagNew',
  '/api/cartoon/indexNew/*',
  '/api/cartoon/LookPhotoVip/*',
  '/api/Cartoon/LookPhoto/*',
  '/api/cartoon/CheckCartoonVip/*',
  '/api/Adv/VuePage/*',
  '/api/PictureSet/OpenPictureSetFree',
  '/api/PictureSet/LookPhoto/*',
  '/api/Download/CheckDownloadTorrent',
  '/api/Movie/Commoent/*',
  '/api/Movie/WatchMovie',
  '/api/video/watch/*',
  '/api/video/Index/.*',
  '/api/video/index/*',

  /*以下为新增*/
  '/api/download/UserAndDownloadInfo',
  '/api/movie/UserRecomMovie.*',
  '/api/supportAct/HomeCustomInfo',
  '/api/account/Milk',
  '/api/video/WatchCount',
  '/api/adv/VuePage/*',
  '/api/Account/CheckVip'
];

let body = $response.body;
let obj = JSON.parse(body);
let vipObj = upLockVip(obj);
$done({body: JSON.stringify(vipObj)});

/*解锁vip*/
function upLockVip(value) {
  for (key in value) {
    if (isObj(value[key])) {
      value[key] = upLockVip(value[key]);
    } else if (isArr(value[key])) {
      for (let i = 0; i < value[key].length; i++) {
        value[key][i] = upLockVip(value[key][i]);
      }
    } else {
      value[key] = doChange(key, value);
    }
  }
  return value;
}

function doChange(key, obj) {
  let val = obj[key];
  switch (key) {
    case 'vipEndTime':
      val = '2099-03-01';
      break;
    case 'vipLevel':
      val = 3;
      break;
    case 'level':
      val = 3;
      break;
    case 'surplusCount':
      val = 1;
      break;
    case 'loadCount':
      val = 60;
      break;
    case 'count':
      val = 0;
      break;
    case 'vip':
      val = 3;
      break;
    case 'orderVip':
      val = true;
      break;
    case 'isVip':
      val = true;
      break;
    case 'hadRead':
      val = true;
      break;
    case 'cartoonVip':
      val = true;
      break;
    case 'isSkip':
      val = true;
      break;
    case 'isBackShow':
      val = true;
      break;
    case 'value':
      if (val == false) val = true;
      break;
    case 'hadWach':
      val = true;
      break;
    case 'canWach':
      val = true;
      break;
    case 'vTag':
      val = 0;
      break;

    case 'czn':
      val = true;
      break;
    case 'milkLevel':
      val = 3;
      break;
    case 'hadDiscount':
      val = true;
      break;
    case 'todayCanWatchCount':
      val = 999;
      break;
  }
  return val;
}

// body = body.replace('"vipEndTime":"2020-03-01"', '"vipEndTime":"2099-03-01"');
// body = body.replace('"vipEndTime":null', '"vipEndTime":"2099-03-01"');
/*数值型*/
// body = body.replace('"vipLevel":0', '"vipLevel":3');
// body = body.replace('"level":0', '"level":3');
// body = body.replace('"surplusCount":0', '"surplusCount":1');
// body = body.replace('"loadCount":null', '"loadCount":60');
// body = body.replace('"count":0', '"count":99');
// body = body.replace('"vip":null', '"vip":3');
/*bool型*/
// body = body.replace('"orderVip":false', '"orderVip":true');
// body = body.replace('"isVip":false', '"isVip":true');
// body = body.replace('"hadRead":false', '"hadRead":true');
// body = body.replace('"cartoonVip":false', '"cartoonVip":true');
// body = body.replace('"isSkip":false', '"isSkip":true');
// body = body.replace('"isBackShow":false', '"isBackShow":true');
// body = body.replace('"value":false', '"value":true');
// body = body.replace('"hadWach":false', '"hadWach":true');
// body = body.replace('"canWach":false', '"canWach":true');

/*解锁小视频限制vip观看*/
// body = body.replace(/\"vTag\":\"\d\"/g, '"vTag":"0"');
//
// $done({body: body);

/*判断是否数组*/
function isArr(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}
/*判断是否对象*/
function isObj(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
