function check_url(){
  $cur_url = location.href ;
  var request = $cur_url.split('?');
  if(request[1]!=null){
    request = request[1].split('&');
    for(var index in request){
      var send = request[index].split('=');
      url_confirm(send[0],send[1]);
    }
  }else{
    api({'action':'show','div':'profile'});
  }
}//確認使用者以什麼連結進入網站 並顯示出正確資訊

function url_confirm($request,$parm){
  switch($request){
    case 'invite':
      alert('你被邀請參加活動！');
      desicion($parm);
      break;
    default:
      alert('無此連結！');
      location.href = "http://cheese.ucart.tw";
      break;
  }
}
