function cheeseApi($action,api_callback){
  switch($action.field){
    case 'order':
      $order = $action.order;
      $.ajax({
	url:'php/read.php',
	dataType:'json',
	type:'POST',
	data:{'order':$order},
	success:function(response){
	  if(response){
	    api_callback(response);
	  }
	  else{
	    alert('Oops! You aren\'t in the list !');
	    api({'action':'show','div':'profile'});
	  }
	}	
      });
      break;
  }
}

function getAct($index,callback){
  $.ajax({
    url:'php/getAct.php',
  type:'POST',
  dataType:'json',
  data:{'index':$index},
  success:function(response){
    alert('123');
    callback(response);},
  error:function(){alert('bad');}
  });
}
