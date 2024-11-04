/*************************************

[rewrite_local]
^https:\/\/api\.mojidict\.com\/app\/mojiread\/parse\/functions\/getNPrivileges-v2 url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/mojiread.js

[mitm]
hostname = api.mojidict.com

*************************************/


var d = JSON.parse($response.body);
const url = $request.url;
const vip1 = '/getNPrivileges';
const vip = '/getNPrivileges-v2';

if(url.indexOf(vip)!=-1){d.result={"result":"091a0d45e4c8acc99ed9fd4db5bb315e0bb4fc9b6a313fe1d7168a204ff3d7de9ffe4816fe1f9fa8a673029febf477c02fcafabf55de5f6f97d4187547661de88ab938d45c46a282505d6949f53b8522194f3709674b30cb8a0381fabec4ce7f358abe2e298ff7d01b534c0bc7f376447a3c8dda9df9b024d8d5fe51714a8a0b4f6855339e09ced393ffada4a82021753ec3f2acefcdb8c58ce5c13497272fc8a305f7857cf2a0added16c5a8e0a9fb6da648ddf45e78016d84ed82e3930c69f36966e013975d1a254227fa4b9828589b04ab8fb4f890834571b8e9bea7da97e1ca2628b6737d627235841c56ee44ca24662f01066dbca68d3f21fe020f9e2ad3b430fe6cf6593f4a9f0b2d33b82e1b15c17f1b2596cf8d616e136518255a0c4","code":200}}else{d.result={"result":[{"identity":"000-002-00001","privilegeStatus":"activated","privilege":{"status":"cancel","payType":"4","expiresDate":4092599349000,"purchaseDate":1666666666666},"canPay":true}],"code":200}}

$done({body : JSON.stringify(d)});
