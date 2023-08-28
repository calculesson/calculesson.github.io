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
while(Math.abs(a_1) < 2) {
	//絶対値20以下の数 (a!=0)
	var a_1 = Math.floor(Math.random() * 41)-20;
}

const type_1 = Math.random() * 4; //問題の種類決め

//問題文の作成1
if (type_1 < 1) {
	q1 = "「東に"+a_1+"m進む」<br>を言い換えると、<br>「西に<span class='literal'>x</span>m進む」になる。<br><span class='literal'>x</span>に当てはまる数は？";
} else if (type_1 < 2) {
	q1 = "「今から"+a_1+"分前」<br>を言い換えると、<br>「今から<span class='literal'>x</span>分後」になる。<br><span class='literal'>x</span>に当てはまる数は？";
} else if (type_1 < 3) {
	q1 = "「"+a_1+"円の利益」<br>を言い換えると、<br>「<span class='literal'>x</span>円の損失」になる。<br><span class='literal'>x</span>に当てはまる数は？";
} else {
	q1 = "「平均より"+a_1+"点高い」<br>を言い換えると、<br>「平均より<span class='literal'>x</span>点低い」になる。<br><span class='literal'>x</span>に当てはまる数は？";
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
const q2 = "次の二つの数のうち、<br>大きい方を書きなさい　<br>"+a_2+", "+b_2;

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
		q4 = "("+a_4+c_4+b_4+")の絶対値は？"; //a+b=?
	} else {
		q4 = "{"+a_4+c_4+"("+b_4+")}の絶対値は？"; //a+(-B)=?
	}
} else if (c_4 < 2) {
	c_4 = "-"; //減法
	if (b_4 > 0) {
		q4 = "("+a_4+c_4+b_4+")の絶対値は？"; //a-b=?
	} else {
		q4 = "{"+a_4+c_4+"("+b_4+")}の絶対値は？"; //a-(-B)=?
	}
} else {
	c_4 = "×"; //乗法
	if (b_4 > 0) {
		q4 = "("+a_4+c_4+b_4+")の絶対値は？"; //a*b=?
	} else {
		q4 = "{"+a_4+c_4+"("+b_4+")}の絶対値は？"; //a*(-B)=?
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
const q7 = a_7+"("+b_7+"<span class='literal'>a</span>"+c_7+")"+d_7+"("+e_7+"<span class='literal'>a</span>+"+f_7+")　<br>を計算しなさい";

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
	q8 = "<span class='literal'>x</span>に当てはまる数を答えなさい。<br>"+a_8+"<span class='literal'>x</span>"+b_8+"="+c_8+"<span class='literal'>x</span>"+d_8;
} else if (b_8 < 0 && d_8 > 0) {
	q8 = "<span class='literal'>x</span>に当てはまる数を答えなさい。<br>"+a_8+"<span class='literal'>x</span>"+b_8+"="+c_8+"<span class='literal'>x</span>+"+d_8;
} else if (b_8 > 0 && d_8 < 0) {
	q8 = "<span class='literal'>x</span>に当てはまる数を答えなさい。<br>"+a_8+"<span class='literal'>x</span>+"+b_8+"="+c_8+"<span class='literal'>x</span>"+d_8;
} else {
	q8 = "<span class='literal'>x</span>に当てはまる数を答えなさい。<br>"+a_8+"<span class='literal'>x</span>+"+b_8+"="+c_8+"<span class='literal'>x</span>+"+d_8;
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
	q9 = "<span class='literal'>x</span>に当てはまる数を答えなさい。<br>"+a_9+"(<span class='literal'>x</span>"+b_9+")=<span class='literal'>x</span>"+c_9;
} else if (b_9 > 0 && c_9 < 0) {
	q9 = "<span class='literal'>x</span>に当てはまる数を答えなさい。<br>"+a_9+"(<span class='literal'>x</span>+"+b_9+")=<span class='literal'>x</span>"+c_9;
} else {
	q9 = "<span class='literal'>x</span>に当てはまる数を答えなさい。<br>"+a_9+"(<span class='literal'>x</span>+"+b_9+")=<span class='literal'>x</span>+"+c_9;
}


//問題10
while (a_10 == ans10) {
	var a_10 = Math.floor(Math.random() *9)+1;
	var ans10 = Math.floor(Math.random() *9)+1;
}

var b_10 = (Math.floor(Math.random() *5)+5)/2;

//問題文の作成10
const q10 = "<span class='literal'>x</span>に当てはまる数を答えなさい。<br>"+a_10+":<span class='literal'>x</span>="+(a_10*b_10)+":"+(ans10*b_10);

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
    allotments = [1, 1, 2, 2, 2, 2, 2, 3, 3, 2],
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

			document.getElementsByClassName("total")[0].innerHTML = "<h2>スコア　"+ score +"</h2><br>正解数："+right+"<br>時　間："+time;

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

			const ans_detail = document.getElementsByClassName("explanation");
			if (type_1 < 1) {
				ans_detail[0].innerHTML = "「西に進む」は「東に進む」の反対であると言えます。そのため、"+ a_1 +"の符号を変えた（"+ a_1 +"に-1をかけた）"+ ans1 +"が答えとなります。";
			} else if (type_1 < 2) {
				ans_detail[0].innerHTML = "「<span class='literal'>a</span>分後」は「<span class='literal'>a</span>分前」の反対であると言えます。そのため、"+ a_1 +"の符号を変えた（"+ a_1 +"に-1をかけた）"+ ans1 +"が答えとなります。";
			} else if (type_1 < 3) {
				ans_detail[0].innerHTML = "「損失」は「利益」の対義語であると言えます。そのため、"+ a_1 +"の符号を変えた（"+ a_1 +"に-1をかけた）"+ ans1 +"が答えとなります。";
			} else {
				ans_detail[0].innerHTML = "「低い」は「高い」の対義語であると言えます。そのため、"+ a_1 +"の符号を変えた（"+ a_1 +"に-1をかけた）"+ ans1 +"が答えとなります。";
			}

			ans_detail[1].innerHTML = "難しい場合は数直線を書くとわかりやすいでしょう。正の数では絶対値が大きいほど数も大きくなり、負の数では絶対値が大きいほど数は小さくなります。そのため、"+ a_2 +"と"+ b_2 +"では"+ ans2 +"の方が大きいです。<br><img src='../../pic/1st-ans_detail1.png' style='width:80%; max-width:480px;'>";

			if (c_3 == "+") {
				if (b_3 > 0) {
					if (Math.abs(a_3) > Math.abs(b_3)){
						ans_detail[2].innerHTML = "符号の異なる数の和は、「絶対値の大きい方」から「絶対値の小さい方」をひいた数に、「絶対値が大きい方の符号」を組み合わせたものになります。つまり今回だと、"+ a_3 +"と"+ b_3+"では"+a_3+"の方が絶対値が大きいので、"+ a_3*-1 +"-"+ b_3 +"に「-」の符号をつけた"+ ans3 +"が答えになります";
					} else {
						ans_detail[2].innerHTML = "符号の異なる数の和は、「絶対値の大きい方」から「絶対値の小さい方」をひいた数に、「絶対値が大きい方の符号」を組み合わせたものになります。つまり今回だと、"+ a_3 +"と"+ b_3+"では"+b_3+"の方が絶対値が大きいので、"+ b_3 +""+ a_3 +"をします。正の数は「+」をつけずに表現するのが一般的なので、"+ ans3 +"が答えになります。";
					}
				} else {
					ans_detail[2].innerHTML = "同じ符号の数の和は、その符号に「絶対値の和」を組み合わせたものになります。つまり今回だと、"+ a_3*-1 +"+"+b_3+ "に「-」をつけた"+ ans3 +"が答えになります。";
				}
			} else if (c_3 == "-") {
				if (b_3 > 0) {
					ans_detail[2].innerHTML = "正負の数の減法（ひき算）では、ひく数の符号を変えて、たし算をします。つまり-A-B のBは「+B」という正の数であり、 -A+(-B)と等しいので、"+ a_3 + "+(-" +b_3 +")="+ ans3 +"となります。";
				} else {
					ans_detail[2].innerHTML = "正負の数の減法（ひき算）では、ひく数の符号を変えて、たし算をします。つまりA-(-B) は A+Bと等しいので、"+ a_3 +"+"+ b_3 +"="+ ans3 +"となります。";
				}
			} else {
				if (b_3 > 0) {
					ans_detail[2].innerHTML = "正の数と負の数の積は負の数になるので、"+ a_3*-1 +"&times;"+ b_3 +"に符号「-」をつけた"+ ans3 +"が答えになります。"; 
				} else {
					ans_detail[2].innerHTML = "負の数と負の数の積は正の数になるので、"+ a_3*-1 +"&times;"+ b_3*-1 +"で、答えは"+ ans3 + "となります。";
				}
			}

			ans_detail[3].innerHTML = "絶対値は原点（0）からの距離なので、必ず正になります。問題文のかっこの中を計算した答えが正の場合は答えはそのままですが、負の場合は-1をかける必要があります。よって答えは"+ ans4 +"になります。";

			if (a_5 < 0) {
				ans_detail[4].innerHTML = "2乗とは、その数を2回かけることを指します。A<sup>2</sup>はA&times;Aと等しいです。よって答えは("+ a_5 +")&times;("+ a_5 +")="+ ans5 +"になります。";
			} else {
				ans_detail[4].innerHTML = "2乗とは、その数を2回かけることを指します。A<sup>2</sup>はA&times;Aと等しいです。よって答えは"+ a_5 +"&times;"+ a_5 +"="+ ans5 +"になります。";
			}

			if (c_6 == "+" || c_6 == "-") {
				if (b_6 > 0) {
					ans_detail[5].innerHTML = "A<span class='literal'>x</span>+B<span class='literal'>x</span> は、A&times<span class='literal'>x</span>+B&times;<span class='literal'>x</span>とも表せます。分配法則の逆を使うと ("+ a_6+c_6+b_6 +")<span class='literal'>a</span>となるので、答えは<span class='literal'>"+ ans6 +"</span>となります。"; 
				} else {
					ans_detail[5].innerHTML = "A<span class='literal'>x</span>+B<span class='literal'>x</span> は、A&times<span class='literal'>x</span>+B&times;<span class='literal'>x</span>とも表せます。分配法則の逆を使うと {"+ a_6+c_6+"("+b_6 +")}<span class='literal'>a</span>となるので、答えは<span class='literal'>"+ ans6 +"</span>となります。"; 
	}
			} else {
				if (b_6 > 0) {
					ans_detail[5].innerHTML = "A<span class='literal'>x</span> は A&times;<span class='literal'>x</span>と等しいです。そのため、<br>"+ a_6+c_6+b_6 +"<span class='literal'>a</span>="+ a_6+c_6+"("+b_6+c_6 +"<span class='literal'>a</span>)<br>となります。乗法の交換法則を利用して左から計算すると、答えは<span class='literal'>"+ ans6 +"</span>となります。";
				} else {
					ans_detail[5].innerHTML = "A<span class='literal'>x</span> は A&times;<span class='literal'>x</span>と等しいです。そのため、<br>"+ a_6+c_6+ "(" +b_6 +"<span class='literal'>a</span>)="+ a_6+c_6+ "{(" +b_6+ ")" +c_6 +"<span class='literal'>a</span>}<br>となります。乗法の交換法則を利用して左から計算すると、答えは<span class='literal'>"+ ans6 +"</span<となります。";
				}
			}

			ans_detail[6].innerHTML = "分配法則を用いて解いていきます。（与式）= "+ a_7 +"&times;"+ b_7 +"<span class='literal'>a</span>+"+ a_7 +"&times;("+ c_7 +") + ("+ d_7 +"&times;"+ e_7 +"<span class='literal'>a</span>"+ d_7 +"&times;"+ f_7 +")<br>となり、計算すると<span class='literal'>"+ ans7 +"</span>となります。";

			if (b_8 < 0) {
				ans_detail[7].innerHTML = "移項して<span class='literal'>x</span>の値を求めます。両辺から「"+ c_8 +"<span class='literal'>x</span>」と「"+ b_8 +"」をひくと（この二つの数を移項すると）、<br>("+ a_8 + "-" + c_8 +")<span class='literal'>x</span>="+ d_8 +"-("+ b_8 +")の形になるので、計算して<span class='literal'>"+ ans8 +"</span>が答えになります。";
			} else {
				ans_detail[7].innerHTML = "移項して<span class='literal'>x</span>の値を求めます。両辺から「"+ c_8 +"<span class='literal'>x</span>」と「"+ b_8 +"」をひくと（この二つの数を移項すると）、<br>("+ a_8 + "-" + c_8 +")<span class='literal'>x</span>="+ d_8 +"-"+ b_8 +"の形になるので、計算して<span class='literal'>"+ ans8 +"</span>が答えになります。";
			}

			if (b_9 < 0) {
				ans_detail[8].innerHTML = "問題7で用いた分配法則と、問題8で用いた移項を使う問題です。計算すると、(" + a_9 +"-1)<span class='literal'>x</span>="+ c_9 +"-{"+ a_9 +"&times;("+ b_9 +")}となるので、答えは<span class='literal'>"+ ans9 +"</span>です。";
			} else {
				ans_detail[8].innerHTML = "問題7で用いた分配法則と、問題8で用いた移項を使う問題です。計算すると、(" + a_9 +"-1)<span class='literal'>x</span>="+ c_9 +"-("+ a_9 +"&times;"+ b_9 +")となるので、答えは<span class='literal'>"+ ans9 +"</span>です。";
			}

			ans_detail[9].innerHTML = "比例式の性質を用いて解いていきます。比例式の一部に小数や分数が含まれる場合は、比に10などの数をかけて整数に直すと計算しやすいでしょう。<br><span class='literal'>「a:b=c:d</span>ならば、<span class='literal'>ad=bc</span>」であることを利用して答えを求めます。もしくは、<span class='literal'>c=ax</span>とおくとき<span class='literal'>d=bx</span>であることを利用して解きます。";

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


$(".ans_detail").on("click", function() {
	var findElm = $(this).next(".explanation");
	$(findElm).slideToggle();
	if($(this).hasClass("close")){
		$(this).removeClass("close");
	}
	else{
		$(this).addClass("close");
	}
});
