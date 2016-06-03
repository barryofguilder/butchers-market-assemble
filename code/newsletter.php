<?php
//TODO: Переписать версию
// Newsletter v.2.0
// Balakadesign, 2015
// yuriybalaka@gmail.com

// Message lexicon
require 'lang_en.php';

// Form message template file
require 'template.php';

// Site Owner Info
$owner_name = "The Butchers Market"; // Write Your Name
$owner_email = "drew@thebutchersmarket.com"; // Write Your E-mail

// Getting POST data from form
$from = htmlspecialchars($_POST['emailAddress']);

// Checking for errors
// If email empty
if($from==""){ die($err_tpl_begin . $err_msg_noemail . $err_tpl_end);}
// If email contains wrong symbols
$email_exp = '/^[a-zа-я0-9._%-]+@[a-zа-я0-9.-]+\.[a-zа-я]{2,8}$/iu';
if(!preg_match($email_exp,$from)) { die($err_tpl_begin . $err_msg_wrongmail . $err_tpl_end);}

// Letter headers for site owner
$to_owner = $owner_email;
$subject_owner = "You got a new Subscriber!"; // E-mail theme here
$headers_owner = "MIME-Version: 1.0 " . "\r\n";
$headers_owner .="Content-Type: text/html; charset=\"UTF-8\"" . "\r\n";
$headers_owner .="From: $name <$from>" . "\r\n";
$headers_owner .="Reply-To: $from" . "\r\n";
$headers_owner .="X-Mailer: PHP/" . phpversion();

// Letter body for site owner
$message_owner  = "<html>" . "\r\n";
$message_owner .= "  <head>" . "\r\n";
$message_owner .= "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" . "\r\n";
$message_owner .= "    <title>" . $subject_owner . " from " . $from . "</title>" . "\r\n";
$message_owner .= "  </head>" . "\r\n";
$message_owner .= "  <body>" . "\r\n";
$message_owner .= "    <style>" . "\r\n";
$message_owner .= "      .container { width:600px; margin:0 auto; line-height:1.4;}" . "\r\n";
$message_owner .= "    </style>" . "\r\n";
$message_owner .= "    <div style=\"width:100%; position:relative; background: #f5f5f5; font-size:14px;\">" . "\r\n";
$message_owner .= "      <div style=\"width:600px; margin:40px auto; padding: 40px 15px; background:#fff;\">" . "\r\n";
// Content Block
$message_owner .= "        <div style=\"border-bottom:1px solid #e5e5e5; padding:20px 40px\">" . "\r\n";
$message_owner .= "          <img src=\"theme.balakadesign.ru/barnaul/v1.0/img/barnaul-logo.png\" style=\"width:150px;\">" . "\r\n";
$message_owner .= "        </div>" . "\r\n";
// Content Block
$message_owner .= "        <div style=\"border-bottom:1px solid #e5e5e5; padding:10px 40px\">" . "\r\n";
$message_owner .= "          <h2>" . $subject_owner . " From " . "<a href=\"mailto:" . $from .  "\">" . $from . "</a></h2>" . "\r\n";
$message_owner .= "          <p><strong>E-mail: </strong>" . "<a href=\"mailto:" . $from .  "\">" . $from . "</a></p>" . "\r\n";
$message_owner .= "        </div>" . "\r\n";

$message_owner .= "      </div>" . "\r\n";
$message_owner .= "    </div>" . "\r\n";
$message_owner .= "  </body>" . "\r\n";
$message_owner .= "</html>" . "\r\n";


// Letter headers for writer
$to_writer = $from;
$subject_writer = "You're new Subscriber!";
$headers_writer = "MIME-Version: 1.0 " . "\r\n";
$headers_writer .="Content-Type: text/html; charset=\"UTF-8\"" . "\r\n";
$headers_writer .="From: $owner_name <$owner_email>" . "\r\n";
$headers_writer .="Reply-To: $owner_email" . "\r\n";
$headers_writer .="X-Mailer: PHP/" . phpversion();

// Letter body for writer
$message_writer  = "<html>" . "\r\n";
$message_writer .= "  <head>" . "\r\n";
$message_writer .= "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" . "\r\n";
$message_writer .= "    <title>" . $subject_writer . " from " . $from . "</title>" . "\r\n";
$message_writer .= "  </head>" . "\r\n";
$message_writer .= "  <body>" . "\r\n";
$message_writer .= "    <style>" . "\r\n";
$message_writer .= "      .container { width:600px; margin:0 auto; line-height:1.4;}" . "\r\n";
$message_writer .= "    </style>" . "\r\n";
$message_writer .= "    <div style=\"width:100%; position:relative; background: #f5f5f5; font-size:14px;\">" . "\r\n";
$message_writer .= "      <div style=\"width:600px; margin:40px auto; padding: 40px 15px; background:#fff;\">" . "\r\n";
// Content Block
$message_writer .= "        <div style=\"border-bottom:1px solid #e5e5e5; padding:20px 40px\">" . "\r\n";
$message_writer .= "          <img src=\"theme.balakadesign.ru/barnaul/v1.0/img/barnaul-logo.png\" style=\"width:150px;\">" . "\r\n";
$message_writer .= "        </div>" . "\r\n";
// Content Block
$message_writer .= "        <div style=\"border-bottom:1px solid #e5e5e5; padding:10px 40px\">" . "\r\n";
$message_writer .= "          <h2>" . $subject_writer . " from " . "<a href=\"mailto:" . $from .  "\">" . $from . "</a></h2>" . "\r\n";
$message_writer .= "          <p><strong>E-mail: </strong>" . "<a href=\"mailto:" . $from .  "\">" . $from . "</a></p>" . "\r\n";
$message_writer .= "        </div>" . "\r\n";
$message_writer .= "      </div>" . "\r\n";
$message_writer .= "    </div>" . "\r\n";
$message_writer .= "  </body>" . "\r\n";
$message_writer .= "</html>" . "\r\n";


// Receiving data
try {
    mail($to_owner, $subject_owner, $message_owner, $headers_owner);
    mail($to_writer, $subject_writer, $message_writer, $headers_writer);
    echo "PRINYAL";
} catch (Exception $ex) {
    echo $ex->getMessage();
}

?>
