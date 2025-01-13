/*************************************
[rewrite_local]
^https:\/\/prod-saas\.ieyoutech\.com\.cn\/user\/login\/\S+$ url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/lejianfitness.js

[mitm]
hostname = prod-saas.ieyoutech.com.cn
*************************************/
let responseBody = $response.body;

let responseJson = JSON.parse(responseBody);
if(responseJson.result){
  let res = responseJson.result;
  res['deleted'] = 0;
  res['vipAmount'] = 1;
  res['userType'] = 1;
  res['membershipLevel'] = 3;
  res['expiryTime'] = '2026-01-01 23:00:00'

  responseJson.result = res;
}

responseBody = JSON.stringify(responseJson);
$done({ body: responseBody });

