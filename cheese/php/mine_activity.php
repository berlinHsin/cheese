<?
session_start();
include 'connect.php';
$userid = $_SESSION['userid'];

$mine_list = array();
$i = 0;


$myactivity_str = "SELECT * FROM `activity` WHERE `host_id` = '$userid' ";
$result = mysqli_query($connect,$myactivity_str) ;
while($info = mysqli_fetch_assoc($result)){
  $pro = array('pro'=>1);
  $info = array_merge($pro,$info);
  $friend_list = array();
  $j = 0 ;
  $index = $info['index'];
  $invite_str = "select * from `activity_join` where `activity_index` = '$index'";
  $invite_result = mysqli_query($connect,$invite_str);
  while($list = mysqli_fetch_assoc($invite_result)){
    $friend_list[$j] = $list;
    $j++;
  }
  $arr = array('invite'=>$friend_list);
  $mine_list[$i] = array_merge($info,$arr) ;
  $i++ ;
}
$invact_str = "select * from `activity_join` where `id` = '$userid'";
$result = mysqli_query($connect,$invact_str);
while($temp = mysqli_fetch_assoc($result)){
  $index = $temp['activity_index'];
  $act_str = "select * from `activity` where `index` = '$index'";
  $act_result = mysqli_query($connect,$act_str);
  $info = mysqli_fetch_assoc($act_result);
  $friend_list = array();
  $j = 0 ;
  $act_index = $info['index'];
  $invite_str = "select * from `activity_join` where `activity_index` = '$act_index'";
  $invite_result = mysqli_query($connect,$invite_str);
  while($list = mysqli_fetch_assoc($invite_result)){
  	$friend_list[$j] = $list;
	$j++ ;
  }
  $pro = array('pro'=>0);
  $info = array_merge($info,$pro);
  $arr = array('invite'=>$friend_list);
  $mine_list[$i] = array_merge($info,$arr);
  $i++;
}

echo json_encode($mine_list);


?>
