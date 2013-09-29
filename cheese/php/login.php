<?php
session_start();
include 'connect.php';

$userid = $_POST['id'];
$name = $_POST['name'];

$_SESSION['userid'] =  $userid ;
$_SESSION['username'] = $name ;

$time = date("Y-m-d/H:i:s");

$check_str = "SELECT * FROM user WHERE userid = '$userid'";
$result = mysqli_query($connect,$check_str);

if($info = mysqli_fetch_array($result)){
  $msg = array('msg'=>'Welcome back !');
}else{
  $insert_str = "INSERT INTO user (userid,username,reg_time) VALUES ('$userid','$name','$time') ";
  mysqli_query($connect,$insert_str)or die('error');
  $msg = array('userid'=>$userid,'name'=>$name,'msg'=>'Welcome to join us!');
}
echo json_encode($msg);

?>
