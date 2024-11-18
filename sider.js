/*************************************

[rewrite_local]
^https:\/\/(api\d*\.sider\.ai|sider\.ai)\/api\/v1\/completion\/limit\/user url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/sider.js

[mitm]
hostname = api1.sider.ai,sider.ai

*************************************/

var d = JSON.parse($response.body);
const url = $request.url;

//if(d.prices){
if (d.data) {
  d.data["is_trial"] = true;
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
  d.data["summarize"]["count"] = "99999";
  d.data["summarize"]["remain"] = "99999";
  d.data["web_page"]["count"] = "99999";
  d.data["web_page"]["remain"] = "99999";
  d.data["feature_used"]["tts"] = 0;

  //d.prices['premiumAuto.ja'] = 0.00
  //d.prices['premiumAuto.ja.nt'] = 0.00
  //d.prices['premiumAuto12.ja'] = 0.00
  //d.prices['premiumAuto12.ja.nt'] = 0.00
}
console.log(url.pathname);
$done({ body: JSON.stringify(d) });
