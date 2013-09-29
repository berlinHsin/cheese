<?
include 'connect.php';
session_start();
$order = $_POST['order'];
$userid = $_SESSION['userid'];

$invited_list = array();
$date_list = array();
$i = 0 ;
$j = 0 ;
		
$select_str = "SELECT * FROM activity WHERE `confirm_code` = '$order' ";
$result = mysqli_query($connect,$select_str);
$info = mysqli_fetch_assoc($result);

$index= $info['index'];
$check_str = "select * from `activity_join` where (`activity_index`,`id`) = ('$index','$userid')";
$result = mysqli_query($connect,$check_str);
if(!$check=mysqli_fetch_assoc($result)){
	echo null;
	exit;
}
$invited_str = "SELECT * FROM activity_join WHERE `activity_index` = '$index'" ;
$result = mysqli_query($connect,$invited_str);
while($invited = mysqli_fetch_array($result)){
  	$invited_list[$i] =array('id'=>$invited['id'],'name'=>$invited['name'],'flag'=>$invited['flag']);
	$i++;
}

$date_str = "SELECT * FROM activity_date WHERE `activity_index` = '$index' " ;
$result = mysqli_query($connect,$date_str);
while($date = mysqli_fetch_array($result)){
	$date_list[$j] = array('date'=>$date['date'],'vote'=>$date['voted']);
	$j++;
}


$invited_list = array('invite'=>$invited_list);
$date_list = array('date'=>$date_list) ;
$back = array_merge($info,$invited_list);
$back = array_merge($back,$date_list);

echo json_encode($back);

?>
