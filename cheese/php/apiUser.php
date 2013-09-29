<?
session_start();
include 'connect.php';

function apiUser($parm){
  switch($parm['field']){
  case 'add':
    $temp = array('account','password','email','username','cellphone');

    $account = $parm[$temp[0]];
    $password = $parm[$temp[1]];
    $email = $parm[$temp[2]];
    $username = $parm[$temp[3]];
    $cellphone = $parm[$temp[4]];

    $check = "select `index` from `cheese_user` where (`account`,`enable`) = ('$account','1')";
    $result = mysqli_query($connect,$check);

    if(!mysqli_fetch_row($result)){
      $cur = date("Y-m-d/H:i:s");
      $insert = "insert into `cheese_user` (`account`,`password`,`email`,`username`,`cellphone`,
	`reg_time`) values ('$account','$password','$email','$username','$cellphone','$cur')";
      mysqli_query($connect,$insert);
      return '1';
    }else{
      return '0';
    }
    break;

  case 'get':
    $temp = array('account');

    $account = $parm[$temp[0]];

    $fit = "select `id` from `cheese_user` where (`account`,`enable`) = ('$account','1')";
    $result = mysqli_query($connect,$fit);

    if(!$fit = mysqli_fetch_assoc($result)){
      $a = 0 ;
      $act = "select `index` from `activity` where `account` = '$account'";	
      $act_result = mysqli_query($connect,$act);
      while($act_info = mysqli_fetch_assoc($act_result)){
	$act_list[$a] = array('index'=>$act_info['index'],'enable'=>$act_info['enable']);
	$a ++ ;
      }
      return $act_list;
    }else{
      $userid = $fit['id'];
      $act = "select `index` from `activity` where `host_account` = '$account' or `host_id` = '$userid'";	
      $act_result = mysqli_query($connect,$act);
      while($act_info = mysqli_fetch_assoc($act_result)){
	$act_list[$a] = array('index'=>$act_info['index'],'enable'=>$act_info['enable']);
	$a ++ ;
      }
      return $act_list;
    }
    break;
  case 'delete':
    break;
  default:
    return '9';
    break;
  }
}

?>
