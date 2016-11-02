 <?php 
$link = mysql_connect('carcme.ipagemysql.com', '0O6uK5Iki2475mN', 'h3ll0W0rl@'); 
if (!$link) { 
    die('Could not connect: ' . mysql_error()); 
} 
echo 'Connected successfully'; 
mysql_select_db(details); 
?> 
