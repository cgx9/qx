/*************************************
[rewrite_local]
^https:\/\/easyjapanese\.net\/api\/user\/init-login url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/eup.js

[mitm]
hostname = easyjapanese.net

*************************************/

var d = JSON.parse($response.body);

d['result']['is_premium'] = "true"
d['result']['premium_expired'] = "2035-01-03 13:37:24"
console.log(JSON.stringify(d));
$done({ body: JSON.stringify(d) });


