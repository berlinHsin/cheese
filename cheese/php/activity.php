<?
include 'connect.php';

$time_list = $_REQUEST['time'];
$invite_friend = $_REQUEST['invite'];
$order = $_REQUEST['order'];
$next_7 = $_REQUEST['next_7'];

$str =$time_list[0];
$location = $order['location'];
$host_id = $order['host_id'];
$confirm_code = $order['confirm_code'];

$year = date("Y");
$current_time = date("Y-m-d/H:i:s");

//¨ú­È


$insert_str = "INSERT INTO activity (time,location,host_id,confirm_code,reg_time) VALUES ('$str','$location','$host_id','$confirm_code','$current_time')";
mysqli_query($connect,$insert_str);

$index_str = "SELECT `index` FROM activity where confirm_code = '$confirm_code'";
$result = mysqli_query($connect,$index_str);
$info = mysqli_fetch_array($result);
$activity_index = $info['index'];

foreach($invite_friend as $friend){
  $id = $friend['id'];
  $name = $friend['name'];
  $invite_str = "INSERT INTO activity_join (activity_index,name,id) VALUES ('$activity_index','$name','$id')";
  mysqli_query($connect,$invite_str);
}

foreach($next_7 as $date_time){
  if($date_time['flag']!=0){
    	$day = $date_time['day'];
    	$date = $year."-".$date_time['month']."-".$date_time['date']; 
  	$activity_date = "INSERT INTO activity_date (activity_index,date,day) VALUES ('$activity_index','$date','$day')";
	mysqli_query($connect,$activity_date);
  }
}

?>
