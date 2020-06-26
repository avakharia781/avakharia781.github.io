<?php
    if(isset($_POST['submit'])){
        $name  = $_POST['name'];
        $email = $_POST['email'];
        $sub   = $_POST['sub'];
        $msg   = $_POST['msg']; 

        $to = 'arpitvakharia96@gmail.com';
        $message = $name." Wrote the following message:"."\n\n".$msg;
        $header = "From: ".$email;

        if(mail($to, $sub, $message, $header)){
            echo "<p>Sent Successfully! Thank you! ".$name.", I will get in touch with you shortly.</p>";
        }else{
            echo "<p>Oops! Something went wrong.</p>";
        }
    }
?>