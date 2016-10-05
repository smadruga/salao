<?php
#modelo que verifica usu�rio e senha e loga o usu�rio no sistema, criando as sess�es necess�rias

defined('BASEPATH') OR exit('No direct script access allowed');

class Script_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->library('basico');
    }

    public function describe_table($data)
    {
        return $this->db->query('DESCRIBE ' . $data);
    }

    public function get_estadocivil($slug = FALSE)
    {

        if ($slug)
        {


            $query = $this->db->query('SELECT Id FROM ci.Tabela_EstadoCivil WHERE EstadoCivil LIKE "%' . substr($slug, 0, -1) . '%"');

            if ($query->num_rows() !== 1)
            {   
                #caso n�o seja poss�vel identificar o estado civil retorna o valor 8 = N�o Informado
                return 8;
                #return 'CIV###';
            }
            else
            {
                $query = $query->result_array();
                /*
                  print "<pre>";
                  print_r($query[0]['Id']);
                  print "</pre>";
                  exit();
                 */
                return $query[0]['Id'];
            }
        }
        else
        {
            #caso n�o seja poss�vel identificar o estado civil ou ele esteja em branco retorna o valor 8 = N�o Informado
            return 8;
            #return 'CIV###';
        }
    }

    public function get_municipio($slug = FALSE, $uf = FALSE)
    {
        if ($slug && $uf)
        {
            $query = $this->db->query('SELECT * FROM ci.Tabela_Municipio WHERE NomeMunicipio LIKE "%' . $slug . '%" AND Uf = "' . $uf . '"');

            if ($query->num_rows() !== 1)
            {
                #caso n�o seja poss�vel identificar o munic�pio ou ele esteja em branco retorna o valor 330330 = Niter�i - RJ
                return 330330;
                #return 'MUN###';
            }
            else
            {
                $query = $query->result_array();
                /*
                  print "<pre>";
                  print_r($query[0]['Id']);
                  print "</pre>";
                  exit();
                 */
                return $query[0]['idTabela_Municipio'];
            }
        }
        else
        {
            #caso n�o seja poss�vel identificar o munic�pio ou ele esteja em branco retorna o valor 330330 = Niter�i - RJ
            return 330330;
            #return 'MUN###';
        }
    }

}
