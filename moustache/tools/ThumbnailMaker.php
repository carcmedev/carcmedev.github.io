<?php
/*
   Image Thumbnail Maker
   Version 1.0
   January 1, 2016

   This software requires that the GD module is installed.

   Will Bontrager Software LLC
   http://www.willmaster.com

   This software is provided "AS IS," without 
   any warranty of any kind, without even any 
   implied warranty such as merchantability 
   or fitness for a particular purpose.
   Will Bontrager Software LLC grants 
   you a royalty free license to use this 
   software provided this notice appears 
   on all copies. 

   Copyright 2016 Will Bontrager Software LLC
*/

#$Image = ( isset($_POST['submit']) and strlen($_POST['url']) ) ? true : false;
$Error = '';
$Image = false;
if( isset($_POST['submit']) and strlen($_POST['url']) )
{
   $URLofImage = $_POST['url'];
   $imageDetails = getimagesize($URLofImage);
   if( empty($imageDetails) ) { $Error = "<p style='margin:0;'><b>No image found at<br>$URLofImage</b></p>"; }
   else { $Image = true; }
}
if( $Image )
{
   $Width = $imageDetails[0];
   $Height = $imageDetails[1];
   $Mime = $imageDetails['mime'];
   $MaxWidth = intval($_POST['width']) > 0 ? intval($_POST['width']) : $Width;
   $MaxHeight = intval($_POST['height']) > 0 ? intval($_POST['height']) : $Height;
   if( $MaxWidth > $Width ) { $MaxWidth = $Width; }
   if( $MaxHeight > $Height ) { $MaxHeight = $Height; }
   $ta = explode('.',$URLofImage);
   $sourceExtension = array_pop($ta);
   if( $sourceExtension == 'jpg' and $imageType == 'jpeg' ) { $imageType = 'jpg'; }
   $proportion = 1.0;
   if( $MaxWidth < $Width or $MaxHeight < $Height )
   {
      $i = $MaxWidth/$Width;
      $ii = $MaxHeight/$Height;
      $proportion = ( $i < $ii ) ? $i : $ii;
   }
   $newwidth = intval( ( $Width * $proportion ) + .5 );
   $newheight = intval( ( $Height * $proportion ) + .5 );
}
if( isset($_GET['render']) )
{
   $URLofImage = $_GET['url'];
   $Width = $_GET['oW'];
   $Height = $_GET['oH'];
   $Mime = $_GET['oMime'];
   $newwidth = $_GET['newwidth'];
   $newheight = $_GET['newheight'];
   $imageType = preg_replace('!^.*/!','',$Mime);
   $ta = explode('.',$URLofImage);
   $sourceExtension = array_pop($ta);
   if( $sourceExtension == 'jpg' and $imageType == 'jpeg' ) { $imageType = 'jpg'; }
   header("Content-type: $Mime");
   $thumb = imagecreatetruecolor($newwidth, $newheight);
   $source;
   switch($imageType)
   {
      case 'png' : $source = imagecreatefrompng($URLofImage); break;
      case 'gif' : $source = imagecreatefromgif($URLofImage); break;
      case 'jpeg': case 'jpg': $source = imagecreatefromjpeg($URLofImage);
   }
   #$thumb = imagescale($source,$newwidth,$newheight);
   imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $Width, $Height);
   switch($imageType)
   {
      case 'png' : imagepng($thumb); break;
      case 'gif' : imagegif($thumb); break;
      case 'jpeg': case 'jpg': imagejpeg($thumb);
   }
   imagedestroy($thumb);
   exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Image Thumbnail Maker</title>
<style type="text/css">
html, body { font-size:100%; font-family:arial, sans-serif; }
body { margin:50px 25px 100px 25px; }
input, textarea { width:100%; box-sizing:border-box; font-family:arial, sans-serif; }
input[type=text], textarea { border:1px solid #999; border-radius:5px; padding:5px; font-size:1em; }
#content { max-width:500px; 
   margin:0 auto; 
   background-color:transparent; 
   padding:25px; 
   border:1px solid #ccc;
   border-radius:7px;
   box-shadow:0px 0px 3px 0px #999; 
   position:relative; 
   box-sizing:border-box; 
   }
.bold { font-weight:bold; }
.nowrap { white-space:nowrap; }
</style>
</head>
<body>
<div id="content">
<form method="post" enctype="multipart/form-data" accept-charset="utf-8" action="<?php echo(htmlspecialchars($_SERVER['PHP_SELF'])); ?>">
<h1 style="margin-top:0; text-align:center; z-index:22;">Image Thumbnail Maker</h1>
<div style="position:absolute; left:-25px; top:-25px; margin-right:15px; z-index:1;">
<a href="http://www.willmaster.com/">
<img src="data:image/gif;base64,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" 
style="width:50px; Height:50px; border:none; outline:none;" 
alt="Willmaster logo" 
name="Willmaster.com logo">
</a>
</div>
<?php if($Error): ?>
<div style="border:3px double red; padding:15px; color:red;">
<?php echo($Error); ?>
</div>
<?php endif; ?>
<?php if($Image): ?>
The thumbnail image is below and may be saved to your computer or device. (If the thumbnail width is larger than the width of the control panel, the browser might display the image to fit; but the image will save with the dimensions it was generated as.)
</p>
<iframe 
   id="iframe-for-image" 
   style="padding:0; width:100%; height:<?php echo(intval($newheight+20)); ?>px; border:none;"
   src="<?php echo($_SERVER['PHP_SELF']); ?>?render=1&newwidth=<?php echo($newwidth); ?>&newheight=<?php echo($newheight);?>&url=<?php echo($_POST['url']); ?>&oW=<?php echo($Width); ?>&oH=<?php echo($Height); ?>&oMime=<?php echo($Mime); ?>">
</iframe>
<p class="bold" style="margin-top:.25in;">
The Form:
</p>
<?php endif; ?>
<p>
URL of image.<br>
<input type="text" name="url" value="<?php echo(htmlspecialchars(@$_POST['url'])); ?>">
</p>
<p style="margin-bottom:5px;">
At least one of the maximum... fields needs to be filled in. Specify number of pixels.
</p>
<table style="margin-left:1em; border="0" cellpadding="0" cellspacing="0">
<tr>
<td style="padding-right:.25em; white-space:nowrap;">Maximum width.</td>
<td><input type="text" name="width" style="width:60px;" value="<?php echo( (isset($_POST['width']) and intval($_POST['width'])>0) ? intval($_POST['width']):''); ?>"></td>
</tr>
<tr>
<td style="padding-right:.25em; white-space:nowrap; padding-top:5px;">Maximum Height.</td>
<td style="padding-top:5px;"><input type="text" name="height" style="width:60px;" value="<?php echo( (isset($_POST['height']) and intval($_POST['height'])>0) ? intval($_POST['height']):''); ?>"></td>
</tr>
</table>
<p style="margin-bottom:1em;">
<input type="submit" name="submit" value="Make Thumbnail">
</p>
</form>
<div style="position:relative; top:1em; left:-1em; margin-left:7em; text-indent:-7em;"><p style="margin:0;">
Copyright 2016 <a href="http://www.willmaster.com/">Will Bontrager <span class="nowrap">Software LLC</span></a>
</p></div>
</div>
</body>
</html>
