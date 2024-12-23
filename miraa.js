/*************************************
[rewrite_local]
^https:\/\/api\.myoland\.com\/quotas\/miraa\/(transcribe|ai-explain) url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/miraa.js
^https:\/\/api\.myoland\.com\/transcribes\/miraa\/runners/runpod url script-request-body https://raw.githubusercontent.com/cgx9/qx/main/miraa.js

[mitm]
hostname = api.myoland.com

*************************************/
if($request.url.indexof('runpod') !=-1){
  let requestBody = $request.body;
    
    let requestJson = JSON.parse(requestBody);
    requestJson.audioDuration = 1;
    requestBody = JSON.stringify(requestJson);
    $done({ body: requestBody });
    if($response.body){
      $done({ body: $response.body });
    }
}else{
  var d = JSON.parse($response.body);

  d['quota'] = 999999
  d['usage'] = 0
  console.log(d);
  $done({ body: JSON.stringify(d) });
}

