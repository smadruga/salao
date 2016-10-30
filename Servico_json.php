<?php

$link = mysql_connect('159.203.125.243', 'usuario', '20UtpJ15');
if (!$link) {
    die('Não foi possível conectar: ' . mysql_error());
}

$db = mysql_select_db('app', $link);
if (!$db) {
    die('Não foi possível selecionar banco de dados: ' . mysql_error());
}

#echo 'Conexão bem sucedida';

session_start();


$result = mysql_query(
        'SELECT
            *
        FROM 
            app.Tab_Servico AS S
        WHERE
            S.idTab_Modulo = ' . $_SESSION['log']['idTab_Modulo'] . ' AND
            S.idSis_Usuario = ' . $_SESSION['log']['id'] . '          
        ORDER BY S.NomeServico ASC'
);

while ($row = mysql_fetch_assoc($result)) {

    $event_array[] = array(
        'id' => $row['idTab_Servico'],
        'valor' => str_replace(".", ",", $row['ValorServico']),
    );
}

echo json_encode($event_array);
mysql_close($link);
?>
