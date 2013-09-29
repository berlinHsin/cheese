var friend_list = new Array();
var invite_friend = new Array();
var time_list = new Array();
var date_list = new Array();
var search_list = new Array();
var next_7 = new Array();
var voted_list = new Array();
$cur = 0 ;
$next = 'info' ;
$userid = '';
$name = '';
$up = 'profile';
$msg = '';
$Res = '';
$count = 0 ;
$invite_num = 0 ;
$send_url = "";
$confirm_code = '';


/**********點擊項觸發項**************/

function friend_click($index){
  $check = invite_friend.indexOf($index);
  ($check>=0)?del($index,$check):invite($index);  
}//朋友被點擊的函式

function date_click($index){
  $check = date_list.indexOf($index);
  if($check>=0){
    $src="css/p.3/date.png";
    next_7[$index].flag = 0;
    date_list.splice($check,1);
  }else{
    if(date_list.length<3){
      $src="css/p.3/date-click.png";
      date_list[date_list.length] = $index ;
      next_7[$index].flag = 1;
    }else{
      $src="css/p.3/date.png";
      next_7[$index].flag = 0;
      $('#info_date'+date_list[0]+'-pic').attr('src',$src);
      date_list.splice(0,1);
      $src="css/p.3/date-click.png";
      date_list[date_list.length] = $index ;
    }
  }
  $('#info_date'+$index+'-pic').attr('src',$src);
}//當日曆被點擊的函式

function time_click($index){
  $check = time_list.indexOf($index);
  if($check>=0){
    $src="css/p.3/"+$index+".png";
    time_list.splice($check,1);
  }else{
    if(time_list<1){
      $src="css/p.3/"+$index+"-click.png";
      time_list[time_list.length] = $index ;
    }else{	
      $src="css/p.3/"+time_list[0]+".png";
      $('#info_meal'+time_list[0]+'-pic').attr('src',$src);
      $src="css/p.3/"+$index+"-click.png";
      time_list[0] = $index;
    }
  }
  $('#info_meal'+$index+'-pic').attr('src',$src);
}//當時間被點擊的函式




/********特殊功能項**********/

function invite($id){
  invite_friend[$invite_num] = $id ;
  $left = $invite_num*125;
  $src_left = 16+$invite_num*125;
  $invite_num ++ ;	
  $click = "del('"+$id+"')";
  $pic = 'css/p.4/friend-icon.png';
  $src = "http://graph.facebook.com/"+$id+"/picture?width=108&height=100";
  $('.invited-list').append("<div id='invite"+$id+"' ><img id='invite-pic"+$id+"'src="+$src+"></div>");
  $('.invited-list').append("<div id='invite-icon"+$invite_num+"' onclick="+$click+" class='invite-icon'><img src="+$pic+"></div>");
  $('#invite'+$id).css({'width':108,'height':100,'position':'absolute','top':45,'left':$src_left,'z-index':1});
  $('#invite-pic'+$id).css({'width':85,'height':85});
  $('#invite-icon'+$invite_num).css({'position':'absolute','top':30,'left':$left,'z-index':2});
  blur($id,0.3);
}//邀請好友 在好友div被點擊時會觸發  

function del($id,$index){
  $invite_num = 0;
  invite_friend.splice(invite_friend.indexOf($id),1);
  $('.invite-icon').remove();
  $('#invite'+$id).remove();
  for($i=0;$i<invite_friend.length;$i++){
    $('#invite'+invite_friend[$i]).remove();
    invite(invite_friend[$i]);
  }
  blur($id,1);
}//刪除已邀請的好友 在好友div被點擊時會觸發

function blur($index,$opac){
  $('#'+$index).css({'opacity':$opac});
}//接div名稱及欲改變的opacity 然後改變

function getOrder(){
  $send_url = "http://cheese.ucart.tw/index.html?invite=";
  var time = new Date();
  $order = time.getTime();
  $confirm_code = $order;
  $send_url += $order ;
}//活動驗證碼

function getRes(){
  if(event.keyCode==13){
    $Res = $('#info_Res-input').val();
  }
}//取得所輸入的餐廳名 存進全域變數裡 

function getMsg(){
  $msg = $('#msg-bar').val();
}//取得所輸入訊息 存進全域變數裡

function sent(){
  for(var index in invite_friend){
    FB.ui({
      method:'send',
      name:$msg,
      link:$send_url,
      to:invite_friend[index]
    });
  }
}//送出fb訊息給好友 $order是確認碼 在對方載入時供確認用

function copy_url(){
  window.prompt("Press Ctrl+C , Enter",$send_url);
}//提供點擊複製的函式 必須再修改

function change($method,$dire_page){
  var page_list = ['profile','type','info','invite-friend','sent-message'];
  switch($method){
    case 'next':
      $next = page_list[$cur+2];
      $up = page_list[$cur]
	$cur++;
      break;
    case 'up':
      $next=page_list[$cur];
      $up= page_list[$cur-2];
      $cur--;
      break;
    case 'dire':
      $next = page_list[page_list.indexOf($dire_page)+1];
      $up = page_list[page_list.indexOf($dire_page)-1];
      $cur = page_list.indexOf($dire_page);
    default:
      break;
  }
}//重要函式！ 此項函式控制全部的頁面改變 


function sent_to_database(){
  for(var key in invite_friend){
    for(var i in friend_list){
      if(invite_friend[key] == friend_list[i].id){
	invite_friend[key] = {'id':invite_friend[key],'name':friend_list[i].name};
	break;
      }
    }
  }
  var order = new Array();
  $Res = $('#info_Res-input').val();
  order = {'host_id':$userid,'location':$Res,'confirm_code':$confirm_code};
  $.ajax({
    url:'php/activity.php',
    data:{'time':time_list,'next_7':next_7,'invite':invite_friend,'order':order},
    success:function(){

      profile();
      api({'action':'show','div':'profile'});
    }
  });
}
function escape(unsafe){
  return unsafe
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");
}

function desicion($invite_order){
  $confirm_code = $invite_order;
  cheeseApi({'field':'order','order':$invite_order},function(response){
    api({'action':'show','div':'desicion'});
    $('#location-done').append(escape(response.location));
    $('#date-info').append("<div id='chosen-time'><img src=css/p.3/"+response.time+".png></div>");
    $left = 195 ;
    $no = 0;

    for(var key in response.invite){
      $src = "http://graph.facebook.com/"+response.invite[key]['id']+"/picture?width=85&height=85" ;
      $('#date-info').append("<div id='icon"+key+"'><img src=css/p.6/icon.png></div>");
      $('#date-info').append("<div id='de-invited"+key+"'><img id='invited-pic"+key+"'src="+$src+"></div>");
      $('#date-info').append("<div id='invited-name"+key+"'>"+response.invite[key]['name']+"</div>");
      $('#invited-pic'+key).css({'width':85,'height':85});
      $('#de-invited'+key).css({'position':'absolute','left':$left+$no*145,'top':36,'z-index':2});
      $('#invited-name'+key).css({'position':'absolute','left':$left+$no*145-11,'top':137,'z-index':2});
      $('#invited-name'+key).css({'width':110,'height':30,'text-align':'center','font-size':20});
      $('#icon'+key).css({'position':'absolute','left':$left+$no*145-20,'top':17});
      $no = $no +1;  
    }
    for(var key in response.date){
      voted_list[voted_list.length] = response.date[key]['date'];
      $choose = response.date[key]['date'].split('-');
      switch(response.date.length){
	case 1:
	  $oring = 445 ;
	  $padding = 0 ;
	  break;
	case 2:
	  $oring = 370 ;
	  $padding = 182 ;
	  break;
	case 3:
	  $oring = 325 ;
	  $padding = 120 ;
	  break;
      }
      $pic_left = $oring + $padding*key;
      $str_left = 23 ;
      $click = "vote('"+response.date[key]['date']+"')";
      $('#choose-time').append("<div id='date-choose"+key+"' onclick="+$click+"><img id='"+response.date[key]['date']+"'src=css/p.6/date-icon.png></div>");
      $('#date-choose'+key).append("<span id='"+$choose[2]+"'>"+$choose[2]+"</span>");
      $('#date-choose'+key).css({'position':'absolute','left':$pic_left,'top':75,'text-align':'center'});
      $('#'+$choose[2]).css({'position':'absolute','left':$str_left,'top':27,'font-size':30});
    }
  });
}

function check_again($index){

}

function vote($voted){
  $check = voted_list.indexOf($voted);
  if($check!=-1){
    $src = "css/p.6/date-icon-click.png";
    voted_list.splice($check,1);
    $('#'+$voted).attr('src',$src);
  }else{
    voted_list[voted_list.length] = $voted ;
    $src = "css/p.6/date-icon.png";
    $('#'+$voted).attr('src',$src);
  }
}

function vote_to_database(){
  //$url = location.href ;
  //$parm = $url.split("?");
  //$confirm_code = $parm[1].split('=');
  //voted_list['confirm_code'] = $confirm_code[1];
  $code = new Array();
  $code = {'confirm_code':$confirm_code,'userid':$userid,'username':$name};
  $.ajax({
    url:'php/vote.php',
    dataType:'text',
    data:{'vote_list':voted_list,'code':$code},
    success:function(){
      alert('投票成功!');
      profile();
      api({'action':'show','div':'profile'});
    }
  });
}
