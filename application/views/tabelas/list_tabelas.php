<br>

<table class="table table-hover">
    <thead>
        <tr>
            <th>Profissional</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <?php
        $i=0;
        if ($q) {

            foreach ($q as $row)
            {

                $url = base_url() . 'tabelas/alterar/' . $row['idApp_Profissional'];
                #$url = '';

                echo '<tr class="clickable-row" data-href="' . $url . '">';
                    echo '<td>' . $row['NomeProfissional'] . '</td>';
                    echo '<td></td>';
                echo '</tr>';            

                $i++;
            }
            
        }
        ?>

    </tbody>
    <tfoot>
        <tr>
            <th colspan="3">Total encontrado: <?php echo $i; ?> resultado(s)</th>
        </tr>
    </tfoot>
</table>



