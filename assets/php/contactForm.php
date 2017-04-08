<?php

	// Contact
	// $to = 'es-kireeva@mail.ru';
        $to = 'f.kireeva@gmail.com';
	$subject = 'Письмо с сайта alicezed.ru';

	if(isset($_POST['c_name']) && isset($_POST['c_email']) && isset($_POST['c_message'])){
		$name    = $_POST['c_name'];
		$from    = $_POST['c_email'];
		$message = $_POST['c_message'];
		$headers = 'From: '. $name .'<'. $from . '>\r\n';

		if (mail($to, $subject, $message, $headers)) {
			$result = array(
				'message' => 'Спасибо!',
				'sendstatus' => 1
				);
			echo json_encode($result);
		} else {
			$result = array(
				'message' => 'Извините, что-то пошло не так',
				'sendstatus' => 1
				);
			echo json_encode($result);
		}
	}

?>