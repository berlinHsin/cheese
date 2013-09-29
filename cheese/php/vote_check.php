<?
session_start();
include 'connect.php';

$user = $_REQUEST['user'];

$userid = $user['userid'];
$confirm_code = $user['confirm_code'];

$select_str = "select `index` from `activity` where `confirm_code` = '$confirm_code'";
$result = mysqli_query($connect,$select_str);
$info = mysqli_fetch_array($result);
$index = $info['index'];

$flag_str = "select `flag` from `activity_join` where (`activity_index`,`id`) = ('$index','$userid')";
$result = mysqli_query($connect,$result);
$info = mysqli_fetch_array($result);
$flag = $info['flag'];

echo $flag ;

?>
