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

var a_1 = 0;
while(Math.abs(a_1) < 2) {
	var a_1 = Math.floor(Math.random() * 41)-20;
}

const type_1 = Math.random() * 4;

if (type_1 < 1) {
	q1 = "&quot;Go east for "+a_1+" meters&quot;<br> is the same as <br>&quot;Go west for <span class='literal'>x</span> meters.&quot;<br>What number fits<span class='literal'> x</span>?";
} else if (type_1 < 2) {
	q1 = "&quot;"+a_1+" minutes ago from now&quot;<br> is the same as <br>&quot;<span class='literal'>x</span> minutes from now.&quot;<br>What number fits<span class='literal'> x</span>?";
} else if (type_1 < 3) {
	q1 = "&quot;A profit of "+a_1+" dollars&quot;<br> is the same as <br>&quot;a loss of <span class='literal'>x</span> dollars.&quot;<br>What number fits<span class='literal'> x</span>?";
} else {
	q1 = "&quot;"+a_1+" points higher than the average&quot;<br> is the same as <br>&quot;<span class='literal'>x</span> points lower than the average.&quot;<br>What number fits<span class='literal'> x</span>?";
}

const ans1 = a_1*-1;

while(a_2 == b_2) {
	var a_2 = (Math.floor(Math.random() * 10)+1)*-1;
	var b_2 = (Math.floor(Math.random() * 10)+1)*-1;
}

const q2 = "Which is greater,<br>"+a_2+" or "+b_2+"?";

if (a_2 < b_2) {
	ans2 = b_2;
} else {
	ans2 = a_2;
}

var a_3 = 0;
var b_3 = 0;
while(Math.abs(a_3) == Math.abs(b_3) || b_3 == 0) {
	var a_3 = (Math.floor(Math.random() * 10)+1)*-1;
	var b_3 = Math.floor(Math.random() * 21)-10;
}

var c_3 = Math.random() * 3;
if (c_3 < 1) {
	c_3 = "+";
	if (b_3 > 0) {
		q3 = a_3+c_3+b_3+"=?";
	} else {
		q3 = a_3+c_3+"("+b_3+")=?";
	}
} else if (c_3 < 2) {
	c_3 = "-";
	if (b_3 > 0) {
		q3 = a_3+c_3+b_3+"=?";
	} else {
		q3 = a_3+c_3+"("+b_3+")=?";
	}
} else {
	c_3 = "×";
	if (b_3 > 0) {
		q3 = a_3+c_3+b_3+"=?";
	} else {
		q3 = a_3+c_3+"("+b_3+")=?";
	}
}

if (c_3 == "+") {
	ans3 = a_3+b_3;
} else if (c_3 == "-") {
	ans3 = a_3-b_3;
} else {
	ans3 = a_3*b_3;
}

var a_4 = 0;
var b_4 = 0;
while(Math.abs(a_4) == Math.abs(b_4) || a_4 == 0 || b_4 == 0 || a_4 == a_3) {
	var a_4 = Math.floor(Math.random() * 21)-10;
	var b_4 = Math.floor(Math.random() * 21)-10;
}

var c_4 = Math.random() * 3;
if (c_4 < 1) {
	c_4 = "+";
	if (b_4 > 0) {
		q4 = "What is the absolute value of ("+a_4+c_4+b_4+") ?";
	} else {
		q4 = "What is the absolute value of {"+a_4+c_4+"("+b_4+")} ?";
	}
} else if (c_4 < 2) {
	c_4 = "-";
	if (b_4 > 0) {
		q4 = "What is the absolute value of ("+a_4+c_4+b_4+") ?";
	} else {
		q4 = "What is the absolute value of {"+a_4+c_4+"("+b_4+")} ?";
	}
} else {
	c_4 = "×";
	if (b_4 > 0) {
		q4 = "What is the absolute value of ("+a_4+c_4+b_4+") ?";
	} else {
		q4 = "What is the absolute value of {"+a_4+c_4+"("+b_4+")} ?";
	}
}

if (c_4 == "+") {
	ans4 = Math.abs(a_4+b_4);
} else if (c_4 == "-") {
	ans4 = Math.abs(a_4-b_4);
} else {
	ans4 = Math.abs(a_4*b_4);
}

var a_5 = 0;
while(Math.abs(a_5) < 2) { 
	var a_5 = Math.floor(Math.random() * 19)-9;
}

if (a_5 < 0) {
	q5 = "("+a_5+")<sup>2</sup>=?";
} else {
	q5 = a_5+"<sup>2</sup>=?";
}

var ans5 = a_5**2;

var a_6 = 0;
var b_6 = 0;
while(Math.abs(a_6) == Math.abs(b_6) || Math.abs(a_6) < 2 || Math.abs(b_6) < 2) {
	var a_6 = Math.floor(Math.random() * 21)-10;
	var b_6 = Math.floor(Math.random() * 21)-10;
}

var c_6 = Math.random() * 3;
if (c_6 < 1) {
	c_6 = "+";
	if (b_6 > 0) {
		q6 = a_6+"<span class='literal'>x</span>"+c_6+b_6+"<span class='literal'>x</span>=?";
	} else {
		q6 = a_6+"<span class='literal'>x</span>"+c_6+"("+b_6+"<span class='literal'>x</span>)=?";
	}
} else if (c_6 < 2) {
	c_6 = "-";
	if (b_6 > 0) {
		q6 = a_6+"<span class='literal'>a</span>"+c_6+b_6+"<span class='literal'>a</span>=?";
	} else {
		q6 = a_6+"<span class='literal'>a</span>"+c_6+"("+b_6+"<span class='literal'>a</span>)=?";
	}
} else {
	c_6 = "×";
	if (b_6 > 0) {
		q6 = a_6+c_6+b_6+"<span class='literal'>a</span>=?";
	} else {
		q6 = a_6+c_6+"("+b_6+"<span class='literal'>a</span>)=?";
	}
}

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

const q7 = "Calculate the formula below.<br>"+a_7+"("+b_7+"<span class='literal'>a</span>"+c_7+")"+d_7+"("+e_7+"<span class='literal'>a</span>+"+f_7+")";

if ((a_7*c_7+d_7*f_7) < 0) {
	ans7 = (a_7*b_7+d_7*e_7)+"a"+(a_7*c_7+d_7*f_7);
} else {
	ans7 = (a_7*b_7+d_7*e_7)+"a+"+(a_7*c_7+d_7*f_7);
}

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

if (b_8 < 0 && d_8 < 0) {
	q8 = "What number fits <span class='literal'>x</span>?<br>"+a_8+"<span class='literal'>x</span>"+b_8+"="+c_8+"<span class='literal'>x</span>"+d_8;
} else if (b_8 < 0 && d_8 > 0) {
	q8 = "What number fits <span class='literal'>x</span>?<br>"+a_8+"<span class='literal'>x</span>"+b_8+"="+c_8+"<span class='literal'>x</span>+"+d_8;
} else if (b_8 > 0 && d_8 < 0) {
	q8 = "What number fits <span class='literal'>x</span>?<br>"+a_8+"<span class='literal'>x</span>+"+b_8+"="+c_8+"<span class='literal'>x</span>"+d_8;
} else {
	q8 = "What number fits <span class='literal'>x</span>?<br>"+a_8+"<span class='literal'>x</span>+"+b_8+"="+c_8+"<span class='literal'>x</span>+"+d_8;
}

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

if (b_9 < 0 && c_9 < 0) {
	q9 = "What number fits <span class='literal'>x</span>?<br>"+a_9+"(<span class='literal'>x</span>"+b_9+")=<span class='literal'>x</span>"+c_9;
} else if (b_9 > 0 && c_9 < 0) {
	q9 = "What number fits <span class='literal'>x</span>?<br>"+a_9+"(<span class='literal'>x</span>+"+b_9+")=<span class='literal'>x</span>"+c_9;
} else {
	q9 = "What number fits <span class='literal'>x</span>?<br>"+a_9+"(<span class='literal'>x</span>+"+b_9+")=<span class='literal'>x</span>+"+c_9;
}

while (a_10 == ans10) {
	var a_10 = Math.floor(Math.random() *9)+1;
	var ans10 = Math.floor(Math.random() *9)+1;
}

var b_10 = (Math.floor(Math.random() *5)+5)/2;

const q10 = "What number fits <span class='literal'>x</span>?<br>"+a_10+":<span class='literal'>x</span>="+(a_10*b_10)+":"+(ans10*b_10);

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
var allotments = [1, 1, 2, 2, 2, 2, 2, 3, 3, 2];
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
					var this_score = Math.floor((allotments[score_check] * 1650 - t_per_q[score_check]) * 1.2);
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
