/*
* 使用方法
* [MINT] hostname = commerce-api.faceu.mobi,
* # 轻言相机解锁年订阅解锁VIP
* ^https?:\/\/commerce-api\.faceu\.mobi\/commerce\/.*\/subscription\/user_info* url script-response-body QuantumultX-js/vip/qingyanxiangji.js
*/

let obj = JSON.parse($response.body);
obj.data.start_time = 1577813990;
obj.data.end_time = 4102491933;
obj.data.is_first_subscribe = true;
obj.data.is_cancel_subscribe = true;
obj.data.flag = true;
$done({body: JSON.stringify(obj)});
