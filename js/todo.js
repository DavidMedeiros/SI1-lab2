$(document).ready(function(){

	var quantidadeDeAtividades = 0;
	var quantidadeDeAtividadesPendentes = 0; 

	addAtividadeALista("Estudar para lógica");
	addAtividadeALista("Estudar probabilidade");
	addAtividadeALista("Comprar Joanne on itunes");
	
	$('#addItem').on('click', addItem);

	$('#lista_atividades').on('change', '.completeItem', completeItem);
	$('#lista_atividades').on('click', '.deleteItem', deleteItem);
	$('#lista_atividades').on('click', '.textoAtividade', startEditing);
	$('#lista_atividades').on('click', '.saveItem', stopEditing);
	
	$('#aumentar_font').on('click', aumentarFonte);
	$('#diminuir_font').on('click', diminuirFonte);
	$('#alterar_fundo').on('click', alterarFundo);
	$('#restaurar_configuracoes').on('click', restaurarConfiguracoes);
	

	$('#novaAtividade').on('keypress', function(event) {
		if(event.which === 13) {
			addItem();
			event.preventDefault();
		}

	}); 

	function startEditing(event) {
		var taskLi = $(this).parent();
		var currentText = taskLi.find('.textoAtividade').text();
		taskLi.find('.editText').val(currentText);
		taskLi.find('.editText').show();
		taskLi.find('.saveItem').show();
		taskLi.find('.textoAtividade').hide();
	}

	function stopEditing(event) {
		$(this).hide();
		var taskLi = $(this).parent();
		var newValue = taskLi.find('.editText').val();
		taskLi.find('.editText').hide();
		taskLi.find('.textoAtividade').text(newValue);
		taskLi.find('.textoAtividade').show();
	}

	function addItem(event) {
		var novaAtividade = $('#novaAtividade').val();
		addAtividadeALista(novaAtividade);
		$('#novaAtividade').val("");

	}

	function deleteItem(event){
		$(this).parent().remove();
		quantidadeDeAtividades--;

		qntCheckboxSelecionados = contaCheckboxsSelecionados();

  		quantidadeDeAtividadesPendentes = quantidadeDeAtividades - qntCheckboxSelecionados;
		atualizarQuantidadeDeAtividades();
		
	}

	function completeItem(event){
		$(this).parent().toggleClass('done');

  		qntCheckboxSelecionados = contaCheckboxsSelecionados();

  		quantidadeDeAtividadesPendentes = quantidadeDeAtividades - qntCheckboxSelecionados;
		atualizarQuantidadeDeAtividades();
  	}

  	function contaCheckboxsSelecionados(selecionados){
	  	var inputs, i, selecionados=0;
	  	inputs = document.getElementsByTagName('input');

	  	for(i = 0; i < inputs.length; i++){
	   		if(inputs[i].type=='checkbox'){
		     	if(inputs[i].checked==true && inputs[i].id == 'check'){
		       		selecionados++;
	      		}
	    	}
	  	}

	  	return selecionados;
	}

	function addAtividadeALista(atividade) {
		var checkboxId = quantidadeDeAtividades;
		$('#lista_atividades').append('<li><input class="completeItem" id = "check" type = "checkbox"><span class = "textoAtividade">' 
										+ atividade
										+ '</span> <input type = "text" class = "editText"><button class = "btn btn-success saveItem">Ok</button><span class ="glyphicon glyphicon-trash deleteItem"></span> </li>');
		quantidadeDeAtividades++;
		quantidadeDeAtividadesPendentes++;
		atualizarQuantidadeDeAtividades();
	}

	function atualizarQuantidadeDeAtividades(){
		atualizarQuantidadeAtvCadastradas();
		atualizarQuantidadeAtvPendentes();
	}

	function atualizarQuantidadeAtvCadastradas(){
		$('#num_cadastradas').text(quantidadeDeAtividades);
	}

	function atualizarQuantidadeAtvPendentes() {
		$('#num_pendentes').text(quantidadeDeAtividadesPendentes);
		var progressBar = $(".progress-bar");
		var percentagem = 100;
		progressBar.width( percentagem - ((quantidadeDeAtividadesPendentes / quantidadeDeAtividades)  * percentagem) + '%');
	}

	function aumentarFonte(){
        $('#lista_atividades').css({"font-size":"18px"});
	}

	function diminuirFonte(){
        $('#lista_atividades').css({"font-size":"14px"});
	}

	function alterarFundo(){
		$('body').css("background-color","#cfd8dc");	
	}

	function restaurarConfiguracoes(){
		$('#lista_atividades').css({"font-size":"14px"});
		$('body').css("background-color", "#ffffff");	
	}
});
