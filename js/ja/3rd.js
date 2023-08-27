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
var a_1 = 0;
var b_1 = 0;
while (a_1 == b_1) {
	var a_1 = Math.floor(Math.random() * 8)+2;
	var b_1 = Math.floor(Math.random() * 8)+2;
}

//問題文の作成1
var q1 = "次の式を因数分解しなさい。<br>"+ (a_1 ** 2) +"<span class='literal'>x<sup>2</sup></span>-"+ (b_1 ** 2);

//問題1の答え
var ans1_1 = "("+a_1+"x+"+b_1+")("+a_1+"x-"+b_1+")"; //(a+b)(a-b)
var ans1_2 = "("+a_1+"x-"+b_1+")("+a_1+"x+"+b_1+")"; //(a-b)(a+b)


//問題2
var a_2 = 0;
var b_2 = 0;

while(Math.abs(a_2)>= Math.abs(b_2) || Math.abs(a_2) < 2 || Math.abs(b_2) < 2) {
	var a_2= Math.floor(Math.random() * 21)-10;
	var b_2 = Math.floor(Math.random() * 21)-10;
}

var c_2 = a_2 + b_2;
if (c_2 == 1) {
	c_2 = "+"; //xの係数が1
} else if (c_2 == -1) {
	c_2 = "-"; //xの係数が-1
} else if (c_2 > 0) {
	c_2 = "+"+c_2; //xの係数が正
} else {}

//問題文の作成2
if (a_2 * b_2 < 0) {
	var q2 = "次の式を因数分解しなさい。<br><span class='literal'>x<sup>2</sup></span>"+c_2+"<span class='literal'>x</span>"+ (a_2 * b_2); //定数項が負
} else {
	var q2 = "次の式を因数分解しなさい。<br><span class='literal'>x<sup>2</sup></span>"+c_2+"<span class='literal'>x</span>+"+ (a_2 * b_2); //定数項が正
}

//問題2の答え
if (a_2 < 0 && b_2 < 0) {
	//a, b = -, -
	ans2_1 = "(x"+a_2+")(x"+b_2+")";
	ans2_2 = "(x"+b_2+")(x"+a_2+")"; //aとbが逆
} else if (a_2 > 0 && b_2 < 0) {
	//a, b = +, -
	ans2_1 = "(x+"+a_2+")(x"+b_2+")";
	ans2_2 = "(x"+b_2+")(x+"+a_2+")"; //aとbが逆
} else if (a_2 < 0 && b_2 > 0) {
	//a, b = -, +
	ans2_1 = "(x"+a_2+")(x+"+b_2+")";
	ans2_2 = "(x+"+b_2+")(x"+a_2+")"; //aとbが逆
} else {
	//a, b = +, +
	ans2_1 = "(x+"+a_2+")(x+"+b_2+")";
	ans2_2 = "(x+"+b_2+")(x+"+a_2+")"; //aとbが逆
}


//問題3

var a_3 = Math.floor(Math.random() * 1)+2; //因数分解後のxの係数1
var b_3 = Math.floor(Math.random() * 1)+3; //因数分解後のxの係数2

var c_3 = 0;
var d_3 = 0;

while(Math.abs(c_3)== Math.abs(d_3) || Math.abs(c_3) < 2 || Math.abs(d_3) < 2 || (a_3 * d_3) + (b_3 * c_3) == 0 || Number.isInteger(c_3 / a_3) || Number.isInteger(d_3 / 2) || Number.isInteger(d_3 / 3)) {
	var c_3= Math.floor(Math.random() * 21)-10;
	var d_3 = Math.floor(Math.random() * 21)-10;
}

var sign_3 = (a_3 * d_3) + (b_3 * c_3);
if (sign_3 == 1) {
	sign_3 = "+"; //xの係数が1
} else if (sign_3 == -1) {
	sign_3 = "-"; //xの係数が-1
} else if (sign_3 > 0) {
	sign_3 = "+"+sign_3; //xの係数が正
} else {}

//問題文の作成3
if (c_3 * d_3 < 0) {
	var q3 = "次の式を因数分解しなさい。<br>"+ (a_3 * b_3) +"<span class='literal'>x<sup>2</sup></span>"+sign_3+"<span class='literal'>x</span>"+ (c_3 * d_3); //定数項が負
} else {
	var q3 = "次の式を因数分解しなさい。<br>"+ (a_3 * b_3) +"<span class='literal'>x<sup>2</sup></span>"+sign_3+"<span class='literal'>x</span>+"+ (c_3 * d_3); //定数項が正
}

//問題3の答え
if (c_3 < 0 && d_3 < 0) {
	//a, b = -, -
	ans3_1 = "("+a_3+"x"+c_3+")("+b_3+"x"+d_3+")";
	ans3_2 = "("+b_3+"x"+d_3+")("+a_3+"x"+c_3+")"; //bとdが逆
} else if (c_3 > 0 && d_3 < 0) {
	//a, b = +, -
	ans3_1 = "("+a_3+"x+"+c_3+")("+b_3+"x"+d_3+")";
	ans3_2 = "("+b_3+"x"+d_3+")("+a_3+"x+"+c_3+")"; //bとdが逆
} else if (c_3 < 0 && d_3 > 0) {
	//a, b = -, +
	ans3_1 = "("+a_3+"x"+c_3+")("+b_3+"x+"+d_3+")";
	ans3_2 = "("+b_3+"x+"+d_3+")("+a_3+"x"+c_3+")"; //bとdが逆
} else {
	//a, b = +, +
	ans3_1 = "("+a_3+"x+"+c_3+")("+b_3+"x+"+d_3+")";
	ans3_2 = "("+b_3+"x+"+d_3+")("+a_3+"x+"+c_3+")"; //bとdが逆
}


//問題4
var a_4 = Math.floor(Math.random() * 6) +11;

//問題文の作成4
var q4 = a_4**2/100 +"の平方根は、<span class='literal'>&plusmn; x</span>である。<br><span class='literal'>x</span>に当てはまる正の数を書きなさい";

//問題4の答え
var ans4_1 = a_4/10;
if (Number.isInteger(a_4 / 2)) {
	ans4_2 = a_4 / 2 + "/5";
} else if (Number.isInteger(a_4 / 5)) {
	ans4_2 = a_4 / 5 + "/2";
} else {
	ans4_2 = a_4 + "/10";
}


//問題5
var arr_5 = [2, 3, 5, 6, 7, 10];
var a_5 = arr_5[Math.floor(Math.random() * 6)]; //ルートの中身

var b_5 = Math.floor(Math.random() * 2) +2; //ルートの係数

var c_5 = Math.round(b_5 * Math.sqrt(a_5));

var sign5 = Math.random() * 2; //符号決め
if (sign5 < 1) {
	//正
} else {
	//負
	b_5 *= -1;
	c_5 *= -1;
}

//問題文の作成5
var q5 = "A="+b_5+"&radic;"+a_5+", B="+c_5+"　の時、<br>大きいのはAとBのどちらか";

//問題5の答え
if ((b_5 * Math.sqrt(a_5)) < c_5) {
	ans5 = "B";
} else {
	ans5 = "A";
}


//問題6
var a_6 = Math.floor(Math.random() * 5) +1;
var b_6 = arr_5[Math.floor(Math.random() * 6)]; //ルートの中身

//問題文の作成6
var q6 = "<span class='literal'>x=</span>"+a_6+"+&radic;"+b_6+", <span class='literal'>y=</span>"+a_6+"-&radic;"+b_6+"　<br>の時、<span class='literal'>x<sup>2</sup>+y<sup>2</sup></span>の値を求めなさい。"

//問題6の答え
var ans6 = (a_6*2) **2 + (-2)*(a_6**2 - b_6);


//問題7
var a_7 = 0;
var b_7 = 0;

while(Math.abs(a_7) == Math.abs(b_7) || Math.abs(a_7) < 2 || Math.abs(b_7) < 2) {
	var a_7= Math.floor(Math.random() * 21)-10;
	var b_7 = Math.floor(Math.random() * 21)-10;
}

//問題文の作成7
if (a_7 * b_7 < 0) {
	q7 = "<span class='literal'>x</span>の2次方程式　<br><span class='literal'>x<sup>2</sup>+ax</span>" + a_7 *　b_7 + "=0　<br>の解の1つが"+a_7+"であるとき、<br><span class='literal'>a</span>を求めなさい。";
} else {
	q7 = "<span class='literal'>x</span>の2次方程式　<br><span class='literal'>x<sup>2</sup>+ax</span>+" + a_7 *　b_7 + "=0　<br>の解の1つが"+a_7+"であるとき、<br><span class='literal'>a</span>を求めなさい。";
}

//問題7の答え
var ans7 = a_7+b_7;


//問題8
var a_8 = (Math.floor(Math.random () * 10) +3) *-1;
var b_8 = a_8 * -1 -2;
var c_8 = Math.floor(Math.random () * 20) +1;

var type_8 = Math.floor(Math.random () * 2);

//問題文の作成8
if (type_8 < 1) {
	//加法
	q8 = "ある正の数を2乗して"+c_8+"をたすところを、<br>2倍して"+c_8+"をたしたため、<br>正しい答えより"+ (a_8 * b_8 * -1)+"だけ小さくなった。<br>この正の数を求めよ";
} else {
	//減法
	q8 = "ある正の数を2乗して"+c_8+"をひくところを、<br>2倍して"+c_8+"をひいたため、<br>正しい答えより"+ (a_8 * b_8 * -1)+"だけ小さくなった。<br>この正の数を求めよ";
}

//問題8の答え
var ans8 = a_8 * -1;


//問題9
var ans9 = 0;
while (Math.abs(ans9) < 2) {
	//絶対値2以上4以下の整数
	var ans9 = Math.floor(Math.random() * 9) -4;
}

var sign9 = Math.random () * 2; //正負決め
if (sign9 > 0) {
	sign9 = 1;
} else {
	sign9 = -1;
}
var x1_9 = 0;
var x2_9 = 0;
while (x1_9 >= x2_9) {
	var x1_9 = (Math.floor(Math.random() * 5)+2) * sign9;
	var x2_9 = (Math.floor(Math.random() * 5)+2) * sign9;
}

//問題文の作成9
var q9 = "関数<span class='literal'>y=ax<sup>2</sup></span> について、<br><span class='literal'>x</span>の値が "+ x1_9 + "から " + x2_9 + "まで増加するときの変化の割合が" + ans9 * (x2_9 ** 2 - x1_9 ** 2) + "だった。<br>このとき、<span class='literal'>a</span>の値を求めよ";


//問題10
var a_10 = 0;
while (Math.abs(a_10) <= 1) {
	var a_10 = Math.floor(Math.random() * 13 -6) / 2;
}

var b_10 = 0;
var c_10 = 0;
while (Math.abs(b_10) == Math.abs(c_10) || Math.abs(b_10) < 2 || Math.abs(c_10) < 2) {
	var b_10 = Math.floor(Math.random() * 13 -6);
	var c_10 = Math.floor(Math.random() * 13 -6);
}

//問題文の作成10
var q10 = "<span class='literal'>y</span>は<span class='literal'>x</span>の2乗に比例し、<br><span class='literal'>x</span>="+ b_10 +"のとき　<span class='literal'>y</span>="+ a_10 * b_10 ** 2 +"である。<br><span class='literal'>x</span>="+ c_10 +"のときの<span class='literal'>y</span>の値を求めよ";

//問題10の答え
var ans10 = a_10 * c_10 ** 2;


//全問題
const quiz = [
	{
	  question: q1,
	  answer: ans1_1,
	  answer2: ans1_2
	},
	{
	  question: q2,
	  answer: ans2_1,
	  answer2: ans2_2
	},
	{
	  question: q3,
	  answer: ans3_1,
	  answer2: ans3_2
	},
	{
	  question: q4,
	  answer: ans4_1,
	  answer2: ans4_2
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
	  answer: b_7
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
    allotments = [2, 3, 4, 2, 2, 5, 3, 4, 3, 3],
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
	t_per_q.push(Math.floor((finish-start)/100)); //一問あたりの時間
	if (ur_ans[count] == quiz[count].answer || ur_ans[count] === quiz[count].answer2) { //回答 == 答え
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
					var this_score = Math.floor((allotments[score_check] * 1650 - t_per_q[score_check]) * 4);
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
			    this_rec = [3, ymdhm, score];

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
