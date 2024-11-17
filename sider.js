/*************************************

[rewrite_local]
^https:\/\/api\.sider\.ai\/api\/v1\/completion\/limit\/user url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/sider.js
https://api1.sider.ai/api/v1/completion/limit/user?app_name=ChitChat_Chrome_Ext&app_version=4.28.0&tz_name=Asia/Shanghai

[mitm]
hostname = api1.sider.ai

*************************************/

var d = JSON.parse($response.body);
const url = $request.url;

//if(d.prices){
if (d.data) {
  d.data["user_type"] = "premium_ultra";
  d.data["user_type_detail"] = "premium_ultra";
  d.data["basic_credit"]["count"] = "99999";
  d.data["basic_credit"]["remain"] = "99999";
  d.data["advanced_credit"]["count"] = "99999";
  d.data["advanced_credit"]["remain"] = "99999";
  d.data["chat"]["count"] = "99999";
  d.data["chat"]["remain"] = "99999";
  d.data["gpt_4_chat"]["count"] = "99999";
  d.data["gpt_4_chat"]["remain"] = "99999";
  d.data["search"]["count"] = "99999";
  d.data["search"]["remain"] = "99999";
  //d.prices['premiumAuto.ja'] = 0.00
  //d.prices['premiumAuto.ja.nt'] = 0.00
  //d.prices['premiumAuto12.ja'] = 0.00
  //d.prices['premiumAuto12.ja.nt'] = 0.00
}

console.log(d);
$done({ body: JSON.stringify(d) });
