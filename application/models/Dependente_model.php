<?php

#modelo que verifica usu�rio e senha e loga o usu�rio no sistema, criando as sess�es necess�rias

defined('BASEPATH') OR exit('No direct script access allowed');

class Dependente_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->library('basico');
        $this->load->model(array('Basico_model'));
    }
    
    public function set_dependente($data) {

        $query = $this->db->insert('App_Dependente', $data);

        if ($this->db->affected_rows() === 0) {
            return FALSE;
        } else {
            #return TRUE;
            return $this->db->insert_id();
        }
    }

    public function get_dependente($data) {
        $query = $this->db->query('SELECT * FROM App_Dependente WHERE idApp_Dependente = ' . $data);
        /*
          $query = $this->db->query(
          . 'SELECT '
          . 'P.NomePaciente, '
          . 'P.DataNascimento, '
          . 'P.Telefone, '
          . 'S.Sexo, '
          . 'P.Endereco, '
          . 'P.Bairro, '
          . 'M.NomeMunicipio AS Municipio, '
          . 'M.Uf, '
          . 'P.Obs, '
          . 'P.Email '
          . 'FROM '
          . 'App_Dependente AS P, '
          . 'Tab_Sexo AS S, '
          . 'Tab_Municipio AS M '
          . 'WHERE '
          . 'P.idApp_Dependente = ' . $data . ' AND '
          . 'P.Sexo = S.idTab_Sexo AND '
          . 'P.Municipio = M.idTab_Municipio'
          );
         * 
         */
        $query = $query->result_array();

        return $query[0];
    }

    public function update_dependente($data, $id) {

        unset($data['Id']);
        $query = $this->db->update('App_Dependente', $data, array('idApp_Dependente' => $id));
        /*
          echo $this->db->last_query();
          echo '<br>';
          echo "<pre>";
          print_r($query);
          echo "</pre>";
          exit ();
         */
        if ($this->db->affected_rows() === 0) {
            return FALSE;
        } else {
            return TRUE;
        }
    }

    public function delete_dependente($data) {
        $query = $this->db->delete('App_Dependente', array('idApp_Dependente' => $data));

        if ($this->db->affected_rows() === 0) {
            return FALSE;
        } else {
            return TRUE;
        }
    }

    public function lista_dependente($x) {

        $query = $this->db->query('SELECT * '
                . 'FROM App_Dependente WHERE '
                . 'idApp_Responsavel = ' . $_SESSION['Responsavel']['idApp_Responsavel'] . ' '
                . 'ORDER BY NomeDependente ASC ');
        /*
          echo $this->db->last_query();
          echo "<pre>";
          print_r($query);
          echo "</pre>";
          exit();
         */
        if ($query->num_rows() === 0) {
            return FALSE;
        } else {
            if ($x === FALSE) {
                return TRUE;
            } else {
                foreach ($query->result() as $row) {
                    $row->Idade = $this->basico->calcula_idade($row->DataNascimento);
                    $row->DataNascimento = $this->basico->mascara_data($row->DataNascimento, 'barras');
                    $row->Sexo = $this->Basico_model->get_sexo($row->Sexo);
                }

                return $query;
            }
        }
    }
    
    public function select_status_vida($data = FALSE) {

        if ($data === TRUE) {
            $array = $this->db->query('SELECT * FROM Tab_StatusVida');
        } else {
            $query = $this->db->query('SELECT * FROM Tab_StatusVida');

            $array = array();
            foreach ($query->result() as $row) {
                $array[$row->Abrev] = $row->StatusVida;
            }
        }

        return $array;
    }    

}
