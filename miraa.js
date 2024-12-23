/*************************************
[rewrite_local]
^https:\/\/api\.myoland\.com\/quotas\/miraa\/(transcribe|ai-explain) url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/miraa.js
[mitm]
hostname = api.myoland.com

*************************************/

var d = JSON.parse($response.body);

if (d.data) {
  d.data['quota'] = 999999
}
console.log(d.data);
$done({ body: JSON.stringify(d) });
