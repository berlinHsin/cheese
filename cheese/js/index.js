$(document).ready(function(){
  FBinit();
  api({'action':'show','div':'profile'});
  getDate();   //tmp
  time(); //tmp
  friend_icon();

  $('.login-btn').bind('click',function(){
    FB.login(function(response){
      getLogin();
    },{scope:'email,user_likes,user_birthday'});
  });

  $('.other-btn').bind('click',function(){
    api({'action':'show','div':'info'});
    change('next')
  });

  $('.today-btn').bind('click',function(){
    alert('噢噢！ 這個功能還沒開放喔！');
  });

  $('.left').bind('click',function(){
   // api({'action':'show','div':$up});
   // change('up');
   location.href = 'http://yahoo.com.tw';
  });

  $('.right').bind('click',function(){
    api({'action':'show','div':$next});
    change('next');
  });

  $('#fb-friend-right').bind('click',function(){
    load_next_page(1);
  });

  $('#fb-friend-left').bind('click',function(){
    load_next_page(0);
  });

  $('.info_Res-submit').bind('click',function(){
    getRes();
  });

  $('.fb-sent-btn').bind('click',function(){
    getOrder();
    getMsg();
    sent();
    sent_to_database();
    api({'action':'show','div':'profile'});
    change('dire','profile');
  });

  $('.click-to-copy-btn').bind('click',function(){
    getOrder();
    copy_url();
    sent_to_database();
    api({'action':'show','div':'profile'});
    change('dire','profile');
  });

  $('#profile_newDate').bind('click',function(){
    api({'action':'show','div':'type'});
    change('next');
  });
  $('.vote').click(function(){
    vote_to_database();
    api({'action':'show','div':'profile'});
  });
});
