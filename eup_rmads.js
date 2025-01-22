/*************************************
[rewrite_local]
^https:\/\/product\.eupgroup\.net\/resapi\/ads\/adsInhouse url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/eup_rmads.js

[mitm]
hostname = product.eupgroup.net

*************************************/

var d = JSON.parse($response.body);
// d['Ads'] = null;
d['Ads']['top_1_ios'] = null;
d['Ads']['top_2_ios'] = null;
d['Ads']['top_3_ios'] = null;
d['Ads']['sale_ios'] = [
    {
      "premium" : "preforevermonths",
      "percent" : "100"
    },
    {
      "premium" : "pre12months",
      "percent" : "50"
    },
    {
      "premium" : "pre3months",
      "percent" : "30"
    }
  ];
console.log(JSON.stringify(d));
$done({ body: JSON.stringify(d) });


