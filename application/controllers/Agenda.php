<?php

#controlador de Login

defined('BASEPATH') OR exit('No direct script access allowed');

class Agenda extends CI_Controller {

    public function __construct() {
        parent::__construct();

        #load libraries
        $this->load->helper(array('form', 'url', 'date', 'string'));
        #$this->load->library(array('basico', 'Basico_model', 'form_validation'));
        $this->load->library(array('basico', 'form_validation'));
        $this->load->model(array('Basico_model', 'Agenda_model'));
        $this->load->driver('session');

        #load header view
        $this->load->view('basico/header');
        $this->load->view('basico/nav_principal');
        
        unset($_SESSION['agenda']);

    }

    public function index() {

        if ($this->input->get('m') == 1)
            $data['msg'] = $this->basico->msg('<strong>Informa��es salvas com sucesso</strong>', 'sucesso', TRUE, TRUE, TRUE);
        elseif ($this->input->get('m') == 2)
            $data['msg'] = $this->basico->msg('<strong>Erro no Banco de dados. Entre em contato com o administrador deste sistema.</strong>', 'erro', TRUE, TRUE, TRUE);
        else
            $data['msg'] = '';

        $data['query']['estatisticas'] = $this->Agenda_model->resumo_estatisticas($_SESSION['log']['id']);
        $data['query']['responsavel_aniversariantes'] = $this->Agenda_model->responsavel_aniversariantes($_SESSION['log']['id']);
        $data['query']['dependente_aniversariantes'] = $this->Agenda_model->dependente_aniversariantes($_SESSION['log']['id']);
        $this->load->view('agenda/tela_agenda', $data);

        #load footer view
        $this->load->view('basico/footer');
    }

}
