/*************************************
[rewrite_local]
^https:\/\/easyjapanese\.net\/api\/user\/init-login url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/eup_jlpt.js
api/test-full/5bb185f42b6d67068116813d
^https:\/\/jlpt\.mazii\.net\/api\/test-full\/\S+$ url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/eup_jlpt.js
^https:\/\/easyjapanese\.net\/api\/test\/jlpt\/\d$ url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/eup_jlpt.js


[mitm]
hostname = jlpt.mazii.net, easyjapanese.net

*************************************/
var d = JSON.parse($response.body);
if($request.url.indexOf('init-login') !=-1){
  
  d["result"]["is_premium"] = "true"
  d["result"]["premium_expired"] = "2035-01-03 13:37:24"
  
  
}else if($request.url.indexOf('test-full') !=-1){
  d['premium'] = false;
  d['meta']['premium'] = false
}else {
  if(d && d.length) {
    for(let i = 0; i< d.length; i++){
      d[i]['premium'] = 0;
    }
  }
}
// console.log(JSON.stringify(d));
$done({ body: JSON.stringify(d) });
