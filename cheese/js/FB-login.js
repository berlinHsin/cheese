function FBinit(){
  FB.init({
    appId:'147409468779962',
    status:true,
    cookie:true,
    xfbml:true,
    oauth:true
  });
}

function getLogin(){
  FB.getLoginStatus(function(response){
    if(response.status==='connected'){
      getusername();
    }else if(response.status==='not authorized'){
      alert('not authorized');
      api({'action':'show','div':'login'});
    }else{
      api({'action':'show','div':'login'});
    }
  });
}

function getusername(){
  FB.api('/me',function(response){
    $userid = response.id ;
    $name = response.name;
    register(response.id,response.name);
  });
}

function register($id,$name,$email){
  $.ajax({
    url:'php/login.php',
    dataType:'json',
    type:'POST',
    data:{id:$id,name:$name},
    success:function(response){
      alert(response.msg);
      getFriend();
      profile();
      api({'action':'show','div':'profile'});
     // check_url();
    }
  });
}
