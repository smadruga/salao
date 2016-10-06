<?php if (isset($msg)) echo $msg; ?>

<div class="row">

    <div class="col-sm-3 col-md-2 sidebar">
        <?php echo $nav_secundario; ?>
    </div>

    <div class="col-sm-7 col-sm-offset-3 col-md-8 col-md-offset-2 main">

        <?php echo validation_errors(); ?>

        <div class="panel panel-<?php echo $panel; ?>">

            <div class="panel-heading"><strong><?php echo $titulo; ?></strong></div>
            <div class="panel-body">

                <?php echo form_open_multipart($form_open_path); ?>

                <div class="form-group">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="Data">Data: *</label>
                            <div class="input-group <?php echo $datepicker; ?>">
                                <input type="text" class="form-control Date" <?php echo $readonly; ?> maxlength="10" placeholder="DD/MM/AAAA"
                                       name="Data" value="<?php echo $query['Data']; ?>">
                                <span class="input-group-addon" disabled>
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6 form-inline">
                            <div class="form-group">
                                <label for="Hora">Hora: *</label><br>
                                De 
                                <div class="col-md-5 input-group <?php echo $timepicker; ?>">
                                    <input type="text" class="form-control Time" <?php echo $readonly; ?> maxlength="5"  placeholder="HH:MM"
                                           accept=""name="HoraInicio" value="<?php echo $query['HoraInicio']; ?>">
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-time"></span>
                                    </span>
                                </div>

                                At�
                                <div class="col-md-5 input-group <?php echo $timepicker; ?>">
                                    <input type="text" class="form-control Time" <?php echo $readonly; ?> maxlength="5" placeholder="HH:MM"
                                           accept=""name="HoraFim" value="<?php echo $query['HoraFim']; ?>">
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-time"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 form-inline">
                            <label for="idTab_TipoConsulta">Tipo de Consulta:</label><br>
                            <div class="form-group">
                                <div class="btn-group" data-toggle="buttons">
                                    <?php
                                    foreach ($select['TipoConsulta'] as $key => $row) {
                                        (!$query['idTab_TipoConsulta']) ? $query['idTab_TipoConsulta'] = '1' : FALSE;

                                        if ($query['idTab_TipoConsulta'] == $key) {
                                            echo ''
                                            . '<label class="btn btn-warning active" name="radio_idTab_TipoConsulta" id="radiogeral' . $key . '">'
                                            . '<input type="radio" name="idTab_TipoConsulta" id="radiogeral" '
                                                . 'autocomplete="off" value="' . $key . '" checked>' . $row
                                            . '</label>'
                                            ;
                                        } else {
                                            echo ''
                                            . '<label class="btn btn-default" name="radio_idTab_TipoConsulta" id="radiogeral' . $key . '">'
                                            . '<input type="radio" name="idTab_TipoConsulta" id="radiogeral" '
                                                . 'autocomplete="off" value="' . $key . '" >' . $row
                                            . '</label>'
                                            ;
                                        }
                                    }
                                    ?>  
                                </div>
                            </div>
                        </div>  
                    </div>
                </div> 

                <div class="form-group">
                    <div class="row">
                        <div class="col-md-4">
                            <label for="idApp_Profissional">Profissional: *</label>
                            <a class="btn btn-xs btn-info" href="<?php echo base_url() ?>tabelas/cadastrar/profissional" role="button"> 
                                <span class="glyphicon glyphicon-plus"></span> <b>Novo Profissional</b>
                            </a>
                            <select data-placeholder="Selecione uma op��o..." class="form-control" <?php echo $readonly; ?>
                                    id="idApp_Profissional" name="idApp_Profissional">
                                <option value="">-- Selecione uma op��o --</option>
                                <?php
                                foreach ($select['Profissional'] as $key => $row) {
                                    if ($query['idApp_Profissional'] == $key) {
                                        echo '<option value="' . $key . '" selected="selected">' . $row . '</option>';
                                    } else {
                                        echo '<option value="' . $key . '">' . $row . '</option>';
                                    }
                                }
                                ?>   
                            </select>          
                        </div>                            
                        <div class="col-md-3 form-inline">
                            <label for="Paciente">Cliente:</label><br>
                            <div class="form-group">
                                <label class="radio-inline">
                                    <input type="radio" id="hide"
                                           name="Paciente" value="R" <?php echo $radio['Paciente'][0]; ?>> O Pr�prio
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" id="show"
                                           name="Paciente" value="D" <?php echo $radio['Paciente'][1]; ?>> Dependente
                                </label>
                            </div>
                        </div>                        
                        <div class="col-md-4" id="Paciente" <?php echo $div['Paciente']; ?>>
                            <label for="idApp_Dependente">Dependente: *</label>
                            <a class="btn btn-xs btn-info" href="<?php echo base_url() ?>dependente/cadastrar" role="button"> 
                                <span class="glyphicon glyphicon-plus"></span> <b>Novo Dependente</b>
                            </a>
                            <select data-placeholder="Selecione uma op��o..." class="form-control" <?php echo $readonly; ?>
                                    id="idApp_Dependente" name="idApp_Dependente">
                                <option value="">-- Selecione uma op��o --</option>
                                <?php
                                foreach ($select['Dependente'] as $key => $row) {
                                    if ($query['idApp_Dependente'] == $key) {
                                        echo '<option value="' . $key . '" selected="selected">' . $row . '</option>';
                                    } else {
                                        echo '<option value="' . $key . '">' . $row . '</option>';
                                    }
                                }
                                ?>   
                            </select>          
                        </div>                                                        
                    </div>
                </div>                 

                <?php if ($metodo == 2) { ?>


                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12 form-inline">
                                <label for="idTab_Status">Status:</label><br>
                                <div class="form-group">
                                    <div class="btn-group" data-toggle="buttons">
                                        <?php
                                        foreach ($select['Status'] as $key => $row) {
                                            if (!$query['idTab_Status'])
                                                $query['idTab_Status'] = 1;

                                            if ($query['idTab_Status'] == $key) {
                                                echo ''
                                                . '<label class="btn btn-' . $this->basico->tipo_status_cor($key) . ' active" name="radio" id="radio' . $key . '">'
                                                . '<input type="radio" name="idTab_Statust" id="radio" '
                                                    . 'autocomplete="off" value="' . $key . '" checked>' . $row
                                                . '</label>'
                                                ;
                                            } else {
                                                echo ''
                                                . '<label class="btn btn-default" name="radio" id="radio' . $key . '">'
                                                . '<input type="radio" name="idTab_Status" id="radio" class="idTab_Status" '
                                                    . 'autocomplete="off" value="' . $key . '" >' . $row
                                                . '</label>'
                                                ;
                                            }
                                        }
                                        ?>                                    
                                    </div>
                                </div>
                            </div>                           
                        </div>
                    </div>                 

                <?php } ?>                
                
                <div class="form-group">
                    <div class="row">
                        <div class="col-md-12">
                            <label for="Obs">Obs:</label>
                            <textarea class="form-control" id="Obs"
                                      name="Obs"><?php echo $query['Obs']; ?></textarea>
                        </div>
                    </div>
                </div>   

                <br>

                <div class="form-group">
                    <div class="row">
                        <input type="hidden" name="idApp_Consulta" value="<?php echo $query['idApp_Consulta']; ?>">
                        <input type="hidden" name="idApp_Agenda" value="<?php echo $_SESSION['log']['Agenda']; ?>">
                        <input type="hidden" name="idApp_Responsavel" value="<?php echo $query['idApp_Responsavel']; ?>">
                        <?php if ($metodo == 3) { ?>
                            <div class="col-md-12 text-center">                            
                                <button class="btn btn-lg btn-danger" id="inputDb" data-loading-text="Aguarde..." name="submit" value="1" type="submit">
                                    <span class="glyphicon glyphicon-trash"></span> Excluir
                                </button>
                                <button class="btn btn-lg btn-warning" id="inputDb" onClick="history.go(-1);
                                                return true;">
                                    <span class="glyphicon glyphicon-ban-circle"></span> Cancelar
                                </button>
                            </div>                        
                        <?php } else { ?>
                            <div class="col-md-6">                            
                                <button class="btn btn-lg btn-primary" id="inputDb" data-loading-text="Aguarde..." type="submit">
                                    <span class="glyphicon glyphicon-save"></span> Salvar
                                </button>                            
                            </div>
                        <?php } ?>
                    </div>
                </div>                

                </form>

            </div>

        </div>

    </div>

</div>