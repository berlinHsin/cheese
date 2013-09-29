<?

$connect = mysqli_connect('sql100.ucart.tw','ucart_13155837','devechee')or die("Can't access MySQL");
mysqli_query($connect,"SET NAMES 'UTF8'");
mysqli_select_db($connect,'ucart_13155837_cheese');
?>
