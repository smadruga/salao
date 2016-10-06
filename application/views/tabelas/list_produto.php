<br>

<table class="table table-hover">
    <thead>
        <tr>
            <th>Produto</th>
            <th>Qte Compra</th>
            <th>Unidade</th>
            <th>Valor Compra</th>
            <th>Valor de Venda</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <?php
        $i=0;
        if ($q) {

            foreach ($q as $row)
            {

                $url = base_url() . 'tabelas/alterar_produto/' . $row['idApp_Produto'];
                #$url = '';

                echo '<tr class="clickable-row" data-href="' . $url . '">';
                    echo '<td>' . str_replace('.',',',$row['NomeProduto']) . '</td>';
                    echo '<td>' . str_replace('.',',',$row['QuantidadeCompra']) . '</td>';
                    echo '<td>' . str_replace('.',',',$row['Unidade']) . '</td>';                    
                    echo '<td>' . str_replace('.',',',$row['ValorCompra']) . '</td>';
                    echo '<td>' . str_replace('.',',',$row['ValorVenda']) . '</td>';
                    echo '<td></td>';
                echo '</tr>';            

                $i++;
            }
            
        }
        ?>

    </tbody>
    <tfoot>
        <tr>
            <th colspan="6">Total encontrado: <?php echo $i; ?> resultado(s)</th>
        </tr>
    </tfoot>
</table>



