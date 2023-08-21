var table = document.getElementById("recording"); //スコア一覧の取得

var records = localStorage.getItem("record");

var rec_clean = records.replace(/{"play_time":"|]|}|\[|"point":|"/g, ''); //一覧を整頓
var arr_recode = rec_clean.split(','); //配列にする

var cell = 0;

while (cell < arr_recode.length) {
	//表にスコアを挿入
	var tr_recording = table.tBodies[0].insertRow(-1);
	var td_recording = tr_recording.insertCell(-1);
	td_recording.appendChild(document.createTextNode(arr_recode[cell]));
	cell++;
	var td_recording = tr_recording.insertCell(-1);
	td_recording.appendChild(document.createTextNode(arr_recode[cell]));
	cell++;
}

function savepic(dataurl) {
	const name = "scores.png";
	const a = document.createElement("a");
	a.href = dataurl;
	a.download = name;
	a.click();
}

var capture = document.getElementById("capture");
capture.addEventListener("click", function(){
	html2canvas(document.getElementById("recording")).then(function(canvas) {
		savepic(canvas.toDataURL());
	});
});