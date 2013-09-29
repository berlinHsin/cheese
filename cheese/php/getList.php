<?
session_start();
include 'connect.php';

$userid = $_POST['userid'];
$userid = $_SESSION['userid'];
$i = 0;
$j = 0;
$voting = array();
$done = array();

$list_str = "select * from `activity` where `host_id` = '$userid'";
$result = mysqli_query($connect,$list_str);
while($info = mysqli_fetch_array($result)){
  $flag = $info['enable'];
  switch($flag){
  case 1 :
    $voting[$i] = array($info);
    $i++; 
    break;
  case 2:
    $done[$j] = array($info);
    $j++;
    break;
  }
}
$invited_str = "select `activity_index` from `activity_join` where `id` = '$userid'";
$result = mysqli_query($connect,$invited_str);
while($info = mysqli_fetch_assoc($result)){
  $index = $info['activity_index'];
  $activity_str = "select * from `activity` where `index` = '$index' ";
  $activity_result = mysqli_query($connect,$activity_str);
  while($temp = mysqli_fetch_assoc($activity_result)){
    $flag = $temp['enable'];
    switch($flag){
    case 1:
      $voting[$i] = array($temp);
      $i++;
      break;
    case 2:
      $done[$j] = array($temp);
      $j++;
      break;
    }
  }
}


$return = array_merge($voting,$done);
echo json_encode($return);

?>
