/*************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/iTunes.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/

var chxm1023 = JSON.parse($response.body);
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const bundle_id = chxm1023.receipt["bundle_id"] || chxm1023.receipt["Bundle_Id"];
const yearid = `${bundle_id}.year`;
const yearlyid = `${bundle_id}.yearly`;
const yearlysubscription = `${bundle_id}.yearlysubscription`;
const lifetimeid = `${bundle_id}.lifetime`;

const list = {
  'com.idealityapp.VideoEditing': { cm: 'timea', hx: 'hxpda', id: "MagicVideo_Vip_Permanent", latest: "chxm1023" },  // 魔影-视频剪辑
  'mobi.eup.jpnews': { cm: 'timea', hx: 'hxpda', id: "com.eup.eja.sub12", latest: "chxm1023" },  // 魔影-视频剪辑
  'YinzhangMaster': { cm: 'timeb', hx: 'hxpda', id: "com.xiaoqi.seal.forever", latest: "chxm1023" },  // 印章大师
};

const receipt = {
  'quantity': '1',
  'purchase_date_ms': '1633072800000',
  'is_in_intro_offer_period': 'false',
  'transaction_id': '1000000000000000',
  'is_trial_period': 'false',
  'original_transaction_id': '1000000000000000',
  'purchase_date': '2021-10-01 12:00:00 Etc/GMT',
  'product_id': yearlyid,
  'original_purchase_date_pst': '2021-10-01 12:00:00 America/Los_Angeles',
  'in_app_ownership_type': 'PURCHASED',
  'original_purchase_date_ms': '1633072800000',
  'web_order_line_item_id': '1000000000000000',
  'purchase_date_pst': '2021-10-01 12:00:00 America/Los_Angeles',
  'original_purchase_date': '2021-10-01 12:00:00 Etc/GMT'
};

const expirestime = {
  'expires_date': '2099-12-31 23:59:59 Etc/GMT',
  'expires_date_pst': '2099-12-31 23:59:59 America/Los_Angeles',
  'expires_date_ms': '4102444799000'
};

let anchor = false;
let data;

for (const i in list) {
  const regex = new RegExp('^' + i, 'i');
  if (regex.test(ua) || regex.test(bundle_id)) {
    const { cm, hx, id, ids, latest, version } = list[i];
    const receiptdata = Object.assign({}, receipt, { 'product_id': id });

    switch (cm) {
      case 'timea':
        data = [Object.assign({}, receiptdata, expirestime)];
        break;
      case 'timeb':
        data = [receiptdata];
        break;
      case 'timec':
        data = [];
        break;
      case 'timed':
        data = [
          Object.assign({}, receiptdata, expirestime, { 'product_id': ids }),
          Object.assign({}, receiptdata, expirestime, { 'product_id': id })
        ];
        break;
    }

    if (hx === 'hxpda') {
      chxm1023.receipt.in_app = data;
      chxm1023.latest_receipt_info = data;
      chxm1023.pending_renewal_info = [
        {
          'product_id': id,
          'original_transaction_id': '1000000000000000',
          'auto_renew_product_id': id,
          'auto_renew_status': '1'
        }
      ];
      chxm1023.latest_receipt = latest;
    } else if (hx === 'hxpdb') {
      chxm1023.receipt.in_app = data;
    } else if (hx === 'hxpdc') {
      const xreceipt = {
        'expires_date_formatted': '2099-12-31 23:59:59 Etc/GMT',
        'expires_date': '4102444799000',
        'expires_date_formatted_pst': '2099-12-31 23:59:59 America/Los_Angeles',
        'product_id': id
      }

}
      chxm1023.receipt = Object.assign({}, chxm1023.receipt, xreceipt);
      chxm1023.latest_receipt_info = Object.assign({}, chxm1023.latest_receipt_info, xreceipt);
      chxm1023.status = 0;
      chxm1023.environment = 'Production';
      chxm1023.receipt_type = 'Production';
      chxm1023.product_id = id;
      delete chxm1023.latest_receipt;
      delete chxm1023.receipt_type;
    }

    if (version && version.trim() !== '') {
      chxm1023.receipt.version = version;
    }

    anchor = true;
    console.log('Successfully modified receipt for: ' + i);
    break;
  }
}

if (!anchor) {
  data = [Object.assign({}, receipt, expirestime)];
  chxm1023.receipt.in_app = data;
  chxm1023.latest_receipt_info = data;
  chxm1023.pending_renewal_info = [
    {
      'product_id': yearlyid,
      'original_transaction_id': '1000000000000000',
      'auto_renew_product_id': yearlyid,
      'auto_renew_status': '1'
    }
  ];
  chxm1023.latest_receipt = 'chxm1023';
  console.log('Successfully modified receipt for default case');
}

$done({ 'body': JSON.stringify(chxm1023) });
