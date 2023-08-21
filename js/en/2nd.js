window.onbeforeunload = function(e) {
	e.returnValue = "Your score will not be saved. Will you discard it?";
}

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

var q1 = "<span class='literal'>x</span> ="+x_1+", <span class='literal'>y</span> ="+y_1+"　 <br>Calculate the formula below.<br>"+a_1+"<span class='literal'>x</span>"+b_1+"<span class='literal'>y</span>";

const ans1 = a_1*x_1 + b_1*y_1;

var a_2 = 0;
var b_2 = 0;
var c_2 = 0;
var d_2 = 0;

while(Math.abs(a_2) < 2 || d_2 == 0 ) {
	var a_2 = Math.floor(Math.random() * 19)-9;
	var d_2 = Math.floor(Math.random() * 19)-9;
}

while(Math.abs(b_2) < 2 || Math.abs(c_2) < 2 || b_2 == c_2) { 
	var b_2 = Math.floor(Math.random() * 19)-9;
	var c_2 = Math.floor(Math.random() * 19)-9;
}

if (c_2 < 0 && d_2 < 0) {
	q2 = "Calculate the formula below. <br>"+a_2+"("+b_2+"<span class='literal'>x</span>"+c_2+"<span class='literal'>y</span>"+d_2+")";
} else if (c_2 > 0 && d_2 < 0) {
	q2 = "Calculate the formula below. <br>"+a_2+"("+b_2+"<span class='literal'>x</span>+"+c_2+"<span class='literal'>y</span>"+d_2+")";
} else {
	q2 = "Calculate the formula below. <br>"+a_2+"("+b_2+"<span class='literal'>x</span>+"+c_2+"<span class='literal'>y</span>+"+d_2+")";
}

if ((a_2 * c_2) < 0 && (a_2 * d_2) < 0) {
	ans2 = a_2 * b_2 +"x"+ (a_2*c_2) +"y"+ a_2 * d_2;
} else if ((a_2 * c_2) > 0 && (a_2 * d_2) < 0) {
	ans2 = a_2 * b_2 +"x+"+ a_2 * c_2 +"y"+ a_2 * d_2;
} else if ((a_2 * c_2) < 0 && (a_2 * d_2) > 0) {
	ans2 = a_2 * b_2 +"x"+ a_2 * c_2 +"y+"+ a_2 * d_2;
} else {
	ans2 = a_2 * b_2 +"x+"+ a_2 * c_2 +"y+"+ a_2 * d_2;
}

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
	var a_3 = Math.floor(Math.random() * 8)+2;
	var b_3 = (Math.floor(Math.random() * 8)+2)*-1;
	var c_3 = Math.floor(Math.random() * 8)+2;
	var d_3 = Math.floor(Math.random() * 8)+2;
}

const e_3 = a_3 * ans3 + b_3 * y_3;
const f_3 = c_3 * ans3 + d_3 * y_3;

const q3 = a_3+"<span class='literal'>x</span>"+b_3+"<span class='literal'>y</span>="+e_3+",　<br>"+c_3+"<span class='literal'>x</span>+"+d_3+"<span class='literal'>y</span>="+f_3+"　<br>What number fits <span class='literal'>x</span>?";

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
	var a_4 = Math.floor(Math.random() * 8)+2;
	var b_4 = (Math.floor(Math.random() * 8)+2)*-1;
	var c_4 = Math.floor(Math.random() * 8)+2;
	var d_4 = Math.floor(Math.random() * 8)+2;
}

const e_4 = a_4 * x_4 + b_4 * ans4;
const f_4 = c_4 * x_4 + d_4 * ans4;

const q4 = a_4+"<span class='literal'>x</span>"+b_4+"<span class='literal'>y</span>="+e_4+"　<br>"+c_4+"<span class='literal'>x</span>+"+d_4+"<span class='literal'>y</span>="+f_4+"　<br>What number fits <span class='literal'>y</span>?";

var x_5 = Math.floor(Math.random() * 19) -9;

while (a_5 == b_5) {
	var a_5 = Math.floor(Math.random() * 19) -9;
	var b_5 = Math.floor(Math.random() * 19) -9;
}

var ans5 = a_5 * x_5 + b_5;

if (b_5 < 0) {
	q5 = "<span class='literal'>y</span>="+a_5+"<span class='literal'>x</span>"+b_5+", <br><span class='literal'>x</span>+<span class='literal'>y</span>="+ (x_5+ans5)+"　<br>What number fits <span class='literal'>y</span>?";
} else {
	q5 = "<span class='literal'>y</span>="+a_5+"<span class='literal'>x</span>+"+b_5+", <br><span class='literal'>x</span>+<span class='literal'>y</span>="+ (x_5+ans5)+"　<br>What number fits <span class='literal'>y</span>?";
}

var a_6 = 0;
var b_6 = 0;
while(Math.abs(a_6) == Math.abs(b_6) || Math.abs(a_6) < 2 || b_6 ==0) {
	var a_6 = Math.floor(Math.random() * 21)-10;
	var b_6 = Math.floor(Math.random() * 21)-10;
}

var x_6 = Math.floor(Math.random() * 21)-10;
var y_6 = a_6 * x_6 + b_6;

var q6 = "The rate of change is "+a_6+", and <br><span class='literal'>y</span>="+y_6+" when <span class='literal'>x</span>="+x_6+". <br>Find the formula of this linear function.";

if (b_6 < 0) {
	ans6 = "y="+a_6+"x"+b_6;
} else {
	ans6 = "y="+a_6+"x+"+b_6;
}

var a_7 = 0;
var b_7 = 0;
while(Math.abs(a_7) == Math.abs(b_7) || Math.abs(a_7) < 2 || b_7 ==0) {
	var a_7 = Math.floor(Math.random() * 11)-5;
	var b_7 = Math.floor(Math.random() * 21)-10;
}

while(x1_7 == x2_7) {
	var x1_7 = Math.floor(Math.random() * 21)-10;
	var x2_7 = Math.floor(Math.random() * 21)-10;
}

var y1_7 = a_7 * x1_7 + b_7;
var y2_7 = a_7 * x2_7 + b_7;

var q7 = "Find the formula of the line AB passing through the points <br>A("+x1_7+", "+y1_7+"), B("+x2_7+", "+y2_7+")";

if (b_7 < 0) {
	ans7 = "y="+a_7+"x"+b_7;
} else {
	ans7 = "y="+a_7+"x+"+b_7;
}

var arr8 = [Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31)];

function mix(array) {
	for(let i = (array.length - 1); 0 < i; i--){
		let r = Math.floor(Math.random() * (i + 1));
		let tmp = array[i];
		array[i] = array[r];
		array[r] = tmp;
	}
	return array;
}


var arr_sort8 = arr8;

arr_sort8.sort(function (a,b) {
	return a-b;
});

var n_8 = arr_sort8[3];
var m_8 = arr_sort8[4];

var q8 = "Find the median of the data below. <br>"+mix(arr8);

var ans8 = (n_8 + m_8)/2;

var arr9 = [Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31)];

var arr_sort9 = arr9;

arr_sort9.sort(function (a,b) {
	return a-b;
});

var ans9 = arr_sort9[1];

var q9 = "Find the lower quartile of the data below. <br>"+mix(arr9);

var arr10 = [Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31), Math.floor(Math.random() * 31)];

var arr_sort10 = arr10;

arr_sort10.sort(function (a,b) {
	return a-b;
});

var a_10 = arr_sort10[1];
var b_10 = arr_sort10[2];
var c_10 = arr_sort10[5];
var d_10 = arr_sort10[6];

var q10 = "Find the interquartile range of the data below. <br>"+mix(arr10);

var ans10 = (c_10+d_10)/2 - (a_10+b_10)/2;

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


var right = 0;
var count = 0;
const quiz_num = quiz.length;
const correct = document.querySelector(".correct");
const incorrect = document.querySelector(".incorrect");
var t_per_q = [];
const box = document.querySelector(".box");
const result = document.querySelector(".result");
var ur_ans = [];
var rw = [];
var score_check = 0;
var allotments = [2, 1, 2, 2, 2, 2, 1, 2, 3, 3];
var score = 0;

document.getElementsByClassName("question")[0].innerHTML = quiz[count].question;
document.getElementsByClassName("response")[0].focus();
var start = Date.now();

var next = function() {
	ur_ans.push(document.getElementsByClassName("response")[0].value);
	document.getElementsByClassName("response")[0].value = "";
	document.getElementsByClassName("note")[0].value = "";
	var finish = Date.now();
	t_per_q.push((finish-start)/100);
	if (ur_ans[count] == quiz[count].answer) {
		right++;
		rw.push("O");
		count++;
		correct.classList.add ("show");
		setTimeout (function() {
			correct.classList.remove("show");
		}, 560);
	} else {
		rw.push("X");
		count++;
		incorrect.classList.add ("show");
		setTimeout (function() {
			incorrect.classList.remove("show");
		}, 560);
	}
	if (count < quiz_num) {
		setTimeout (function() {
			document.getElementsByClassName("question")[0].innerHTML = quiz[count].question;
			document.getElementsByClassName("response")[0].focus();
			var start = Date.now();
		}, 560);
	} else {
		setTimeout (function() {
			const time = min+"m "+sec+"s";
			clearInterval (q_time);
			box.classList.add ("hide");

			while (score_check < 10) {
				if (rw[score_check] == "O") {
					var this_score = Math.floor((allotments[score_check] * 1650 - t_per_q[score_check]) * 1.1);
					if (this_score > 0) {
						score += this_score;
					} else {}
				} else {}
				score_check++;
			}

			var now = new Date();
			var Year = now.getFullYear();
			var Month = now.getMonth()+1;
			var Day = now.getDate();
			var Hour = now.getHours();
			var Min = now.getMinutes();
			var ymdhm = Year + "/ " + Month + "/ " + Day + " " + Hour + ":" + Min;

			if(localStorage.hasOwnProperty("record")) {
				var records = localStorage.getItem("record");
				var scores = JSON.parse(records);

				var this_rec = {play_time: ymdhm, point: score};
				var play_rec = [scores, this_rec];
				var play_rec = JSON.stringify(play_rec);
				localStorage.setItem("record", play_rec);
			} else {
				var this_rec = {play_time: ymdhm, point: score};
				var play_rec = [this_rec];
				var play_rec = JSON.stringify(play_rec);
				localStorage.setItem("record", play_rec);
			}


			document.getElementsByClassName("total")[0].innerHTML = "<h2>Score: "+ score +"</h2><br>Number of Correct: "+right+"<br>Time Taken: "+time;

			const table = document.getElementsByClassName("qa_list")[0];
			var row = 0;
			var cell = 1;

			while (row < 10) {
				row++;
				table.rows[row].cells[cell].innerHTML = quiz[row -1].question.replace(/<br>/g, '');
				cell++;
				table.rows[row].cells[cell].innerHTML = quiz[row -1].answer;
				cell++;
				table.rows[row].cells[cell].innerHTML = ur_ans[row -1];
				cell++;
				table.rows[row].cells[cell].innerHTML = rw[row -1];
				var cell = 1;
			}

			result.classList.add ("open");


		}, 560);
	};
};

var next_q = document.getElementById("next_q");
next_q.addEventListener("click", next);

var response = document.getElementsByClassName("response")[0];
response.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		next();
	}
});
