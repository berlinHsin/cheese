function profile(){
  $('#profile_curName-str').empty();
  $('#profile_undeal').empty();
  $('#profile_deal').empty();
  $('#profile_curName-str').append($name);
  $('#profile_curName').css({'position':'absolute','font-size':48,'left':77,'top':5});
  var pic_list  = ['breakfast','lunch','after','dinner','midnight'];
  $profile_padding = 68 ;
  $dealtop = 0 ;
  $deal_no = 0 ;
  $undealtop = 0 ;
  $undeal_no = 0 ;
  $.ajax({
    url:'php/mine_activity.php',
    dataType:'json',
    success:function(response){
      for(var key in response){
	$no = 0 ;
	if(response[key]['enable']==2){
	  $list = 'deal';
	  $thisTop = $deal_no*$profile_padding+$dealtop;
	  $deal_no ++ ;
	  $left = 260 ;
	  $meal_left = 175 ;
	  $click = "check_again('"+response[key]['index']+"')";
	  $temp = response[key]['chosen_date'].split("-");
	  $chosen_date = $temp[2];
	  $('#profile_'+$list).append("<div id='profile_Act"+response[key]['index']+"'></div>");
	  $('#profile_Act'+response[key]['index']).append("<div id='profile_actInfo"+response[key]['index']+"'></div>");
	  $('#profile_actInfo'+response[key]['index']).css({'position':'absolute','width':100,'height':55});
	  $('#profile_actInfo'+response[key]['index']).append("<span id='profile_actInfoLoc-str"+response[key]['index']+"'></div>");
	  $('#profile_actInfo'+response[key]['index']).append("<span id='profile_actInfoDate-str"+response[key]['index']+"'></div>");
	  $('#profile_actInfoLoc-str'+response[key]['index']).append(response[key]['location']);
	  $('#profile_actInfoDate-str'+response[key]['index']).append("星期"+response[key]['chosen_day']);
	  $('#profile_actInfoDate-str'+response[key]['index']).css({'position':'absolute','top':26,'width':80,'font-size':24});
	  $('#profile_actInfoLoc-str'+response[key]['index']).css({'position':'absolute','top':2,'font-size':20});
	  $src ='css/p.7/click.png';
	  $('#profile_Act'+response[key]['index']).append("<div id='profile_date"+response[key]['index']+"'><img src="+$src+"></div>");
	  $('#profile_date'+response[key]['index']).css({'position':'absolute','left':100});
	  $("#profile_date"+response[key]['index']).append("<span id='profile_date-str"+response[key]['index']+"'>"+$chosen_date+"</span>");
	  $("#profile_date-str"+response[key]['index']).css({'position':'absolute','font-size':22,'left':15,'top':20});
	}else if(response[key]['enable']==1){
	  $list = 'undeal';
	  $thisTop = $undeal_no*$profile_padding+$undealtop;
	  $undeal_no ++ ;
	  $meal_left = 0 ;
	  $('#profile_'+$list).append("<div id='profile_Act"+response[key]['index']+"'></div>");
	  if(response[key]['pro']==0){
	    $click = "desicion('"+response[key]['confirm_code']+"')";
	    $left = 165 ;
	  }else{
	    $click = "host('"+response[key]['index']+"')";
	    $left = 165 ;
	    $pro = 'css/p.7/pro.png';
	    $("#profile_Act"+response[key]['index']).append("<div id='profile_pro"+response[key]['index']+"'><img src="+$pro+"></div>");
	    $('#profile_pro'+response[key]['index']).css({'position':'absolute','left':85,'top':14});
	  }	
	}
	$('#profile_Act'+response[key]['index']).attr('onclick',$click);
	$("#profile_Act"+response[key]['index']).css({'position':'absolute','top':$thisTop,'width':1002,'height':67});
	$src ='css/p.7/'+response[key]['time']+'.png';
	$('#profile_Act'+response[key]['index']).append("<div id='profile_meal"+response[key]['index']+"'><img src="+$src+"></div>");
	$('#profile_meal'+response[key]['index']).css({'position':'absolute','top':0,'height':65,'left':$meal_left});
	for(var list in response[key]['invite']){
	  $pic = "http://graph.facebook.com/"+response[key]['invite'][list]['id']+"/picture?width=62&height=58" ;
	  $picid = "profile_invite"+response[key]['invite'][list]['index']+"-pic";
	  $('#profile_Act'+response[key]['index']).append("<div id='profile_icon"+response[key]['invite'][list]['index']+"'><img id='"+$picid+"' src="+$pic+"></div>");
	  $("#profile_icon"+response[key]['invite'][list]['index']).css({'position':'absolute','left':$left+$no*80,'top':0});
	  $("#"+$picid).css({'position':'absolute','width':62,'heigth':58});
	  $no++;
	}
      }
    }
  });
}

function getDate(){
  var day_list = ['日','ㄧ','二','三','四','五','六'];
  var month_30 = [4,6,9,11];
  var month_31 = [1,3,5,7,8,10,12];
  var date_time = new Array();
  var d = new Date();
  var day = d.getDay();
  var month = d.getMonth()+1;
  var date = d.getDate();
  $saving_month = '';
  $time = 0;
  for($i=0;$i<7;$i++){
    if(month_30.indexOf(month)>-1){
      if(date+$i>30){
	$time=date+$i-30;
	$saving_month = month+1;
      }
      else{
	$time=date+$i;
	$saving_month = month ;
      }
    }else if(month_31.indexOf(month)>-1){
      if(date+$i>31){
	$saving_month = month+1;
	$time=date+$i-31;
      }
      else{
	$time=date+$i;
	$saving_month = month;
      }
    }else{
      if(date+$i>28){
	$saving_month = month+1;
	$time=date+$i-28;
      }
      else{
	$saving_month = month;
	$time=date+$i;
      }
    }
    next_7[$i] = {'month':$saving_month,'date':$time};
  }//驗證是否超出日期

  $l = 0 ;
  $width = 81 ;
  $height = 77 ;
  for($i=0;$i<7;$i++){
    ($i+day<=6)?$index=$i+day:$index=$i+day-7;
    next_7[$i].day = day_list[$index];
    $oring = 350 ;
    $padding = 85 ;
    $left = $oring + $padding*$i ;
    $src = 'css/p.3/date.png' ;
    $click = "date_click('"+$i+"')";
    $('.info_week').append("<div id='info_date"+$i+"' onclick="+$click+"><img id='info_date"+$i+"-pic' src="+$src+"></div>");
    $('.info_week').append("<span id='info_weekTime"+$i+"-str'>星期"+day_list[$index]+"</span>");
    $('#info_date'+$i).append("<span id='info_dateNum"+next_7[$i].date+"'>"+next_7[$i].date+"</span>");
    $('#info_date'+$i).css({'left':$left,'position':'absolute','width':$width,'height':$height});
    $('#info_weekTime'+$i+'-str').css({'left':$left+20,'position':'absolute','top':90});
    $('#info_dateNum'+next_7[$i].date).css({'position':'absolute','left':24,'top':26,'z-index':2,'font-size':29});
  }
}//取得現在日期 call api 把日曆新增上去

function time(){
  var time_list = ['早餐','午餐','下午茶','晚餐','宵夜'];
  var pic_list  = ['breakfast','lunch','after','dinner','midnight'];
  for($i=0;$i<5;$i++){
    $left = 82+ $i*170 ;
    $src ='css/p.3/'+pic_list[$i]+'.png';
    $click = "time_click('"+pic_list[$i]+"')";
    $('.info_time').append("<div id='info_meal"+pic_list[$i]+"' onclick="+$click+"></div>");
    $('.info_time').append("<span id='info_meal"+pic_list[$i]+"-str'>"+time_list[$i]+"</span>");
    $('#info_meal'+pic_list[$i]).append("<img id='info_meal"+pic_list[$i]+"-pic' src="+$src+">");
    $("#info_meal"+pic_list[$i]+'-pic').css({'position':'absolute','width':147,'height':140});
    $("#info_meal"+pic_list[$i]+'-pic').css({'left':$left})
      $("#info_meal"+pic_list[$i]+"-str").css({'position':'absolute','top':150,'left':$left+35,'font-size':28});
  }
}// 插入每一餐的圖片和div

function friend_icon(){
  for($i=0;$i<5;$i++){
    $src = 'css/p.4/friend-icon.png';
    $name = "invite-friend-icon"+$i;
    $left = 58 + $i*186.5 ;
    $('.friend-list').append("<img id="+$name+" src="+$src+"  />");
    $("#"+$name).css({'height':130,'width':138,'position':'absolute'});
    $("#"+$name).css({'z-index':2,'left':$left});
  }
}//新增好友的邊框

function host($title){
  $i = 0 ;
  $friend_left = 100 ;
  $host_top = 20 ;
  $padding = 120 ;
  $src = 'css/p.4/invited.png';
  $('#host_actInfo').empty();
  $('#host_dateList').empty();
  getAct($title,function(response){
    alert('de');
    for(var key in response['date']){
      $f = 0 ;
      $('#host_dateList').append("<div id='host_act"+key+"'></div>");
      $('#host_act'+key).append("<div id='host_actDate"+key+"'><img src="+$src+"></div>");
      $('#host_act'+key).css({'position':'absolute','width':700,'height':90});
      $('#host_act'+key).css({'top':$host_top+key*100,'left':200});
      for(var friend in response['date'][key]['invite']){
	$link = "http://graph.facebook.com/"+response['date'][key]['invite'][friend].id+"/picture?width=108&height=100" ;
	$('#host_act'+$i).append("<div id='host_actFriend"+$f+"'></div>");
	$('#host_actFriend'+$f).attr('src',$link);
	$('#host_actFriend'+$f).css({'position':'absolute','width':85,'height':85});
	$('#host_actFriend'+$f).css({'left':$friend_left+$padding*$f});
	$f++;
      }
    }
  });
}


function api(request){
  switch(request.action){
    case 'show':
      show(request.div+'-page');
      break;
    default:
      return "Wrong method call";
  }
}

function show($title){
  $('.page').hide();
  $('#'+$title).show();
}		

