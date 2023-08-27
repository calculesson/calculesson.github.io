window.onbeforeunload = function(e) {
	e.returnValue = "Your score will not be saved. Will you discard it?";
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
while(Math.abs(a_1) < 2) {
	//絶対値2以上20以下の数 (a!=0)
	var a_1 = Math.floor(Math.random() * 41)-20;
}

const type_1 = Math.random() * 4; //問題の種類決め

//問題文の作成1
if (type_1 < 1) {
	q1 = "&quot;Go east for "+a_1+" meters&quot;<br> is the same as <br>&quot;Go west for <span class='literal'>x</span> meters.&quot;<br>What number fits<span class='literal'> x</span>?";
} else if (type_1 < 2) {
	q1 = "&quot;"+a_1+" minutes ago from now&quot;<br> is the same as <br>&quot;<span class='literal'>x</span> minutes from now.&quot;<br>What number fits<span class='literal'> x</span>?";
} else if (type_1 < 3) {
	q1 = "&quot;A profit of "+a_1+" dollars&quot;<br> is the same as <br>&quot;a loss of <span class='literal'>x</span> dollars.&quot;<br>What number fits<span class='literal'> x</span>?";
} else {
	q1 = "&quot;"+a_1+" points higher than the average&quot;<br> is the same as <br>&quot;<span class='literal'>x</span> points lower than the average.&quot;<br>What number fits<span class='literal'> x</span>?";
}

//問題1の答え
const ans1 = a_1*-1;

//問題2
while(a_2 == b_2) {
	//異なる二数
	var a_2 = (Math.floor(Math.random() * 10)+1)*-1;
	var b_2 = (Math.floor(Math.random() * 10)+1)*-1;
}

//問題文の作成2
const q2 = "Which is greater,<br>"+a_2+" or "+b_2+"?";

//問題2の答え
if (a_2 < b_2) {
	ans2 = b_2;
} else {
	ans2 = a_2;
}


//問題3
var a_3 = 0;
var b_3 = 0;
while(Math.abs(a_3) == Math.abs(b_3) || b_3 == 0) {
	//異なる二数
	var a_3 = (Math.floor(Math.random() * 10)+1)*-1;
	var b_3 = Math.floor(Math.random() * 21)-10;
}

//問題文の作成3
var c_3 = Math.random() * 3;
if (c_3 < 1) {
	c_3 = "+"; //加法
	if (b_3 > 0) {
		q3 = a_3+c_3+b_3+"=?"; //a+b=?
	} else {
		q3 = a_3+c_3+"("+b_3+")=?"; //a+(-B)=?
	}
} else if (c_3 < 2) {
	c_3 = "-"; //減法
	if (b_3 > 0) {
		q3 = a_3+c_3+b_3+"=?"; //a-b=?
	} else {
		q3 = a_3+c_3+"("+b_3+")=?"; //a-(-B)=?
	}
} else {
	c_3 = "×"; //乗法
	if (b_3 > 0) {
		q3 = a_3+c_3+b_3+"=?"; //a*b=?
	} else {
		q3 = a_3+c_3+"("+b_3+")=?"; //a*(-B)=?
	}
}

//問題3の答え
if (c_3 == "+") {
	ans3 = a_3+b_3;
} else if (c_3 == "-") {
	ans3 = a_3-b_3;
} else {
	ans3 = a_3*b_3;
}


//問題4
var a_4 = 0;
var b_4 = 0;
while(Math.abs(a_4) == Math.abs(b_4) || a_4 == 0 || b_4 == 0 || a_4 == a_3) {
	//異なる二数
	var a_4 = Math.floor(Math.random() * 21)-10;
	var b_4 = Math.floor(Math.random() * 21)-10;
}

//問題文の作成4
var c_4 = Math.random() * 3;
if (c_4 < 1) {
	c_4 = "+"; //加法
	if (b_4 > 0) {
		q4 = "What is the absolute value of ("+a_4+c_4+b_4+") ?"; //a+b=?
	} else {
		q4 = "What is the absolute value of {"+a_4+c_4+"("+b_4+")} ?"; //a+(-B)=?
	}
} else if (c_4 < 2) {
	c_4 = "-"; //減法
	if (b_4 > 0) {
		q4 = "What is the absolute value of ("+a_4+c_4+b_4+") ?"; //a-b=?
	} else {
		q4 = "What is the absolute value of {"+a_4+c_4+"("+b_4+")} ?"; //a-(-B)=?
	}
} else {
	c_4 = "×"; //乗法
	if (b_4 > 0) {
		q4 = "What is the absolute value of ("+a_4+c_4+b_4+") ?"; //a*b=?
	} else {
		q4 = "What is the absolute value of {"+a_4+c_4+"("+b_4+")} ?"; //a*(-B)=?
	}
}

//問題4の答え
if (c_4 == "+") {
	ans4 = Math.abs(a_4+b_4);
} else if (c_4 == "-") {
	ans4 = Math.abs(a_4-b_4);
} else {
	ans4 = Math.abs(a_4*b_4);
}


//問題5
var a_5 = 0;
while(Math.abs(a_5) < 2) {
	//絶対値2以上9以下の数 
	var a_5 = Math.floor(Math.random() * 19)-9;
}

//問題文の作成5
if (a_5 < 0) {
	q5 = "("+a_5+")<sup>2</sup>=?";
} else {
	q5 = a_5+"<sup>2</sup>=?";
}

//問題5の答え
var ans5 = a_5**2;


//問題6
var a_6 = 0;
var b_6 = 0;
while(Math.abs(a_6) == Math.abs(b_6) || Math.abs(a_6) < 2 || Math.abs(b_6) < 2) {
	//異なる二数
	var a_6 = Math.floor(Math.random() * 21)-10;
	var b_6 = Math.floor(Math.random() * 21)-10;
}

//問題文の作成6
var c_6 = Math.random() * 3;
if (c_6 < 1) {
	c_6 = "+"; //加法
	if (b_6 > 0) {
		q6 = a_6+"<span class='literal'>x</span>"+c_6+b_6+"<span class='literal'>x</span>=?"; //ax+bx=?
	} else {
		q6 = a_6+"<span class='literal'>x</span>"+c_6+"("+b_6+"<span class='literal'>x</span>)=?"; //a+(-B)=?
	}
} else if (c_6 < 2) {
	c_6 = "-"; //減法
	if (b_6 > 0) {
		q6 = a_6+"<span class='literal'>a</span>"+c_6+b_6+"<span class='literal'>a</span>=?"; //ax-bx=?
	} else {
		q6 = a_6+"<span class='literal'>a</span>"+c_6+"("+b_6+"<span class='literal'>a</span>)=?"; //a-(-B)=?
	}
} else {
	c_6 = "×"; //乗法
	if (b_6 > 0) {
		q6 = a_6+c_6+b_6+"<span class='literal'>a</span>=?"; //a*b=?
	} else {
		q6 = a_6+c_6+"("+b_6+"<span class='literal'>a</span>)=?"; //a*(-B)=?
	}
}

//問題6の答え
if (c_6 == "+") {
	if (a_6+b_6 == 1) {
		ans6 = "x";
	} else if (a_6+b_6 == -1) {
		ans6 = "-x";
	} else {
		ans6 = (a_6+b_6)+"x";
	}

} else if (c_6 == "-") {
	if (a_6-b_6 == 1) {
		ans6 = "a";
	} else if (a_6-b_6 == -1) {
		ans6 = "-a";
	} else {
		ans6 = (a_6-b_6)+"a";
	}
} else {
	ans6 = (a_6*b_6)+"a";
}


//問題7
var a_7 = 0;
var b_7 = 0;
var c_7 = 0;
var d_7 = 0;
var e_7 = 0;
var f_7 = 0;

while(a_7*b_7+d_7*e_7 == 0 || a_7*c_7+d_7*f_7 ==0) {
var a_7 = Math.floor(Math.random() * 3)+2;
var b_7 = Math.floor(Math.random() * 3)+2;
var c_7 = (Math.floor(Math.random() * 3)+2)*-1;
var d_7 = (Math.floor(Math.random() * 3)+2)*-1;
var e_7 = Math.floor(Math.random() * 3)+2;
var f_7 = Math.floor(Math.random() * 3)+2;
}

//問題文の作成7
const q7 = "Calculate the formula below.<br>"+a_7+"("+b_7+"<span class='literal'>a</span>"+c_7+")"+d_7+"("+e_7+"<span class='literal'>a</span>+"+f_7+")";

//問題7の答え
if ((a_7*c_7+d_7*f_7) < 0) {
	ans7 = (a_7*b_7+d_7*e_7)+"a"+(a_7*c_7+d_7*f_7);
} else {
	ans7 = (a_7*b_7+d_7*e_7)+"a+"+(a_7*c_7+d_7*f_7);
}


//問題8
var a_8 = 0;
var b_8 = 0;
var c_8 = 0;
var ans8 = 0;

while (ans8 == 0 || b_8 == 0) {
	var ans8 = Math.floor(Math.random() * 19)-9;
	var b_8 = Math.floor(Math.random() * 19)-9;
}

while (Math.abs(a_8) == Math.abs(c_8) || (a_8-c_8)*ans8+b_8 == 0) {
	var a_8 = Math.floor(Math.random() * 8)+2;
	var c_8 = Math.floor(Math.random() * 8)+2;
}

const d_8 = (a_8-c_8)*ans8+b_8;

//問題文の作成8
if (b_8 < 0 && d_8 < 0) {
	q8 = "What number fits <span class='literal'>x</span>?<br>"+a_8+"<span class='literal'>x</span>"+b_8+"="+c_8+"<span class='literal'>x</span>"+d_8;
} else if (b_8 < 0 && d_8 > 0) {
	q8 = "What number fits <span class='literal'>x</span>?<br>"+a_8+"<span class='literal'>x</span>"+b_8+"="+c_8+"<span class='literal'>x</span>+"+d_8;
} else if (b_8 > 0 && d_8 < 0) {
	q8 = "What number fits <span class='literal'>x</span>?<br>"+a_8+"<span class='literal'>x</span>+"+b_8+"="+c_8+"<span class='literal'>x</span>"+d_8;
} else {
	q8 = "What number fits <span class='literal'>x</span>?<br>"+a_8+"<span class='literal'>x</span>+"+b_8+"="+c_8+"<span class='literal'>x</span>+"+d_8;
}


//問題9
var a_9 = 0;
var b_9 = 0;
var ans9 = 0;

while (Math.abs(a_9) < 2) {
	var a_9 = Math.floor(Math.random() * 7)-3;
}

while (b_9 == 0 || ans9 == 0) {
	var b_9 = Math.floor(Math.random() * 19)-9;
	var ans9 = Math.floor(Math.random() * 19)-9;
}

const c_9 = (a_9 -1)*ans9 + a_9*b_9;

//問題文の作成9
if (b_9 < 0 && c_9 < 0) {
	q9 = "What number fits <span class='literal'>x</span>?<br>"+a_9+"(<span class='literal'>x</span>"+b_9+")=<span class='literal'>x</span>"+c_9;
} else if (b_9 > 0 && c_9 < 0) {
	q9 = "What number fits <span class='literal'>x</span>?<br>"+a_9+"(<span class='literal'>x</span>+"+b_9+")=<span class='literal'>x</span>"+c_9;
} else {
	q9 = "What number fits <span class='literal'>x</span>?<br>"+a_9+"(<span class='literal'>x</span>+"+b_9+")=<span class='literal'>x</span>+"+c_9;
}


//問題10
while (a_10 == ans10) {
	var a_10 = Math.floor(Math.random() *9)+1;
	var ans10 = Math.floor(Math.random() *9)+1;
}

var b_10 = (Math.floor(Math.random() *5)+5)/2;

//問題文の作成10
const q10 = "What number fits <span class='literal'>x</span>?<br>"+a_10+":<span class='literal'>x</span>="+(a_10*b_10)+":"+(ans10*b_10);

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

//変数
var right = 0; //正解数
var count = 0; //ボタン押した回数
const quiz_num = quiz.length; //問題数
const correct = document.querySelector(".correct"); //正解
const incorrect = document.querySelector(".incorrect"); //不正解
var t_per_q = []; //一問あたりの時間
const box = document.querySelector(".box"); //問題全体
const result = document.querySelector(".result"); //結果
var ur_ans = []; //あなたの答え
var rw = []; //正否
var score_check = 0; // 点数計算
var allotments = [1, 1, 2, 2, 2, 2, 2, 3, 3, 2]; //配点
var score = 0; //点数

//問題の表示
document.getElementsByClassName("question")[0].innerHTML = quiz[count].question; //問題の表示
document.getElementsByClassName("response")[0].focus(); //入力欄フォーカス
var start = Date.now(); //開始時間


//次へ
var next = function() {
	ur_ans.push(document.getElementsByClassName("response")[0].value); //あなたの答えの記録
	document.getElementsByClassName("response")[0].value = "";
	document.getElementById("note_type").value = "";
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	draw_pen();
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
					var this_score = Math.floor((allotments[score_check] * 1650 - t_per_q[score_check]) * 1.2);
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
			    this_rec = [1, ymdhm, score];

			if(localStorage.hasOwnProperty("records")) {
				var records = localStorage.getItem("records"),
				    scores = JSON.parse(records),
				    play_rec = JSON.stringify(scores+","+this_rec);
				localStorage.setItem("records", play_rec);


			} else {
				var play_rec = JSON.stringify(this_rec);
				localStorage.setItem("records", play_rec);
			}

			document.getElementsByClassName("total")[0].innerHTML = "<h2>Score: "+ score +"</h2><br>Number of Correct: "+right+"<br>Time Taken: "+time;

			const table = document.getElementsByClassName("qa_list")[0]; //結果表の取得
			var row = 0,
			    cell = 1;

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