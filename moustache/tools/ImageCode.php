<?php
/*
   Embedded Image Code Generator
   Version 1.0b
   January 1, 2016

   Version 1.0b - Added "no image" error message.
   Version 1.0, December 28, 2015

   This software requires that the GD module is installed.

   Will Bontrager Software LLC
   http://www.willmaster.com

   This software is provided "AS IS," without any warranty of any kind, 
   without even any implied warranty such as merchantability or fitness 
   for a particular purpose. Use of this software is subject to the 
   Website's Secret Software License Agreement.
   http://www.willmaster.com/software/WebSitesSecret/WS_LicenseAgreement.html

   Copyright 2015 Will Bontrager Software LLC
*/

$Code = $Mime = '';
if( isset($_POST['submit']) and strlen($_POST['url']) )
{
   $_POST['atts'] = trim($_POST['atts']);
   $imageDetails = getimagesize($_POST['url']);
   $Mime = $imageDetails['mime'];
   if( empty($imageDetails) ) { $Code = "\n\nNO IMAGE FOUND AT {$_POST['url']}\n\n\n"; }
   else { $Code = base64_encode( file_get_contents($_POST['url']) ); }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Embedded Image Code Generator</title>
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
<h1 style="margin-top:0; text-align:center; z-index:22;">Embedded Image<br>Code Generator</h1>
<div style="position:absolute; left:-25px; top:-25px; margin-right:15px; z-index:1;">
<a href="http://www.willmaster.com/">
<img src="data:image/gif;base64,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" 
style="width:50px; height:50px; border:none; outline:none;" 
alt="Willmaster logo" 
name="Willmaster.com logo">
</a>
</div>
<?php if($Code): ?>
<p>
Here's the code for embedding the image.
<textarea name="atts" style="height:1.5in;" wrap="off" onclick="select()">
<img 
src="data:<?php echo($Mime); ?>;base64,<?php echo($Code); ?>" 
<?php echo($_POST['atts']); ?>>
</textarea>
</p>
<p class="bold" style="margin-top:.5in;">
The Form:
</p>
<?php endif; ?>
<p>
URL of image.<br>
<input type="text" name="url" value="<?php echo(htmlspecialchars(@$_POST['url'])); ?>">
</p>
<p>
Optional attributes <span class="nowrap">for image tag</span> <span class="nowrap">(can also be added later).</span><br>
<textarea name="atts" style="height:.75in;" wrap="off"><?php echo(htmlspecialchars(@$_POST['atts'])); ?></textarea>
<p style="margin-bottom:1em;">
<input type="submit" name="submit" value="Generate Embedded Image Code">
</p>
</form>
<div style="position:absolute; bottom:3px; left:3px;"><p style="margin:0;">
Copyright 2015,2016 <a href="http://www.willmaster.com/">Will Bontrager Software LLC</a>
</p></div>
</div>
</body>
</html>
