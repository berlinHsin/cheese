function getFriend(){
  FB.api('/me/friends',function(response){
    for($i=0;$i<response.data.length;$i++){
      mem_friend($i,response.data[$i].id,response.data[$i].name);
    }
    load_friend_list(0);
  }); 
}//取得現在登入者的所有好友

function mem_friend($index,$id,$name){
  friend_list[$index] = {'id':$id,'name':$name};
}//將所取得的所有好友記憶起來

function load_friend_list($oring){
  for($i=0;$i<5;$i++){
    $index = $i + $count*5 ;
    $del = $i + $oring*5;
    $oring = 75 ;
    $padding = 186.5 ;
    $left = $padding*$i + $oring ;
    $('#friend'+$i).remove();
    $('#name'+$i).remove();
    $click = "friend_click('"+friend_list[$index].id+"')";
    $('#invite-friend-icon'+$i).attr('onclick',$click);
    $src = "http://graph.facebook.com/"+friend_list[$index].id+"/picture?width=108&height=100" ;
    $('.friend-list').append("<div id='friend"+$i+"'><img id='"+friend_list[$index].id+"'src="+$src+"></div>"); 
    $('.friend-list').append("<div id='name"+$i+"' onclick="+$click+">"+friend_list[$index].name+"</div>"); 
    $('#friend'+$i).css({'width':108,'height':100,'left':$left,'position':'absolute','top':18,'z-index':1});
    $('#name'+$i).css({'width':130,'height':30,'left':$left-10,'position':'absolute','top':133,'z-index':2,'text-align':'center'});
    $('#'+friend_list[$index].id).css({'width':108,'height':100});
    for(var index in invite_friend){
      (invite_friend.indexOf(friend_list[$index].id)>=0)?$('#'+friend_list[$index].id).css({'opacity':0.3}):null;
    }
  }
}//讀取以取得的好友 並送出request取得好友照片 並新增div包含觸發函式

function load_next_page($dire){
  if($('#search-friend-bar').val()==""){
    if($dire==1){
      if(friend_list.length-$count*5>0){
	       $count++;
	       load_friend_list($count-1);
      }
    }else{
      if($count>0){
	       $count--;
	       load_friend_list($count+1);
      }
    }
  }
} //控制好友左右被點擊的函式

function search_friend(){
  $input = $('#search-friend-bar').val();
  $input = $input.toLowerCase();
  $search_index = 0;
  search_list.splice(0,search_list.length);
  if($input!=""){
    for($i=0;$i<friend_list.length;$i++){
      $pattern = '';
      $search_name = friend_list[$i].name.toLowerCase();
      var arr = $search_name.split("");
      for($j=0;$j<$input.length;$j++){
	         $pattern += arr[$j];
      }
      if($pattern==$input){
	       search_list[$search_index]={'name':friend_list[$i].name,'id':friend_list[$i].id};
	       $search_index++;
      }
    }
    if(search_list[0]!=null){
      search_done();
    }
  }else{
    load_friend_list($cur);
  }
}//搜尋好友 演算法還不夠好 須在修改


function search_done(){
  $l = search_list.length;
  ($l>5)?$l=5:null;
  for($i=0;$i<5;$i++){
    $('#friend'+$i).remove();
    $('#name'+$i).remove();
  }
  for($i=0;$i<$l;$i++){
    $left = 186.5*$i+74;	
    $index = $i;
    $click = "friend_click('"+search_list[$index].id+"')";
    $('#invite-friend-icon'+$i).attr('onclick',$click);
    $src = "http://graph.facebook.com/"+search_list[$index].id+"/picture?width=108&height=100" ;
    $('.friend-list').append("<div id='friend"+$i+"'><img id='"+search_list[$index].id+"'src="+$src+"></div>"); 
    $('.friend-list').append("<div id='name"+$i+"' onclick="+$click+">"+search_list[$index].name+"</div>"); 
    $('#friend'+$i).css({'width':108,'height':100,'left':$left,'position':'absolute','top':17,'z-index':1});
    $('#name'+$i).css({'width':130,'height':30,'left':$left-10,'position':'absolute','top':133,'z-index':2,'text-align':'center'});
    $('#'+search_list[$index].id).css({'width':108,'height':100});
    for(var index in invite_friend){
      (invite_friend.indexOf(search_list[$index].id)>=0)?$('#'+search_list[$index].id).css({'opacity':0.3}):null;
    }
  }	
} //在搜索完好友後被呼叫 將被搜尋的好友新增div

