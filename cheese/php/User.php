<?
session_start();
include 'connect.php';

function($array){
  switch($array['field']){
  case 'add':
    $account = $array['account'];
    $password = $array['password'];
    $name = $array['name'];
    $email = $array['email'];
    $cellphone = $array['cellphone'];
    $str = "insert into `cheese_user`";
    $check_str = "select `index` from `cheese_user` where `account` = '$account'";
    $result = mysqli_query($connect,$check_str);
    if($temp = mysqli_fetch_row($result)){
      return 1;
    }else{
      $current = date("Y-m-d/H:i:s");
      $insert_str = "insert into `activity` (`account`,`password`,`name`,`email`,`cellphond`,`reg_time`)";
      $insert_str = $insert_str." values ('$account','$password','$name','$email','$cellphone','$current')";
      mysqli_query($connect,$insert_str);
      return 2;
    }
    break;
  case 'get':
    break;
  case 'delete':
    break;
  }
  return $return;
}

?>
