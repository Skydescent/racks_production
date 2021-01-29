<?php
require_once $_SERVER['DOCUMENT_ROOT']."/backend-react/classes/class.phpmailer.php";


header("Access-Control-Allow-Origin: *");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if ($_POST && $_POST['email']) {

    function getCleanedData($data)
    {
        if (gettype($data) === "string") {
            return htmlspecialchars($data);
        }
        if(gettype($data) === "array") {
            return array_map('getCleanedData', $data);
        }
        return $data;
    }
    $cleanedPost = array_map("getCleanedData", $_POST);

    $productMessage = isset($cleanedPost['product']) ? array_reduce($cleanedPost['product'], function ($acc, $curr) {
        $acc .= "<li>{$curr['title']}: {$curr['value']} </li>" . PHP_EOL;
        return $acc;
    }) : '';

    $orderMessage = isset($cleanedPost['order']) ? array_reduce($cleanedPost['order'], function ($acc, $curr) {
        $acc .= "<li>{$curr['title']}: {$curr['value']} </li>" . PHP_EOL;
        return $acc;
    }) : '';

    $message = "<h3>Новый заказ:</h3>
        <ul>
            <li>Телефон: {$cleanedPost['phone']}</li>
            <li>Электронный адрес: {$cleanedPost['email']}</li>
            <li>Категория товара: {$cleanedPost['name']}</li>
            {$productMessage}
            <li>Комментарий к заказу: {$cleanedPost['comment']}</li>
            {$orderMessage}
        </ul>";
        $emails = [
            'kirill310587@mail.ru'
            //'websterhobo@gmail.com',
            //'lichnoivanovu@yandex.ru',
            //'stellage-tomsk@mail.ru',
            //'sibgh@mail.ru',
        ];
        //print_r($_POST); print_r($message); exit();
        $mail = new PHPMailer();
        $mail->IsMail();
        foreach ($emails as $val) {
            $mail->AddAddress($val);
        }
        $mail->Subject = "Заказ с сайта стеллаж-томск.рф";
        $mail->MsgHTML($message);
        $mail->AddReplyTo('noreply@'.$_SERVER['HTTP_HOST'], 'стеллаж-томск.рф');
        $mail->SetFrom('noreply@'.$_SERVER['HTTP_HOST'], 'стеллаж-томск.рф');
        //$mail->Send();

        echo json_encode(['result'=> 'success']);
}


