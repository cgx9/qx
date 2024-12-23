/*************************************
[rewrite_local]
^https:\/\/api\.myoland\.com\/quotas\/miraa\/(transcribe|ai-explain) url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/miraa.js
[mitm]
hostname = api.myoland.com

*************************************/

var d = JSON.parse($response.body);

d['quota'] = 999999
d['usage'] = 0
console.log(d);
$done({ body: JSON.stringify(d) });
