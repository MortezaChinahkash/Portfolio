<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
        
    case("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");
        
        // Payload is not send to $_POST Variable,
        // is send to php:input as a text
        $json = file_get_contents('php://input');
        //parse the Payload from text format to Object
        $params = json_decode($json);

        // Validate input
        if (!$params || !isset($params->email) || !isset($params->name) || !isset($params->message)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            exit;
        }

        $email = filter_var($params->email, FILTER_SANITIZE_EMAIL);
        $name = htmlspecialchars($params->name, ENT_QUOTES, 'UTF-8');
        $messageText = htmlspecialchars($params->message, ENT_QUOTES, 'UTF-8');

        // Validate email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid email address']);
            exit;
        }

        $recipient = 'kontakt@m-chinahkash.de';  
        $subject = "Contact From Portfolio: " . $name . " <$email>";
        $messageBody = "
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> " . $name . "</p>
        <p><strong>Email:</strong> " . $email . "</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br($messageText) . "</p>
        <hr>
        <p><small>Sent from Portfolio Contact Form</small></p>
        ";

        $headers   = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: Portfolio Contact <noreply@m-chinahkash.de>";
        $headers[] = "Reply-To: " . $email;

        $mailSent = mail($recipient, $subject, $messageBody, implode("\r\n", $headers));
        
        if ($mailSent) {
            echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to send email']);
        }
        break;
        
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
} 

?>
