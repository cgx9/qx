/*************************************

[rewrite_local]
^https:\/\/transcriblo\.ideanology\.co\.uk\/transcription\/finalize url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/tablo_transcription.js
[mitm]
hostname = transcriblo.ideanology.co.uk
tablo_transription.js
*************************************/

var d = JSON.parse($response.body);
// const url = $request.url;
d["transcriptionMinutes"] = 999999;
// console.log(url.pathname);
$done({ body: JSON.stringify(d) });
