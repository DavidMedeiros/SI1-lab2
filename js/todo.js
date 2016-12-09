$(document).ready(function(){
	var quantidadeDeAtividades = 0;
	var quantidadeDeAtividadesPendentes = 0; 

	// Adiciona atividades predefinidas à agenda de tarefas
	addAtividadeALista("Estudar para lógica");
	addAtividadeALista("Estudar probabilidade");
	addAtividadeALista("Comprar Joanne on itunes");
	
	// adiciona um novo item à agenda de tarefas
	$('#addItem').on('click', addItem);

	// faz a contagem de checkbox marcados e mostra no html
	$('#lista_atividades').on('change', '.completeItem', completeItem);

	// deleta item da agenda de tarefas
	$('#lista_atividades').on('click', '.deleteItem', deleteItem);

	// edita uma atividade já está na agenda de tarefas
	$('#lista_atividades').on('click', '.textoAtividade', startEditing);

	// finaliza a edição da atividade já cadastrada na agenda de tarefas
	$('#lista_atividades').on('click', '.saveItem', stopEditing);
	
	// aumenta o tamanho das fontes das atividades cadastradas na agenda de tarefas
	$('#aumentar_font').on('click', aumentaFonte);

	// diminui o tamanho das fontes das atividades cadastradas na agenda de tarefas
	$('#diminuir_font').on('click', diminuiFonte);

	// altera o plano de fundo da página
	$('#alterar_fundo').on('click', alteraFundo);

	// restaura as configuraçõe iniciais 
	$('#restaurar_configuracoes').on('click', restauraConfiguracoes);
	
	// adiciona um novo item à agenda de tarefas pressionando o enter
	$('#nova_atividade').on('keypress', function(event) {
		if(event.which === 13) {
			addItem();
			event.preventDefault();
		}

	}); 

	function addItem(event) {
		var nova_atividade = $('#nova_atividade').val();
		addAtividadeALista(nova_atividade);
		$('#nova_atividade').val("");
	}

	function addAtividadeALista(atividade) {
		$('#lista_atividades').append('<li><input class="completeItem" id = "check" type = "checkbox"><span class = "textoAtividade">' 
										+ atividade
										+ '</span> <input type = "text" class = "editText"><button class = "btn btn-success saveItem">Ok</button><span class ="glyphicon glyphicon-trash deleteItem"></span> </li>');
		quantidadeDeAtividades++;
		quantidadeDeAtividadesPendentes++;
		atualizarQuantidadeDeAtividades();
	}

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

	function aumentaFonte(){
        $('#lista_atividades').css({"font-size":"18px"});
	}

	function diminuiFonte(){
        $('#lista_atividades').css({"font-size":"14px"});
	}

	function alteraFundo(){
		$('body').css("background-color","#cfd8dc");	
	}

	function restauraConfiguracoes(){
		$('#lista_atividades').css({"font-size":"14px"});
		$('body').css("background-color", "#ffffff");	
	}
});