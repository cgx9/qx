/*************************************

[rewrite_local]
^https:\/\/www\.lingq\.com\/api\/v2\/profiles\/$ url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/lingq.js

[mitm]
hostname = www.lingq.com

*************************************/


var d = JSON.parse($response.body);
const url = $request.url;

//if(d.prices){
if(d.results && d.results.length>0){
    d.results[0]['role'] = 'Premium'
    d.results[0]['use_classic_mode'] = false
    d.results[0]['is_beta_tester'] = true
    //d.prices['premiumAuto.ja'] = 0.00
    //d.prices['premiumAuto.ja.nt'] = 0.00
    //d.prices['premiumAuto12.ja'] = 0.00
    //d.prices['premiumAuto12.ja.nt'] = 0.00
}
if(d.profiles){
    try{
    var b = {
        "role" : "Premium",
        "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
        "purchase_date" : "2023-09-09 09:09:09 Etc/GMT",
        "is_beta_tester" : true
    }
    d.profiles.push(b)

    }catch(e){
        console.log(e)
    }

}
console.log(d)
$done({body : JSON.stringify(d)});
