window.onbeforeunload = function(e) {
	e.returnValue = "途中経過は保存されません。よろしいですか？";
}

//時間
var sec = 0;
var min = 0;
const timer = document.getElementsByClassName("timer")[0];
function watch() {
	sec++;
	if (sec == 60) {
		sec = 0;
		min++;
	} else {}
	timer.innerHTML = min+"m "+sec+"s";
}
q_time = setInterval (watch, 1000);

function GethashID (hashIDName){
	if(hashIDName){
		//タブ設定
		$('.tab li').find('a').each(function() { //タブ内のaタグ全てを取得
			var idName = $(this).attr('href'); //タブ内のaタグのリンク名（例）#lunchの値を取得	
			if(idName == hashIDName){ //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
				var parentElm = $(this).parent(); //タブ内のaタグの親要素（li）を取得
				$('.tab li').removeClass("active"); //タブ内のliについているactiveクラスを取り除き
				$(parentElm).addClass("active"); //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
				//表示させるエリア設定
				$(".notes").removeClass("is-active"); //もともとついているis-activeクラスを取り除き
				$(hashIDName).addClass("is-active"); //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加	
			}
		});
	}
}

//タブをクリックしたら
$('.tab a').on('click', function() {
	var idName = $(this).attr('href'); //タブ内のリンク名を取得	
	GethashID (idName);//設定したタブの読み込みと
	return false;//aタグを無効にする
});

$(window).on('load', function () {
    $('.tab li:first-child').addClass("active"); //最初のliにactiveクラスを追加
    $('#hand').addClass("is-active"); //最初の.areaにis-activeクラスを追加
  var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
  GethashID (hashName);//設定したタブの読み込み
});

var mamHandwritten1=new TMamHandwritten("canvas","reset");
    notes_canvas = document.getElementById("canvas"),
    w = $(".canvasContainer").width(),
    h = $(".canvasContainer").height(),
    ctx = canvas.getContext("2d"),
    temp = [];
$('#canvas').attr('width', w);
$('#canvas').attr('height', h);
sessionStorage.setItem("__log", JSON.stringify([]));
draw_pen();

function TMamHandwritten(canvas,reset){
  'use strict';
  this.canvas=canvas;
  this.reset=reset;
  this.isMouseDown=false;
  //マウス、タップの座標
  this.position=[];
  this.position.x=0;
  this.position.y=0;
  this.position.px=0;
  this.position.py=0;
  //横比率,縦比率
  this.rate=[]; this.rate.x=0; this.rate.y=0;
  this.can=null;
  this.ctx=null;
  this.clearButton=null;
  window.addEventListener("DOMContentLoaded",function(){
    this.can=document.getElementById(this.canvas);
    //イベントの設定
    this.can.addEventListener("touchstart",this.onDown.bind(this),{passive: false});
    this.can.addEventListener("touchmove",this.onMove.bind(this),{passive: false});
    this.can.addEventListener("touchend",this.onUp.bind(this));
    this.can.addEventListener("mousedown",this.onMouseDown.bind(this));
    this.can.addEventListener("mousemove",this.onMouseMove.bind(this));
    this.can.addEventListener("mouseup",this.onMouseUp.bind(this));
    window.addEventListener("mousemove",this.stopShake.bind(this));
    this.ctx=this.can.getContext("2d");
    //クリアボタンの設定
    if(document.getElementById(this.reset)){
      this.clearButton=document.getElementById(this.reset);
      this.clearButton.addEventListener("click",function(){
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	var png = notes_canvas.toDataURL();
    var logs = JSON.parse(sessionStorage.getItem("__log"));
    setTimeout(function(){
	logs.unshift({png:png});
	sessionStorage.setItem("__log", JSON.stringify(logs));
	temp = [];
    }, 0);

      }.bind(this));
    }

    let style=document.createElement("style");
    document.head.appendChild(style);
    style.sheet.insertRule('canvas#'+this.canvas+'{-ms-touch-action:none;touch-action:none;}',0);
    let s=window.getComputedStyle(this.can);
    //canvas.widthとcanvas.style.widthの比率を取得する
    this.rate.x=parseInt(this.can.width)/parseInt(w);
    //canvas.heightとcanvas.style.heightの比率を取得する
    this.rate.y=parseInt(this.can.height)/parseInt(h);
  }.bind(this));

  //TouchStart時
  this.onDown=function(event){
    this.isMouseDown=true;
    this.position.px=event.touches[0].pageX-event.target.getBoundingClientRect().left-this.getScrollPosition().x;
    this.position.py=event.touches[0].pageY-event.target.getBoundingClientRect().top -this.getScrollPosition().y;
    this.position.x=this.position.px;
    this.position.y=this.position.py;
    this.drawLine();
    event.preventDefault();
    event.stopPropagation();
  }
  //TouchMove時
  this.onMove=function(event){
    if(this.isMouseDown){
      this.position.x=event.touches[0].pageX-event.target.getBoundingClientRect().left-this.getScrollPosition().x;
      this.position.y=event.touches[0].pageY-event.target.getBoundingClientRect().top -this.getScrollPosition().y;
      this.drawLine();
      this.position.px=this.position.x;
      this.position.py=this.position.y;
      event.stopPropagation();
    };
  }
  //TouchEnd時
  this.onUp=function(event){
    this.isMouseDown=false;
    event.stopPropagation();
    var png = notes_canvas.toDataURL();
    var logs = JSON.parse(sessionStorage.getItem("__log"));
    setTimeout(function(){
	logs.unshift({png:png});
	sessionStorage.setItem("__log", JSON.stringify(logs));
	temp = [];
    }, 0);
  }
  //MouseDown時
  this.onMouseDown=function(event){
    this.position.px=event.clientX-event.target.getBoundingClientRect().left;
    this.position.py=event.clientY-event.target.getBoundingClientRect().top ;
    this.position.x=this.position.px;
    this.position.y=this.position.py;
    this.drawLine();
    this.isMouseDown=true;
    event.stopPropagation();
  }
  //MouseMove時
  this.onMouseMove=function(event){
    if(this.isMouseDown){
      this.position.x=event.clientX-event.target.getBoundingClientRect().left;
      this.position.y=event.clientY-event.target.getBoundingClientRect().top ;
      this.drawLine();
      this.position.px=this.position.x;
      this.position.py=this.position.y;
      event.stopPropagation();
    }
  }
  //MouseUp時
  this.onMouseUp=function(event){
    this.isMouseDown=false;
    event.stopPropagation();
    var png = notes_canvas.toDataURL();
    var logs = JSON.parse(sessionStorage.getItem("__log"));
    setTimeout(function(){
	logs.unshift({png:png});
	sessionStorage.setItem("__log", JSON.stringify(logs));
	temp = [];
    }, 0);
  }
  this.stopShake=function(event){
    this.isMouseDown=false;
    event.stopPropagation();
  }
  this.drawLine = function(){
ctx.beginPath();
	var elem = document.getElementById("pen");
	
	if (window.getComputedStyle(document.getElementById("eraser")).getPropertyValue("border-width") == "0px") {
		ctx.strokeStyle = "#65564d";
		ctx.lineWidth=3;
	} else{
		ctx.strokeStyle = "#f0faf8";
		ctx.lineWidth=6;
	}
    ctx.lineJoin="round";
    ctx.lineCap="round";
    ctx.beginPath();
    ctx.moveTo(this.position.px*this.rate.x,this.position.py*this.rate.y);
    ctx.lineTo(this.position.x*this.rate.x,this.position.y*this.rate.y);
    ctx.stroke();
  }
  //スクロール位置を取得する
  this.getScrollPosition=function(){
    return {
      "x":document.documentElement.scrollLeft || document.body.scrollLeft,
      "y":document.documentElement.scrollTop  || document.body.scrollTop
    };
  }
}

function prevCanvas(){
    var logs = JSON.parse(sessionStorage.getItem("__log"));
 
    if(logs.length > 0)
    {
        temp.unshift(logs.shift());
 
        setTimeout(function(){
            sessionStorage.setItem("__log", JSON.stringify(logs));
            ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
 
            draw(logs[0]['png']);
 
        }, 0);
    }
}
 
function nextCanvas(){
    var logs = JSON.parse(sessionStorage.getItem("__log"));
 
    if(temp.length > 0)
    {
        logs.unshift(temp.shift());
 
        setTimeout(function(){
            sessionStorage.setItem("__log", JSON.stringify(logs));
            ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
 
            draw(logs[0]['png']);
 
        }, 0);
    }
}

function draw_pen(){
	var mode = "pen";
	document.getElementById("eraser").style.border = "none";
	document.getElementById("pen").style.border = "1px solid #65564d";
}

function erase(){
	var mode = "eraser";
	document.getElementById("pen").style.border = "none";
	document.getElementById("eraser").style.border = "1px solid #65564d";
}
 
function draw(src) {
    var img = new Image();
    img.src = src;
 
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
}

//問題1
var x_1 = 0;
var y_1 = 0;
while (x_1 == y_1 || x_1 == 0 || y_1 == 0) {
	var x_1 = Math.floor(Math.random() * 19) -9;
	var y_1 = Math.floor(Math.random() * 19) -9;
}

while (a_1 == b_1) {
	var a_1 = Math.floor(Math.random() * 8) +2;
	var b_1 = (Math.floor(Math.random() * 8) +2) *-1;
}

//問題文の作成1
var q1 = "<span class='literal'>x</span> ="+x_1+", <span class='literal'>y</span> ="+y_1+"　<br>の時、次の式の値を求めなさい。<br>"+a_1+"<span class='literal'>x</span>"+b_1+"<span class='literal'>y</span>";

//問題1の答え
const ans1 = a_1*x_1 + b_1*y_1;

//問題2
var a_2 = 0;
var b_2 = 0;
var c_2 = 0;
var d_2 = 0;

while(Math.abs(a_2) < 2 || d_2 == 0 ) {
	//二数
	var a_2 = Math.floor(Math.random() * 19)-9;
	var d_2 = Math.floor(Math.random() * 19)-9;
}

while(Math.abs(b_2) < 2 || Math.abs(c_2) < 2 || b_2 == c_2) { 
	var b_2 = Math.floor(Math.random() * 19)-9;
	var c_2 = Math.floor(Math.random() * 19)-9;
}

//問題文の作成2
if (c_2 < 0 && d_2 < 0) {
	q2 = a_2+"("+b_2+"<span class='literal'>x</span>"+c_2+"<span class='literal'>y</span>"+d_2+")<br>を計算しなさい";
} else if (c_2 > 0 && d_2 < 0) {
	q2 = a_2+"("+b_2+"<span class='literal'>x</span>+"+c_2+"<span class='literal'>y</span>"+d_2+")<br>を計算しなさい";
} else {
	q2 = a_2+"("+b_2+"<span class='literal'>x</span>+"+c_2+"<span class='literal'>y</span>+"+d_2+")<br>を計算しなさい";
}

//問題2の答え
if ((a_2 * c_2) < 0 && (a_2 * d_2) < 0) {
	ans2 = a_2 * b_2 +"x"+ (a_2*c_2) +"y"+ a_2 * d_2;
} else if ((a_2 * c_2) > 0 && (a_2 * d_2) < 0) {
	ans2 = a_2 * b_2 +"x+"+ a_2 * c_2 +"y"+ a_2 * d_2;
} else if ((a_2 * c_2) < 0 && (a_2 * d_2) > 0) {
	ans2 = a_2 * b_2 +"x"+ a_2 * c_2 +"y+"+ a_2 * d_2;
} else {
	ans2 = a_2 * b_2 +"x+"+ a_2 * c_2 +"y+"+ a_2 * d_2;
}


//問題3
var ans3 = 0;
var y_3 = 0;
while (ans3 == y_3 || Math.abs(ans3) < 2 || y_3 == 0) {
	var ans3 = Math.floor(Math.random() * 11)-5;
	var y_3 = Math.floor(Math.random() * 11)-5;
}

var a_3 = 0;
var b_3 = 0;
var c_3 = 0;

while (a_3 == c_3 || a_3 == d_3 || c_3 == d_3 || Math.abs(b_3) < 2) {
	var a_3 = Math.floor(Math.random() * 3)+2;
	var b_3 = (Math.floor(Math.random() * 5)+2)*-1;
	var c_3 = Math.floor(Math.random() * 3)+2;
	var d_3 = Math.floor(Math.random() * 5)+2;
}

const e_3 = a_3 * ans3 + b_3 * y_3;
const f_3 = c_3 * ans3 + d_3 * y_3;

//問題文の作成3
const q3 = a_3+"<span class='literal'>x</span>"+b_3+"<span class='literal'>y</span>="+e_3+",　<br>"+c_3+"<span class='literal'>x</span>+"+d_3+"<span class='literal'>y</span>="+f_3+"　<br><span class='literal'>x</span>に当てはまる数を答えなさい";

//問題4
var x_4 = 0;
var ans4 = 0;
while (x_4 == ans4 || x_4 == 0 || Math.abs(ans4) < 2) {
	var x_4 = Math.floor(Math.random() * 11)-5;
	var ans4 = Math.floor(Math.random() * 11)-5;
}

var a_4 = 0;
var b_4 = 0;
var c_4 = 0;

while (a_4 == c_4 || a_4 == d_4 || c_4 == d_4 || Math.abs(b_4) < 2) {
	var a_4 = Math.floor(Math.random() * 3)+2;
	var b_4 = (Math.floor(Math.random() * 5)+2)*-1;
	var c_4 = Math.floor(Math.random() * 3)+2;
	var d_4 = Math.floor(Math.random() * 5)+2;
}

const e_4 = a_4 * x_4 + b_4 * ans4;
const f_4 = c_4 * x_4 + d_4 * ans4;

//問題文の作成4
const q4 = a_4+"<span class='literal'>x</span>"+b_4+"<span class='literal'>y</span>="+e_4+"　<br>"+c_4+"<span class='literal'>x</span>+"+d_4+"<span class='literal'>y</span>="+f_4+"　<br><span class='literal'>y</span>に当てはまる数を答えなさい";


//問題5
var x_5 = Math.floor(Math.random() * 19) -9;

while (a_5 == b_5) {
	var a_5 = Math.floor(Math.random() * 19) -9;
	var b_5 = Math.floor(Math.random() * 19) -9;
}

//問題5の答え
var ans5 = a_5 * x_5 + b_5;

//問題文の作成5
if (b_5 < 0) {
	q5 = "<span class='literal'>y</span>="+a_5+"<span class='literal'>x</span>"+b_5+", <br><span class='literal'>x</span>+<span class='literal'>y</span>="+ (x_5+ans5)+"　<br><span class='literal'>y</span>に当てはまる数を答えなさい";
} else {
	q5 = "<span class='literal'>y</span>="+a_5+"<span class='literal'>x</span>+"+b_5+", <br><span class='literal'>x</span>+<span class='literal'>y</span>="+ (x_5+ans5)+"　<br><span class='literal'>y</span>に当てはまる数を答えなさい";
}


//問題6
var a_6 = 0;
var b_6 = 0;
while(Math.abs(a_6) == Math.abs(b_6) || Math.abs(a_6) < 2 || b_6 ==0) {
	//異なる二数
	var a_6 = Math.floor(Math.random() * 21)-10;
	var b_6 = Math.floor(Math.random() * 21)-10;
}

var x_6 = Math.floor(Math.random() * 21)-10;
var y_6 = a_6 * x_6 + b_6;

//問題文の作成6
var q6 = "変化の割合が"+a_6+"で、<br><span class='literal'>x</span>="+x_6+"の時に<span class='literal'>y</span>="+y_6+"<br>である一次関数の式を求めよ";

//問題6の答え
if (b_6 < 0) {
	ans6 = "y="+a_6+"x"+b_6;
} else {
	ans6 = "y="+a_6+"x+"+b_6;
}


//問題7
var a_7 = 0;
var b_7 = 0;
while(Math.abs(a_7) == Math.abs(b_7) || Math.abs(a_7) < 2 || b_7 ==0) {
	//異なる二数
	var a_7 = Math.floor(Math.random() * 11)-5;
	var b_7 = Math.floor(Math.random() * 21)-10;
}

while(x1_7 == x2_7) {
	//異なる二数
	var x1_7 = Math.floor(Math.random() * 21)-10;
	var x2_7 = Math.floor(Math.random() * 21)-10;
}

var y1_7 = a_7 * x1_7 + b_7;
var y2_7 = a_7 * x2_7 + b_7;

//問題文の作成7
var q7 = "2点 A("+x1_7+", "+y1_7+"), B("+x2_7+", "+y2_7+")　<br>を通る直線ABの式を求めよ";

//問題7の答え
if (b_7 < 0) {
	ans7 = "y="+a_7+"x"+b_7;
} else {
	ans7 = "y="+a_7+"x+"+b_7;
}


//問題8
var arr8 = [Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31)];

//配列シャッフル
function mix(array) {
	for(let i = (array.length - 1); 0 < i; i--){
		let r = Math.floor(Math.random() * (i + 1));
		let tmp = array[i];
		array[i] = array[r];
		array[r] = tmp;
	}
	return array;
}


var arr_sort8 = arr8; //配列の複製

arr_sort8.sort(function (a,b) {
	return a-b;
});

var n_8 = arr_sort8[3];
var m_8 = arr_sort8[4];

//問題文の作成8
var q8 = "次のデータの中央値を求めよ　<br>"+mix(arr8);

//問題8の答え
var ans8 = (n_8 + m_8)/2;


//問題9
var arr9 = [Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31)];

var arr_sort9 = arr9; //配列の複製

arr_sort9.sort(function (a,b) {
	return a-b;
});

var ans9 = arr_sort9[1];

//問題文の作成9
var q9 = "次のデータの第1四分位数を求めよ　<br>"+mix(arr9);


//問題10
var arr10 = [Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31)];

var arr_sort10 = arr10; //配列の複製

arr_sort10.sort(function (a,b) {
	return a-b;
});

var a_10 = arr_sort10[1];
var b_10 = arr_sort10[2];
var c_10 = arr_sort10[5];
var d_10 = arr_sort10[6];

//問題文の作成10
var q10 = "次のデータの四分位範囲を求めよ　<br>"+mix(arr10);

//問題10の答え
var ans10 = (c_10+d_10)/2 - (a_10+b_10)/2;


//全問題
const quiz = [
	{
	  question: q1,
	  answer: ans1
	},
	{
	  question: q2,
	  answer: ans2
	},
	{
	  question: q3,
	  answer: ans3
	},
	{
	  question: q4,
	  answer: ans4
	},
	{
	  question: q5,
	  answer: ans5
	},
	{
	  question: q6,
	  answer: ans6
	},
	{
	  question: q7,
	  answer: ans7
	},
	{
	  question: q8,
	  answer: ans8
	},
	{
	  question: q9,
	  answer: ans9
	},
	{
	  question: q10,
	  answer: ans10
	},
];

var right = 0,
    count = 0,
    t_per_q = [],
    ur_ans = [],
    rw = [],
    score_check = 0,
    allotments = [2, 1, 2, 2, 2, 2, 1, 2, 3, 3],
    score = 0;
const quiz_num = quiz.length,
      correct = document.querySelector(".correct"),
      incorrect = document.querySelector(".incorrect"),
      box = document.querySelector(".box"),
      result = document.querySelector(".result");

//問題の表示
document.getElementsByClassName("question")[0].innerHTML = quiz[count].question; //問題の表示
document.getElementsByClassName("response")[0].focus(); //入力欄フォーカス
var start = Date.now(); //開始時間


//次へ
var next = function() {
	ur_ans.push(document.getElementsByClassName("response")[0].value); //あなたの答えの記録
	document.getElementsByClassName("response")[0].value = "";
	draw_pen();
	document.getElementById("note_type").value = "";
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	var finish = Date.now(); //終了時間
	t_per_q.push((finish-start)/100); //一問あたりの時間
	if (ur_ans[count] == quiz[count].answer) { //回答 == 答え
		right++; //正解数++
		rw.push("O");
		count++; //問題番号++
		correct.classList.add ("show"); //マルの表示
		setTimeout (function() {
			correct.classList.remove("show");
		}, 560);
	} else { //回答 !=答え
		rw.push("X");
		count++; //問題番号++
		incorrect.classList.add ("show"); //バツの表示
		setTimeout (function() {
			incorrect.classList.remove("show");
		}, 560);
	}
	if (count < quiz_num) {
		setTimeout (function() {
			document.getElementsByClassName("question")[0].innerHTML = quiz[count].question; //問題の表示
			document.getElementsByClassName("response")[0].focus(); //入力欄フォーカス
			var start = Date.now(); //開始時間
		}, 560);
	} else {
		setTimeout (function() { //問題終了
			const time = min+"m "+sec+"s";
			clearInterval (q_time); //タイマー停止
			box.classList.add ("hide"); //問題全体を隠す

			while (score_check < 10) {
				if (rw[score_check] == "O") {
					var this_score = Math.floor((allotments[score_check] * 1650 - t_per_q[score_check]) * 2);
					if (this_score > 0) {
						score += this_score;
					} else {}
				} else {}
				score_check++;
			}

			var now = new Date(),
			    Year = now.getFullYear(),
			    Month = now.getMonth()+1,
			    Day = now.getDate(),
			    Hour = now.getHours(),
			    Min = now.getMinutes(),
			    ymdhm = Year + "/ " + Month + "/ " + Day + " " + Hour + ":" + Min,
			    this_rec = [2, ymdhm, score];

			if(localStorage.hasOwnProperty("records")) {
				var records = localStorage.getItem("records"),
				    scores = JSON.parse(records),
				    play_rec = JSON.stringify(scores+","+this_rec);
				localStorage.setItem("records", play_rec);
			} else {
				var play_rec = JSON.stringify(this_rec);
				localStorage.setItem("records", play_rec);
			}


			document.getElementsByClassName("total")[0].innerHTML = "<h2>スコア　"+ score +"</h2><br>正解数："+right+"<br>時　間："+time;

			const table = document.getElementsByClassName("qa_list")[0]; //結果表の取得
			var row = 0; //行
			var cell = 1; //列

			while (row < 10) {
				//結果表に値を入れる
				row++;
				table.rows[row].cells[cell].innerHTML = quiz[row -1].question.replace(/<br>/g, ''); //改行なし問題文
				cell++;
				table.rows[row].cells[cell].innerHTML = quiz[row -1].answer; //正当
				cell++;
				table.rows[row].cells[cell].innerHTML = ur_ans[row -1]; //あなたの答え
				cell++;
				table.rows[row].cells[cell].innerHTML = rw[row -1]; //正否
				var cell = 1;
			}

			result.classList.add ("open"); //結果を表示


		}, 560);
	};
};

//ボタンを押すと次へ
var next_q = document.getElementById("next_q");
next_q.addEventListener("click", next);

//エンターキーで次へ
var response = document.getElementsByClassName("response")[0];
response.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		next();
	}
});
