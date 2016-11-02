<?php
if(isset($_POST['email_label'])) {
  $name=$_POST['name_label'];
  $email=$_POST['email_label'];
  $message=$_POST['message_label'];
  $formcontent=" From: $name \n Message: $message";
  $recipient="carcmedev@gmail.com";
  $subject="BlackBooks Feedback";
  $mailheader="From: $email \r\n";
  mail($recipient,$subject,$formcontent,$mailheader) or die("Error!");
  $url=$_SERVER['HTTP_REFERER'];
  // right back to the referrer page from where you came.
  header('Location: contact-thank-you.html');
  exit();
//  echo "Thank You."." - Returning to previous sreen now".'<meta http-equiv="refresh" content="2;URL='.$url.'">';
}
else {
  echo "Didn't send";
}
?>
<!-- TODO: Show thank you image -->