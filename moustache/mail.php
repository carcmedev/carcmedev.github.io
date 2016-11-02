<?php
if(isset($_POST['email'])) {
  $name=$_POST['name'];
  $email=$_POST['email'];
  $message=$_POST['message'];
  $formcontent=" From: $name \n Message: $message";
  $recipient="carcmedev+moustache@gmail.com";
  $subject="Moustache Feedback";
  $mailheader="From: $email \r\n";
  mail($recipient,$subject,$formcontent,$mailheader) or die("Error!");
  $url=$_SERVER['HTTP_REFERER'];
  // right back to the referrer page from where you came.
  echo "Thank You."." - Returning to previous sreen now".'<meta http-equiv="refresh" content="2;URL='.$url.'">';
}
?>
<!-- TODO: Show thank you image -->