<?php

$link = mysql_connect('159.203.125.243', 'usuario', '20UtpJ15');
if (!$link) {
    die('N�o foi poss�vel conectar: ' . mysql_error());
}

$db = mysql_select_db('app', $link);
if (!$db) {
    die('N�o foi poss�vel selecionar banco de dados: ' . mysql_error());
}

#echo 'Conex�o bem sucedida';

session_start();

$result = mysql_query(
        'SELECT
            idApp_Servico,
            NomeServico,
            ValorServico
        FROM 
            App_Servico 
        WHERE
            idTab_Modulo = ' . $_SESSION['log']['idTab_Modulo'] . ' AND
            idSis_Usuario = ' . $_SESSION['log']['id']
);

while ($row = mysql_fetch_assoc($result)) {

    $event_array[] = array(
        'id' => $row['idApp_Servico'],
        'name' => utf8_encode($row['NomeServico']),
        'value' => $row['ValorServico'],
    );
}

echo json_encode($event_array);
mysql_close($link);
?>
