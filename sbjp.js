/*************************************

[rewrite_local]
^https:\/\/www.sbry\.tech\/api\/user\/d$ url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/sbjp.js
[mitm]
hostname = www.sbry.tech

*************************************/

var d = JSON.parse($response.body);
// const url = $request.url;

//if(d.prices){
if (d.data) {
  d.data["vipExpireTime"] = "2099-12-30 00:00:00";
  d.data["payVip"] = true;
  d.data["emailVeriffied"] = true;
  d.data["vip"] = true;

  //d.prices['premiumAuto.ja'] = 0.00
  //d.prices['premiumAuto.ja.nt'] = 0.00
  //d.prices['premiumAuto12.ja'] = 0.00
  //d.prices['premiumAuto12.ja.nt'] = 0.00
}
// console.log(url.pathname);
$done({ body: JSON.stringify(d) });
