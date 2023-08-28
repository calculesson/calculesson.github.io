<!DOCTYPE html>
<html lang="ja">

<head>
<meta charset='utf-8'>
<link rel="stylesheet" href="../../css/all.css" type="text/css">
<meta name="viewport" content="width=device-width">
<link rel="stylesheet" href="../../css/game.css" type="text/css">
<link rel="icon" href="../../pic/icon.svg">
<link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c" rel="stylesheet">
<title>中2 - CalcuLesson</title>
</head>

<body>
	<div class="box">
		<div class="timer">0m 0s</div>
		<div class="correct"><div class="circle"></div></div>
		<div class="incorrect"><div class="cross"></div></div>

		<p class="question"></p>

		<div class="text">
			<input class="response" pattern="^[ -~]*$">
			<label>答えを入力</label>
			<span class="focus-line"></span>
		</div>

		<div class="button" id="next_q">
			<a>次へ</a>
		</div>
		<br>
		<h4>メモ欄（タップで切り替え）</h4>
		<ul class="tab">
			<li><a href="#hand">手書きメモ</a></li>
			<li><a href="#type">入力式メモ</a></li>
		</ul>
		<div id="hand" class="notes">
			手書きメモ<br>
			<img src="../../pic/undo.svg" onclick="prevCanvas()" alt="元に戻す">
			<img src="../../pic/redo.svg" onclick="nextCanvas()" alt="やり直す">
			<img src="../../pic/pen.svg" id="pen" onclick="draw_pen()" alt="ペン">
			<img src="../../pic/eraser.svg" id="eraser" onclick="erase()" alt="消しゴム">
			<div class="canvasContainer">
				<canvas id="canvas"></canvas>
			</div>
			<div style="padding:10px">
				<div class="button" id="reset">
					<a>手書きメモのリセット</a>
				</div>
			</div>
		</div>
		<div id="type" class="notes">
			入力式メモ
			<textarea id="note_type"></textarea>
		</div>
	</div>

	<div class="result">
		<h1>結果発表</h1>
		<div class="total"></div>
		<table class="qa_list">
			<thead>
				<tr>
					<th>番号</th>
					<th>問題</th>
					<th>正答</th>
					<th>あなたの答え</th>
					<th>正否</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>2</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>3</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>4</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>5</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>6</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>7</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>8</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>9</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>10</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
		<div class="button">
			<a href="top.html" onclick="window.onbeforeunload = null;">TOPへ戻る</a>
		</div>
		<h3>解説</h3>
		<ul class="contents">
			<li>
				<section>
					<h4 class="ans_detail">問1</h4>
					<div class="explanation">
					</div>
				</section>
			</li>
			<li>
				<section>
					<h4 class="ans_detail">問2</h4>
					<div class="explanation">
					</div>
				</section>
			</li>
			<li>
				<section>
					<h4 class="ans_detail">問3</h4>
					<div class="explanation">
					</div>
				</section>
			</li>
			<li>
				<section>
					<h4 class="ans_detail">問4</h4>
					<div class="explanation">
					</div>
				</section>
			</li>
			<li>
				<section>
					<h4 class="ans_detail">問5</h4>
					<div class="explanation">
					</div>
				</section>
			</li>
			<li>
				<section>
					<h4 class="ans_detail">問6</h4>
					<div class="explanation">
					</div>
				</section>
			</li>
			<li>
				<section>
					<h4 class="ans_detail">問7</h4>
					<div class="explanation">
					</div>
				</section>
			</li>
			<li>
				<section>
					<h4 class="ans_detail">問8</h4>
					<div class="explanation">
					</div>
				</section>
			</li>
			<li>
				<section>
					<h4 class="ans_detail">問9</h4>
					<div class="explanation">
					</div>
				</section>
			</li>
			<li>
				<section>
					<h4 class="ans_detail">問10</h4>
					<div class="explanation">
					</div>
				</section>
			</li>
		</ul>
	</div>
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="../../js/ja/2nd.js"></script>
</body>
</html>
