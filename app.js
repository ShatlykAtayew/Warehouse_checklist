var selected=[];

$('.week').click(function(){
	var t=$(this);
	$('#date'+t.data('week')).toggle();
});
$('.sup').click(function(){
	var t=$(this);
	$('#weekSupOrd-'+t.data('week')+'-'+t.data('cid')).toggle();
});
  
function rowClick(id) {
	// вызывается по клику строки товара и работает в режиме toggle (вкл/выкл)
	// должна изменять массив selected (добавлять или убирать из него)
	let idCheck = selected.includes(id);
	
	if (idCheck == true) {
		selected.pop(id);
		$('div[data-kcbid= ' + id + ']').removeClass("selected");
	} else {
		selected.push(id);
		$('div[data-kcbid= ' + id + ']').addClass("selected");
	}

	//console.log(selected);
	
	updateVisual(id);

}
  
function updateVisual(id) {
	//по массиву selected выставлять классы .selected и halfselected по полностью выбранным и частично выбранным дням и курьерам соответственно. Так же снимать эти же классы если они не соответсвуют.
	let getAttrValue = $('div[data-kcbid= ' + id + ']').parent().children()
													   .map( function(){return $(this).attr('data-kcbid');}).get();
	
	let arrToNumberArr = getAttrValue.map(Number); 

	let arrCheck = (arr, target) => target.every(v => arr.includes(v));

	var y = arrCheck(selected, arrToNumberArr);

	let getSelectedClass = $('div[data-kcbid= ' + id + ']').parent().children().hasClass("selected");
	
	if (y == true) {
		$('div[data-kcbid= ' + id + ']').parent(".rows").prev().removeClass("halfselected");
		$('div[data-kcbid= ' + id + ']').parent(".rows").prev().addClass("selected");
	} else if(getSelectedClass) {
		
		$('div[data-kcbid= ' + id + ']').parent(".rows").prev().removeClass("selected");
		$('div[data-kcbid= ' + id + ']').parent(".rows").prev().addClass("halfselected");
		
	} else {
		$('div[data-kcbid= ' + id + ']').parent(".rows").prev().removeClass("halfselected");
		$('div[data-kcbid= ' + id + ']').parent(".rows").prev().removeClass("selected");
	}

	let getUprowsClass = $('div[data-kcbid= ' + id + ']').parents(".weekSups").find(".uprow").length;
	let getSelectedClass2 = $('div[data-kcbid= ' + id + ']').parents(".weekSups").children(".rows").find(".selected").length;
	

	let z = $('div[data-kcbid= ' + id + ']').parents(".weekSups").children(".sup").length;
	let z2 = $('div[data-kcbid= ' + id + ']').parents(".weekSups").children(".selected").length;
	let z3 = $('div[data-kcbid= ' + id + ']').parents(".weekSups").children(".halfselected").length;


	if (getUprowsClass == getSelectedClass2) {
		$('div[data-kcbid= ' + id + ']').parents(".weekSups").prev().removeClass("halfselected");
		$('div[data-kcbid= ' + id + ']').parents(".weekSups").prev().addClass("selected");
	} else {
		$('div[data-kcbid= ' + id + ']').parents(".weekSups").prev().removeClass("selected");
		$('div[data-kcbid= ' + id + ']').parents(".weekSups").prev().addClass("halfselected");
	} 

	if (z2==0 && z3==0) {
		$('div[data-kcbid= ' + id + ']').parents(".weekSups").prev().removeClass("selected");
		$('div[data-kcbid= ' + id + ']').parents(".weekSups").prev().removeClass("halfselected");
	} 


	//console.log(selected);
	console.log(getUprowsClass);
	console.log( getSelectedClass2);

	//console.log($('div[data-kcbid= ' + id + ']').parents(".sup").classList.add("selected"));	
	
}