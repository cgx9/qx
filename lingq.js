/*************************************

[rewrite_local]
^https:\/\/www\.lingq\.com\/api\/v2\/apple\/purchase\/ url script-request-body https://raw.githubusercontent.com/cgx9/qx/main/lingq.js

[mitm]
hostname = www.lingq.com

*************************************/


var d = JSON.parse($request.body);
const url = $request.url;
console.log(d)

if(d.prices){
    //d.results[0]['role'] = 'premium'
    //d.results[0]['use_classic_mode'] = false
    d.prices['premiumAuto.ja'] = 0.00
    d.prices['premiumAuto.ja.nt'] = 0.00
    d.prices['premiumAuto12.ja'] = 0.00
    d.prices['premiumAuto12.ja.nt'] = 0.00
}
$done({body : JSON.stringify(d)});
