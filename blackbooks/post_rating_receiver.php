<?php
$servername = "carcme.ipagemysql.com";
$username = "carc";
$password = "p0th0ler";
$dbname = "blackbooks";

// Create connection 
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$coll=$_POST["collection"];
$story=$_POST["story"];
$rate=$_POST["rating"];

$sql = "CREATE TABLE IF NOT EXISTS $coll (
      ID int NOT NULL AUTO_INCREMENT,
      STORY varchar(255) NOT NULL,
      RATE FLOAT NOT NULL,
      PRIMARY KEY(ID),
      timestamp int NOT NULL,
      ip int NOT NULL
  )";

if ($conn->query($sql) === TRUE) {
    echo "New Table created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$sql = "INSERT INTO $coll (story, rate)
VALUES ('$story', $rate)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


// specify the file where we will save the contents of the variable message
$filename="story_rating.txt";
// write (append) the data to the file
file_put_contents($filename,$_POST['collection']." - ",FILE_APPEND);
file_put_contents($filename,$_POST['story']." - ",FILE_APPEND);
file_put_contents($filename,$_POST['rating']." ",FILE_APPEND);
file_put_contents($filename,"\n",FILE_APPEND);
// load the contents of the file to a variable
$androidmessages=file_get_contents($filename);

?>
