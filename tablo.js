/*************************************

[rewrite_local]
^https:\/\/transcriblo\.ideanology\.co\.uk\/attributes\/all url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/tablo.js
[mitm]
hostname = transcriblo.ideanology.co.uk

*************************************/

var d = JSON.parse($response.body);
// const url = $request.url;
d['isPro'] = true
d['transcriptionMinutes'] = 999999
// console.log(url.pathname);
$done({ body: JSON.stringify(d) });
