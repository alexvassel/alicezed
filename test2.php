<?php

// Сообщение

$message = "test php mail1";

// На случай если какая-то строка письма длиннее 70 символов мы используем wordwrap()

$message = wordwrap($message, 70);

// Отправляем

$result = mail('andrewfv86@gmail.com', 'My Subject', $message);

echo $result;

?>
