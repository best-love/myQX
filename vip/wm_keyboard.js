/*
* 使用方法
* [MINT] hostname = app.edujia.com
* # 雪梨Pear全局VIP
* ^https://app.edujia.com/keyboard/vip/query/info.do url script-response-body QuantumultX-js/vip/wm_keyboard.js
*/

let body = $response.body;

body = body.replace('"isForever":0', '"isForever":1');
body = body.replace('"isVip":0', '"isVip":1');
body = body.replace('"expireTime":0', '"expireTime":1894103312000');

$done({body: body});