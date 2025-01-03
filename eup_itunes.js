/*
[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/eup_itunes.js

[mitm]
hostname = buy.itunes.apple.com,p25-buy.itunes.apple.com
*/

let response = JSON.parse($response.body);
console.log("source:")
console.log(JSON.stringify(response))
// https://v2.migii.net/purchase/verifiedAppleStore
let bundle_ids = {"com.eup.mytest":"com.eup.mytest", "mobi.eup.jpnews":"com.eup.eja.sub12","com.myoland.miraa":"miraa_pro_yearly"};

const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const bundle_id = response.receipt["bundle_id"] || response.receipt["Bundle_Id"];
console.log("UA:", ua)
// 定义产品 ID
const yearid = `${bundle_id}.year`;
const yearlyid = `${bundle_id}.yearly`;
const yearlysubscription = `${bundle_id}.yearlysubscription`;
const lifetimeid = `${bundle_id}.lifetime`;

const receipt = {
    "quantity": "1",
    "purchase_date": new Date().toISOString(),
    "expires_date": "2099-12-31 05:05:05 Etc/GMT",
    'expires_date_pst': '2099-12-31 23:59:59 America/Los_Angeles',
    'expires_date_ms': '4102444799000',
    "transaction_id": "999999999999999",
    "product_id": yearlyid,
    "original_transaction_id": "999999999999999",
    "is_trial_period": "false",
    "in_app_ownership_type": "PURCHASED",
    "subscription_group_identifier": "20877951",
    'is_in_intro_offer_period': 'false',
}
let data;
for (const i in bundle_ids) {
    const regex = new RegExp('^' + i, 'i'); 
    if (regex.test(ua) || regex.test(bundle_id)) {
      const product_id = bundle_ids[i];
      const receiptdata = Object.assign({}, receipt, { product_id}); 
      data = [receiptdata];
      
      response.pending_renewal_info = [
        {
          'product_id': product_id,
          'original_transaction_id': '1000000000000000',
          'auto_renew_product_id': product_id,
          'auto_renew_status': '1'
        }
      ];
      response.receipt = receiptdata
      break;
    }
}
if (!data) {
    data = [Object.assign({}, receipt)];
    response.pending_renewal_info = [
      {
        'product_id': yearlyid,
        'original_transaction_id': '1000000000000000',
        'auto_renew_product_id': yearlyid,
        'auto_renew_status': '1'
      }
    ];
    
}
// 添加或修改其他信息
response.receipt.in_app = data;
response.latest_receipt_info = data;
response.environment = 'Production';
response.receipt_type = 'Production';
response.product_id = product_id;
response.latest_receipt = 'xxx';
response.status = 0;
console.log("target:")
console.log(JSON.stringify(response))
$done({ body: JSON.stringify(response) });
