/*************************************

[rewrite_local]
^https:\/\/routine\.wqxsw\.com\/flames\/video\/entry\/\d{4}$ url script-response-body https://raw.githubusercontent.com/cgx9/qx/main/jinyushortvideo.js
[mitm]
hostname = routine.wqxsw.com

*************************************/

var d = JSON.parse($response.body);
// const url = $request.url;
if(d.data && d.data.resultVideoList){
    const vlist = d.data.resultVideoList.map( item => {
        item.payStatus = 0
        return item;
    } )
    d.data.resultVideoList = vlist;
}
// console.log(url.pathname);
$done({ body: JSON.stringify(d) });
