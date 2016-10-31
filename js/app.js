// JavaScript Document

var date = new Date();
var d = date.getDate();
var m = date.getMonth() + 1;
var y = date.getFullYear();
var n = date.toISOString();
var tam = n.length - 5;
var agora = n.substring(0, tam);

/*
 var items = [];
 alert('la vai');
 $.getJSON("dt.json", function (data) {
 
 
 $.each(data, function (key, val) {
 items.push(val + '<br>');
 });
 
 
 alert('opa');
 });
 $("#demo").html(items);
 alert('fim');
*/
/*
$.getJSON("rpc/dt.json", function (result) {

    var $teste = $("#teste");
    $teste.empty();

    for (var i = 0; i < result.length; i++) {
        //options += '<option value="' + result[i].ImageFolderID + '">' + result[i].Name + '</option>';
        $teste.append("<option>" + result.value + "</option>");
        alert(result.length);
    }
    
});
 */


/*
 * Fun��o respons�vel por capturar o servi�o/produto selecionado e buscar seu valor
 * correspondente no arquivo Valor_json.php. Ap�s obter o valor ele �
 * aplicado no campo de Valor correspondente.
 * 
 * @param {int} id
 * @param {string} campo
 * @param {string} tabela
 * @returns {decimal}
 */
function buscaValor(id, campo, tabela) {
    
    //sequencia de comandos necess�ria para estrair a pasta raiz do endere�o,
    //ou seja, qual m�dulo est� sendo utilizado (ex: salao, odonto, etc)
    str = window.location.pathname;
    str = str.substring(1);
    pos = str.indexOf('/');
    str = str.substring(0, pos);
       
    $.ajax({
        // url para o arquivo json.php
        url: window.location.origin + "/" + str + "/Valor_json.php?tabela=" + tabela,
        // dataType json
        dataType: "json",
        // fun��o para de sucesso
        success: function (data) {

            // executo este la�o para ecessar os itens do objeto javaScript
            for ($i = 0; $i < data.length; $i++) {
                
                if (data[$i].id == id) {
                    
                    //carrega o valor no campo de acordo com a op��o selecionada
                    $('#'+campo).val(data[$i].valor);
                    
                    //para cada valor carregado o or�amento � calculado/atualizado
                    //atrav�s da chamada de sua fun��o
                    calculaOrcamento();
                    break;
                }                    
                
            }//fim do la�o

        }
    });//termina o ajax
    

}

/*
 * Fun��o respons�vel por calcular o subtotal dos campos de produto
 * 
 * @param {int} quant
 * @param {string} campo
 * @param {int} num
 * @returns {decimal}
 */
function calculaSubtotal(quant, campo, num) {
    
    //vari�vel valor recebe o valor do produto selecionado
    var valor = $("#idTab_Produto"+num).val();
    
    //o subtotal � calculado como o produto da quantidade pelo seu valor
    var subtotal = (quant * valor.replace(",","."));
    subtotal = subtotal.toFixed(2).replace(".",",");
    //o subtotal � escrito no seu campo no formul�rio
    $('#Quantidade'+num).val(subtotal);
    
    //para cada vez que o subtotal for calculado o or�amento tamb�m ser� atualizado
    calculaOrcamento();
    
}

/*
 * Fun��o respons�vel por calcular o or�amento total
 * 
 * @returns {int}
 */
function calculaOrcamento() {
    
    //captura o n�mero incrementador do formul�rio, que controla quantos campos
    //foram acrescidos tanto para servi�os quanto para produtos
    var sc = parseFloat($('#SCount').val().replace(",","."));
    var pc = parseFloat($('#PCount').val().replace(",","."));
    //define o subtotal inicial em 0.00
    var subtotal = 0.00;
        
    //vari�vel incrementadora
    var i = 1;       
    //percorre todos os campos de servi�o, somando seus valores
    while (i <= sc) {
        
        //soma os valores apenas dos campos que existirem, o que forem apagados
        //ou removidos s�o ignorados
        if ($('#idTab_Servico'+i).val())
            subtotal += parseFloat($('#idTab_Servico'+i).val().replace(",","."));
        
        //incrementa a vari�vel i
        i++;
    }
    
    //faz o mesmo que o la�o anterior mas agora para produtos
    var i = 1;    
    while (i <= pc) {
        
        if ($('#Quantidade'+i).val())
            subtotal += parseFloat($('#Quantidade'+i).val().replace(",","."));
        
        i++;
    }    
    
    //calcula o subtotal, configurando para duas casas decimais e trocando o 
    //ponto para o v�rgula como separador de casas decimais
    subtotal = subtotal.toFixed(2).replace(".",",");
    
    //escreve o subtotal no campo do formul�rio
    $('#OrcamentoTotal').val(subtotal);  
}

$("#first-choice").change(function () {

    var $dropdown = $(this);
    var items = [];

    $.getJSON("dt.json", function (data) {

        $.each(data, function (key, val) {
            items.push(val + '<br>');
        });

        $.getJSON("data.json", function (data) {

            var key = $dropdown.val();
            var vals = [];

            if (key == 'beverages')
                vals = data.beverages.split(",");
            else if (key == 'snacks')
                vals = data.snacks.split(",");
            else
                vals = ['Please choose from above'];

            var $secondChoice = $("#second-choice");
            $secondChoice.empty();
            $.each(vals, function (index, value) {
                $secondChoice.append("<option>" + value + "</option>");
            });
            $(".Chosen").trigger("chosen:updated");
        });

        $("#demo").html(items);
        //alert('opa');
    });

});

$(document).ready(function () {

    $(".Date").mask("99/99/9999");
    $(".Time").mask("99:99");
    $(".Cpf").mask("999.999.999-99");
    $(".Cep").mask("99999-999");
    $(".TituloEleitor").mask("9999.9999.9999");
    $(".Valor").mask("#.##0,00", {reverse: true});

    $(".Celular").mask("(99) 9999?9-9999");
    $(".CelularVariavel").on("blur", function () {
        var last = $(this).val().substr($(this).val().indexOf("-") + 1);

        if (last.length == 3) {
            var move = $(this).val().substr($(this).val().indexOf("-") - 1, 1);
            var lastfour = move + last;

            var first = $(this).val().substr(0, 9);

            $(this).val(first + '-' + lastfour);
        }
    });
    
    $("[data-toggle='tooltip']").tooltip();    
       
    $('input:radio[id="radio"]').change(function() {

        var value = $(this).val();

        if (value == 1)
            var btn = "btn btn-warning active";
        else if (value == 2)
            var btn = "btn btn-success active";
        else if (value == 3)
            var btn = "btn btn-primary active";
        else
            var btn = "btn btn-danger active";
        
        $('label[name="radio"]').removeClass();
        $('label[name="radio"]').addClass("btn btn-default");
        $('#radio'+ value).addClass(btn);

    });    

    $('input:radio[id="radiogeral"]').change(function() {
        
        var value = $(this).val();
        var name = $(this).attr("name");
        
        $('label[name="radio_' + name + '"]').removeClass();
        $('label[name="radio_' + name + '"]').addClass("btn btn-default");
        $('#radiogeral'+ value).addClass("btn btn-warning active");

    });     

    var ps = 1; //initlal text box count
    $(".add_field_button").click(function(e){ //on add input button click
        e.preventDefault();
        
        //alert( $("#SCount").val() );      
        ps++; //text box increment
        $("#SCount").val(ps);
        
        //$(".input_fields_wrap").append('<div><input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box 
        $(".input_fields_wrap").append('\
            <div class="form-group" id="1div'+ps+'">\
                <div class="row">\
                    <div class="col-md-4">\
                        <label for="idTab_Servico">Servi�os:</label><br>\
                        <select class="form-control" id="listadinamica'+ps+'" onchange="buscaValor(this.value,this.name,\'Servico\')" name="idTab_Servico'+ps+'">\
                            <option value="">-- Selecione uma op��o --</option>\
                        </select>\
                    </div>\
                    <div class="col-md-3">\
                        <label for="ValorServico">Valor do Servi�o:</label><br>\
                        <div class="input-group" id="txtHint">\
                            <span class="input-group-addon" id="basic-addon1">R$</span>\
                            <input type="text" class="form-control Valor" id="idTab_Servico'+ps+'" maxlength="10" placeholder="0,00" readonly=""\
                                   name="ValorServico'+ps+'" value="">\
                        </div>\
                    </div>\
                    <div class="col-md-3">\
                        <label><br></label><br>\
                        <a href="#" id="'+ps+'" class="remove_field btn btn-danger">\
                            <span class="glyphicon glyphicon-trash"></span>\
                        </a>\
                    </div>\
                </div>\
            </div>'
        ); //add input box
        //$(".input_fields_wrap").append('<select id="listadinamica'+ps+'"></select>'); //add input box
        //$("#listadinamica"+ps).append($("<option></option>").val(1).html("um"));
        //$("#listadinamica"+ps).append($("<option></option>").val(2).html("dois"));

        //get a reference to the select element
        $select = $('#listadinamica'+ps);

        //request the JSON data and parse into the select element
        $.ajax({
            url: window.location.origin+'/salao/getvalues_json.php?q=1',
            dataType: 'JSON',
            type: "GET",
            success: function (data) {
                //clear the current content of the select
                $select.html('');
                //iterate over the data and append a select option
                $select.append('<option value="">-- Selecione uma op��o --</option>');
                $.each(data, function (key, val) {
                    //alert(val.id);
                    $select.append('<option value="' + val.id + '">' + val.name + '</option>');
                })
            },
            error: function () {
                alert('erro');
                //if there is an error append a 'none available' option
                $select.html('<option id="-1">ERRO</option>');
            }

        });

    });

    $(".input_fields_wrap").on("click",".remove_field", function(e){ //user click on remove text
        $("#1div"+$(this).attr("id")).remove();  
        //ap�s remover o campo refaz o c�lculo do or�amento
        calculaOrcamento();        
    })

    //adiciona campos dinamicamente
    var pc = 1; //initlal text box count
    $(".add_field_button2").click(function(e){ //on add input button click
        e.preventDefault();
        
        pc++; //text box increment
        $("#PCount").val(pc);
        
        $(".input_fields_wrap2").append('\
            <div class="form-group" id="2div'+pc+'">\
                <div class="row">\
                    <div class="col-md-4">\
                        <label for="idTab_Produto">Produto:</label><br>\
                        <select class="form-control" id="listadinamicab'+pc+'" onchange="buscaValor(this.value,this.name,\'Produto\')" name="idTab_Produto'+pc+'">\
                            <option value="">-- Selecione uma op��o --</option>\
                        </select>\
                    </div>\
                    <div class="col-md-3">\
                        <label for="ValorProduto">Valor do Produto:</label><br>\
                        <div class="input-group id="txtHint">\
                            <span class="input-group-addon" id="basic-addon1">R$</span>\
                            <input type="text" class="form-control Valor" id="idTab_Produto'+pc+'" maxlength="10" placeholder="0,00" readonly=""\
                                   name="ValorProduto'+pc+'" value="">\
                        </div>\
                    </div>\
                    <div class="col-md-1">\
                        <label for="QuantidadeCompra">Qtd:</label><br>\
                        <div class="input-group">\
                            <input type="text" class="form-control" maxlength="3" placeholder="0" onkeyup="calculaSubtotal(this.value,this.name,'+pc+')"\
                                   name="QuantidadeCompra'+pc+'" value="">\
                        </div>\
                    </div>\
                    <div class="col-md-3">\
                        <label for="Subtotal">Subtotal:</label><br>\
                        <div class="input-group id="txtHint">\
                            <span class="input-group-addon" id="basic-addon1">R$</span>\
                            <input type="text" class="form-control Valor" maxlength="10" placeholder="0,00" readonly="" id="Quantidade'+pc+'"\
                                   name="Subtotal'+pc+'" value="">\
                        </div>\
                    </div>\
                    <div class="col-md-1">\
                        <label><br></label><br>\
                        <a href="#" id="'+pc+'" class="remove_field2 btn btn-danger">\
                            <span class="glyphicon glyphicon-trash"></span>\
                        </a>\
                    </div>\
                </div>\
            </div>'
        ); //add input box


        //get a reference to the select element
        $select = $('#listadinamicab'+pc);

        //request the JSON data and parse into the select element
        $.ajax({
            url: window.location.origin+'/salao/getvalues_json.php?q=2',
            dataType: 'JSON',
            type: "GET",
            success: function (data) {
                //clear the current content of the select
                $select.html('');
                //iterate over the data and append a select option
                $select.append('<option value="">-- Selecione uma op��o --</option>');
                $.each(data, function (key, val) {
                    //alert(val.id);
                    $select.append('<option value="' + val.id + '">' + val.name + '</option>');
                })
            },
            error: function () {
                alert('erro');
                //if there is an error append a 'none available' option
                $select.html('<option id="-1">ERRO</option>');
            }

        });

    });

    //Remove os campos adicionados dinamicamente
    $(".input_fields_wrap2").on("click",".remove_field2", function(e){ //user click on remove text
        $("#2div"+$(this).attr("id")).remove();
        //ap�s remover o campo refaz o c�lculo do or�amento
        calculaOrcamento();
    })

    /*
     * Fun��o para capturar o valor escolhido no campo select (Servi�o e Produto, por exemplo)
     */
    $("#addValues").change(function () {
        //var n = $(this).attr("value");
        //var n = $("option:selected", this);
        
        alert (this.value);
                
        //alert('oi');
    });

    /*
     * As duas fun��es a seguir servem para exibir ou ocultar uma div em fun��o
     * do seu nome
     */
    $("input[id$='hide']").click(function () {
        var n = $(this).attr("name");
        $("#" + n).hide();
    });
    $("input[id$='show']").click(function () {
        var n = $(this).attr("name");
        $("#" + n).show();
    });    
    
    /*
     * Mesma fun��o que a de cima mas com uma modifica��o para funcionar nos 
     * radios buttons
     */
    $("input[id$='radiohide']").click(function () {
        var n = $(this).attr("name");
        $("#" + n).hide();
    });
    $("input[id$='radioshow']").click(function () {
        var n = $(this).attr("name");
        $("#" + n).show();
    });  
    
    /*
     * A fun��o a seguir servem para exibir ou ocultar uma div em fun��o do 
     * valor selecionado no select/pulldown
     */
    $('#SelectShowHide').change(function () {
        $('.colors').hide();
        $('.div' + $(this).val()).show();
    });
    
    $('#SelectShowHideId').change(function () {
        var n = $(this).attr("name");
        //alert(n + $(this).val());
        //$('#' + n).hide();
        $('.' + n).hide();
        $('#' + n + $(this).val()).show();
    });    
    
    $('.Chosen').chosen({
        disable_search_threshold: 10,
        multiple_text: "Selecione uma ou mais op��es",
        single_text: "Selecione uma op��o",
        no_results_text: "Nenhum resultado para",
        width: "100%"
    });
    $("button.fc-today-button").click(function () {
//datepickerinline.today(this);
        $('#datepickerinline').datetimepicker({
            today: '2011-01-01',
        });
        alert(date);
    });
    $('.DatePicker').datetimepicker({
        tooltips: {
            today: 'Hoje',
            clear: 'Limpar sele��o',
            close: 'Fechar este menu',
            selectMonth: 'Selecione um m�s',
            prevMonth: 'M�s anterior',
            nextMonth: 'Pr�ximo m�s',
            selectYear: 'Selecione um ano',
            prevYear: 'Ano anterior',
            nextYear: 'Pr�ximo ano',
            selectDecade: 'Selecione uma d�cada',
            prevDecade: 'D�cada anterior',
            nextDecade: 'Pr�xima d�cada',
            prevCentury: 'Centen�rio anterior',
            nextCentury: 'Pr�ximo centen�rio',
            incrementHour: 'Aumentar hora',
            decrementHour: 'Diminuir hora',
            incrementMinute: 'Aumentar minutos',
            decrementMinute: 'Diminuir minutos',
            incrementSecond: 'Aumentar segundos',
            decrementSecond: 'Diminuir segundos'
        },
        showTodayButton: true,
        showClose: true,
        format: 'DD/MM/YYYY',
        //minDate: moment(m + '/' + d + '/' + y),
        locale: 'pt-br'
    });
    $('.TimePicker').datetimepicker({
        tooltips: {
            today: 'Hoje',
            clear: 'Limpar sele��o',
            close: 'Fechar este menu',
            selectMonth: 'Selecione um m�s',
            prevMonth: 'M�s anterior',
            nextMonth: 'Pr�ximo m�s',
            selectYear: 'Selecione um ano',
            prevYear: 'Ano anterior',
            nextYear: 'Pr�ximo ano',
            selectDecade: 'Selecione uma d�cada',
            prevDecade: 'D�cada anterior',
            nextDecade: 'Pr�xima d�cada',
            prevCentury: 'Centen�rio anterior',
            nextCentury: 'Pr�ximo centen�rio',
            incrementHour: 'Aumentar hora',
            decrementHour: 'Diminuir hora',
            incrementMinute: 'Aumentar minutos',
            decrementMinute: 'Diminuir minutos',
            incrementSecond: 'Aumentar segundos',
            decrementSecond: 'Diminuir segundos',
        },
        showTodayButton: true,
        showClose: true,
        //stepping: 30,
        format: 'HH:mm',
        locale: 'pt-br'
    });
});
$('#datepickerinline').datetimepicker({
    tooltips: {
        today: 'Hoje',
        clear: 'Limpar sele��o',
        close: 'Fechar este menu',
        selectMonth: 'Selecione um m�s',
        prevMonth: 'M�s anterior',
        nextMonth: 'Pr�ximo m�s',
        selectYear: 'Selecione um ano',
        prevYear: 'Ano anterior',
        nextYear: 'Pr�ximo ano',
        selectDecade: 'Selecione uma d�cada',
        prevDecade: 'D�cada anterior',
        nextDecade: 'Pr�xima d�cada',
        prevCentury: 'Centen�rio anterior',
        nextCentury: 'Pr�ximo centen�rio',
        incrementHour: 'Aumentar hora',
        decrementHour: 'Diminuir hora',
        incrementMinute: 'Aumentar minutos',
        decrementMinute: 'Diminuir minutos',
        incrementSecond: 'Aumentar segundos',
        decrementSecond: 'Diminuir segundos'
    },
    inline: true,
    showTodayButton: true,
    //showClear: true,
    format: 'DD/MM/YYYY',
    //defaultDate: '2015-01-01',
    locale: 'pt-br'
});

$("#datepickerinline").on("dp.change", function (e) {
    var d = new Date(e.date);
    $('#calendar').fullCalendar('gotoDate', d);
});
/*
 * veio junto com o �ltimo datetimepicker, n�o parei pra analisar sua relev�ncia
 * vou deixar aqui por enquanto
 * http://eonasdan.github.io/bootstrap-datetimepicker/
 * */

ko.bindingHandlers.dateTimePicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().dateTimePickerOptions || {};
        $(element).datetimepicker(options);
        //when a user changes the date, update the view model
        ko.utils.registerEventHandler(element, "dp.change", function (event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                if (event.date != null && !(event.date instanceof Date)) {
                    value(event.date.toDate());
                } else {
                    value(event.date);
                }
            }
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            var picker = $(element).data("DateTimePicker");
            if (picker) {
                picker.destroy();
            }
        });
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

        var picker = $(element).data("DateTimePicker");
        //when the view model is updated, update the widget
        if (picker) {
            var koDate = ko.utils.unwrapObservable(valueAccessor());
            //in case return from server datetime i am get in this form for example /Date(93989393)/ then fomat this
            koDate = (typeof (koDate) !== 'object') ? new Date(parseFloat(koDate.replace(/[^0-9]/g, ''))) : koDate;
            picker.date(koDate);
        }
    }
};
function EventModel() {
    this.ScheduledDate = ko.observable('');
}
ko.applyBindings(new EventModel());
/*
 $("#inputDate").mask("99/99/9999");
 $("#inputDate0").mask("99/99/9999");
 $("#inputDate1").mask("99/99/9999");
 $("#inputDate2").mask("99/99/9999");
 $("#inputDate3").mask("99/99/9999");
 $("#Cpf").mask("999.999.999-99");
 $("#Cep").mask("99999-999");
 $("#TituloEleitor").mask("9999.9999.9999");
 */

$('#popoverData').popover();
$('#popoverOption').popover({trigger: "hover"});
var tempo = 5 * 60 * 60 * 1000;
//var tempo = 10 * 1000;
//var date = new Date(new Date().valueOf() + 60 * 60 * 1000);
var date = new Date(new Date().valueOf() + tempo);
$('#clock').countdown(date, function (event) {
    $(this).html(event.strftime('%H:%M:%S'));
});
var branco = tempo - 1200000;
$('#countdowndiv').delay(branco).queue(function () {
    $(this).addClass("btn-warning");
});
$('#submit').on('click', function () {
    var $btn = $(this).button('loading')
})

jQuery(document).ready(function ($) {
    $(".clickable-row").click(function () {
        window.document.location = $(this).data("href");
    });
});
setTimeout(function () {
    $('#hidediv').fadeOut('slow');
}, 3000); // <-- time in milliseconds

setTimeout(function () {
    $('#hidediverro').fadeOut('slow');
}, 10000); // <-- time in milliseconds

$(document).ready(function () {
    $(".js-data-example-ajax").select2({
        ajax: {
            url: "https://api.github.com/search/repositories",
            //url: "http://localhost/sisgef/testebd.php",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, page) {
                // parse the results into the format expected by Select2.
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data
                return {
                    results: data.items
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        }, // let our custom formatter work
        minimumInputLength: 1
    });
});
$(document).ready(function () {
    $(".js-example-basic-single").select2();
});
//Determina a raiz do site
var pathArray = window.location.pathname.split('/');
var basePath = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];
$("#series").remoteChained({
    parents: "#mark",
    url: basePath + "/api/teste.php"
});
$("#StatusAntigo").remoteChained({
    parents: "#Especialidade",
    url: basePath + "/api/teste.php",
    loading: "Carregando...",
});
$('#Chosen').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "100%"
});
$('#id_Municipio').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "70%"
});
$('#Uf').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "70%"
});
$('#Municipio').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "70%"
});
$('#EstadoCivil').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "70%"
});
$('#Especialidade').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "100%"
});
$('#Cid').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "100%"
});
$('#Prestador').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "100%"
});
$('#Cirurgia').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "100%"
});
$('#Status').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "100%"
});
$('#Posicao').chosen({
    disable_search_threshold: 10,
    multiple_text: "Selecione uma ou mais op��es",
    single_text: "Selecione uma op��o",
    no_results_text: "Nenhum resultado para",
    width: "100%"
});
$('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    eventSources: [{
            url: 'Consulta_json.php', // use the `url` property
        }],
    //allDayDefault: true,
    defaultView: 'agendaWeek',
    //contentHeight: 700,
    height: 'auto',
    //handleWindowResize: false,
    //aspectRatio: 2,

    minTime: '07:00',
    maxTime: '21:00',
    //minTime: '00:00',
    //maxTime: '24:00',
    nowIndicator: true,
    selectable: true,
    //selectHelper: true,
    editable: false,
    timezone: "local",
    lang: 'pt-br',
    eventAfterRender: function (event, element) {

        if (event.Evento == 1)
            var title = "<b>Evento Agendado</b><br><br><b>Obs:</b> " + event.Obs;
        else {
            
            if (event.Paciente == 'D')
                var title = "<b>" + event.title + "</b><br><b>Respons�vel:</b> " + event.subtitle + "<br>\n\<b>Tipo de Consulta:</b> " + event.TipoConsulta + "<br><b>Procedimento:</b> " + event.Procedimento + "<br><b>Profissional:</b> " + event.Profissional;
            else
                var title = "<b>" + event.title + "</b><br>\n\<b>Tipo de Consulta:</b> " + event.TipoConsulta + "<br><b>Procedimento:</b> " + event.Procedimento + "<br><b>Profissional:</b> " + event.Profissional;
        }
            
        
        $(element).tooltip({
            title: title,
            container: 'body',
            position: {my: "left bottom-3", at: "center top"},
            placement: 'auto top',
            html: true,
            delay: {"show": 500, "hide": 100},
            template: '<div class="tooltip" role="tooltip" ><div class="tooltip-inner" \n\
                    style="color: #000; border-radius: 4px; text-align: left; border-width: thin; border-style: solid; \n\
                    border-color: #000; background-color: #fff; white-space:pre-wrap;"></div></div>'
        });
    },
    /*
    selectConstraint: {
        start: agora,
        end: '2099-12-31T23:59:00'
    },*/
    select: function (start, end, jsEvent, view) {
        //var re = new RegExp(/^.*\//);
        //window.location = re.exec(window.location.href) + 'responsavel/pesquisar?start=' + start + '&end=' + end;

        //alert(start + ' :: ' + end);

        //endtime = $.fullCalendar.formatDate(end, 'HH:mm');
        //starttime = $.fullCalendar.formatDate(start, 'DD/MM/YYYY, HH:mm');
        //var slot = 'start=' + start + '&end=' + end;

        $('#fluxo #start').val(start);
        $('#fluxo #end').val(end);
        //$('#fluxo #slot').text(slot);
        $('#fluxo').modal('show');
    },
});
/*
 * Redireciona o usu�rio de acordo com a op��o escolhida no modal da agenda,
 * que surge ao clicar em algum slot de tempo vazio.
 */
function redirecionar(x) {

    var re = new RegExp(/^.*\//);
    var start = moment($("#start").val());
    var end = moment($("#end").val());
    (x == 1) ? url = 'consulta/cadastrar_evento' : url = 'responsavel/pesquisar';
    window.location = re.exec(window.location.href) + url + '?start=' + start + '&end=' + end
}

/*
 * Fun��o para capturar a url com o objetivo de obter a data, ap�s criar/alterar 
 * uma consulta, e assim usar a fun��o gotoDate do Fullcalendar para mostrar a 
 * agenda na data escolhida
 */
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
var gtd = getUrlParameter('gtd');
(gtd) ? $('#calendar').fullCalendar('gotoDate', gtd) : false;