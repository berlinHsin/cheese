<?

session_start();
include 'connect.php';

$vote_list = $_REQUEST['vote_list'];
$code = $_REQUEST['code'];
$confirm_code = $code['confirm_code'];
$userid = $code['userid'];
$username = $code['username'];
$check = 0 ;
$select_str = "SELECT * FROM activity WHERE `confirm_code` = '$confirm_code'";
$result = mysqli_query($connect,$select_str);
$info = mysqli_fetch_array($result);
$index = $info['index'];
$cur = date("Y-m-d/H:i:s");

$flag_str = "UPDATE `activity_join` SET `flag` = '1' WHERE (`activity_index`,`id`) = ('$index','$userid')";
mysqli_query($connect,$flag_str);

foreach($vote_list as $date){
  $vote_str = "UPDATE `activity_date` SET `voted` = `voted`+1 WHERE (`activity_index`,`date`) = ('$index','$date')";
  mysqli_query($connect,$vote_str);
  $insert_str = "insert into `activity_vote` (`activity_index`,`voted`,`userid`,`username`,`voted_time`)
    values ('$index','$date','$userid','$username','$cur')";
  mysqli_query($connect,$insert_str);
}
$select = "select `flag` from `activity_join` where `activity_index` = '$index'";
$result = mysqli_query($connect,$select_str);
while($info = mysqli_fetch_array($result)){
  if($info['flag']==0){
    $check = 1 ;
  }
}
if($check==0){
  $date = '';
  $voted = 0 ;
  $chosen = "select * from `activity_date` where `activity_index` = '$index'";
  $result = mysqli_query($connect,$chosen);
  while($chosen_date = mysqli_fetch_assoc($result)){
    $temp = $chosen_date['voted'] ;
    if($temp>=$voted){
      $day = $chosen_date['day'];
      $date = $chosen_date['date'];
      $voted = $temp;
    }	
  }
  $update = "update `activity` set `enable` = '2' , `chosen_date` = '$date' , `chosen_day` = '$day'
    where `confirm_code` = '$confirm_code'";
  mysqli_query($connect,$update);
  $update = "update `activity_date` set `state` = '2' where `activity_index` = '$index'";
  mysqli_query($connect,$update);
}

?>
