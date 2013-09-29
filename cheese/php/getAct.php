<?
session_start();
include 'connect.php';

$index = $_POST['index'];
$return = array();
$d = 0 ;
$index = 1 ;
$select = "select * from `activity_date` where `activity_index` = '$index'";
$result = mysqli_query($connect,$select);
while($info = mysqli_fetch_assoc($result)){
  $date = $info['date'];
  $return['date'][$d] = array('date'=>$info['date'],'day'=>$info['day']);
  $select = "select * from `activity_vote` where (`activity_index`,`voted`) = ('$index','$date')";
  $vote_result = mysqli_query($connect,$select);
  while($vote = mysqli_fetch_assoc($vote_result)){
	$return['date'][$d]['invite'] = $vote ;
  }
  $d ++ ;
}

echo json_encode($return);
?>
