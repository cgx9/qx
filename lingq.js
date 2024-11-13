/*************************************

[rewrite_local]
^https:\/\/www\.lingq\.com\/api\/v2\/profiles\/ url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/lingq.js

[mitm]
hostname = www.lingq.com

*************************************/


var d = JSON.parse($response.body);
const url = $request.url;


if(d.results && d.results.length > 0){
    d.results[0]['role'] = 'premium'
    d.results[0]['use_classic_mode'] = false
}
$done({body : JSON.stringify(d)});
