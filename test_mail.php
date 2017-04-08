<?php

// Сообщение

$message = "test php mail1";

echo "123";

// На случай если какая-то строка письма длиннее 70 символов мы используем wordwrap()

$message = wordwrap($message, 70);

// Отправляем

$result = mail('alexvassel@gmail.com', 'My Subject', $message);

echo $result;

?>