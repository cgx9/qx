/*************************************

[rewrite_local]
^https:\/\/www\.sbry\.tech\/api\/user\/\d{0,8}$ url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/sbjp.js
[mitm]
hostname = www.sbry.tech

*************************************/

var d = JSON.parse($response.body);
// const url = $request.url;

if (d.data) {
  d.data["vipExpireTime"] = "2099-12-30 00:00:00";
  d.data["payVip"] = true;
  d.data["emailVerified"] = true;
  d.data["vip"] = true;
  d.data["score"] = 999999;
}
// console.log(url.pathname);
$done({ body: JSON.stringify(d) });
