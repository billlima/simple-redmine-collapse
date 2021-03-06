// 02/06/2016
// Marco A. de Lima
// marco.lima18@gmail.com
// simple-redmine-collapse-v1

var btnCounter = 0;

$('#projects-index').before(
	'<p><button type="button" id="btnAbrirTodos" style="height: 24px;margin-left: 10px;padding: 0 10px;font-size: 14px; line-height: 0;">Abrir Todos <b>+</b></button> '+
	'<button type="button" id="btnFecharTodos" style="height: 24px;margin-left: 10px;padding: 0 10px;font-size: 14px; line-height: 0;">Fechar Todos <b>-</b></button></p>');

function getBtn() {
	btnCounter++;
	return '<button type="button" state="close" style="height: 24px;margin-left: 10px;padding: 0 10px;font-size: 14px; line-height: 0;" class="all-collapse collapse-'+btnCounter+'">-</button>';
}

$('ul.root').find('li.root').each(function() {	
	$( this ).find('a.root').after(getBtn());		
	$( this ).children('ul.projects').each(function() {				
		recursiveFunction1( this );
	});
});

function recursiveFunction1(elem) {
	$( elem ).hide();
	$( elem ).children('li.child').each(function() {
		if ($( this ).children('ul.projects').length == 1) {
			$( this ).children('div').children('a').after(getBtn());			
			$( this ).children('ul.projects').hide();
			recursiveFunction1($( this ).children('ul.projects'));
		} 	
	});
}

$('.all-collapse').click(function() {
	if ($( this ).attr('state') == 'close') {
		$( this ).attr('state', 'open');
		$( this ).html('+');		
		$( this ).parent().parent().children('ul.projects').show();		
	} else {
		$( this ).attr('state', 'close');
		$( this ).html('-');		
		$( this ).parent().parent().children('ul.projects').hide();				
	}
});

$('#btnAbrirTodos').click(function() {
	$('.all-collapse').attr('state', 'open');
	$('.all-collapse').html('+');		
	$('.all-collapse').parent().parent().children('ul.projects').show();		
});

$('#btnFecharTodos').click(function() {
	$('.all-collapse').attr('state', 'close');
	$('.all-collapse').html('-');		
	$('.all-collapse').parent().parent().children('ul.projects').hide();			
});