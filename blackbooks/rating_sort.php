<?php

  $lines = file("story_rating.txt");
  natsort($lines);

  $myArray = explode(' - ', $lines));
  print_r($myArray);  
  
  file_put_contents("sorted_ratings.txt", implode(PHP_EOL, $lines));

?>