/*************************************

[rewrite_local]
^https:\/\/api1\.sider\.ai\/api\/v1\/audio\/voice\/list url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/sider_voice.js

[mitm]
hostname = api1.sider.ai

*************************************/

var d = JSON.parse($response.body);
const url = $request.url;

if (url.pathname == "/api/v1/audio/voice/list" && d.data && d.data.list) {
  d.data.list = d.data.list.map((item) => {
    item.need_premium = false;
    return item;
  });
}

console.log(url.pathname);
$done({ body: JSON.stringify(d) });
