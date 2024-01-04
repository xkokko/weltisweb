<?php 
	$pageTitle = "Weltis - Dice Roller";
	$pageClasses = 'wcc';
	$customJavascripts = ['chartjs.prng','chartjs.dice'];
?>


<div class="container col even theme light article">
	<h1 class="spaced">Tira Dadi.</h1>
	<div class="container wrap text left paragraph">
		<p>Con questo strumento è possibile generare numeri a seconda dei dadi lanciati.</p>
		<p>Ogni dado ha un pulsante rappresentante il suo numero di facce ed un testo su sfondo bianco laterale indicante il risultato del lancio.</p>
		<p>In fondo alla pagina si possono leggere gli ultimi 6 risultati dei lanci, ordinati dal meno al più recente.</p>
	</div>
	<hr class="spaced"/>
	<h2 class="spaced">Aleatoria.</h2>
	<div class="container wrap text left paragraph">
		<p>Nell'ultimo campo di testo è possibile inserire una formula matematica con espressioni aleatoriche.</p>
		<p>Le espressioni aleatoriche sono espressioni indicanti il numero delle facce di un dado.</p>
		<p>Un dado Fudge (dF) è un dado i cui risultati sono 1, 0 o -1; sono megli oconosciuti i risultati come +, vuoto o −.</p>
	</div>
	<div class="container wrap text left paragraph">
		<p>Il punto esclamativo (!) in una espressione indicano l'esplosione di una formula; ovvero di dover essere ritirata se risulta il valore massimo per il primo lancio; due punti esclamativi (!!) indicano che la formula dovrà esplodere tutte le volte che viene risultato il valore massimo.</p>
	</div>
	<div class="container wrap mid text center">
		<p class="quote serif italic">d20+d6</p>
		<p class="quote serif italic">d12-d4</p>
		<p class="quote serif italic">d4d12d20</p>
		<p class="quote serif italic">dF</p>
		<p class="quote serif italic">d12!</p>
		<p class="quote serif italic">d6!!</p>
	</div>
	<hr class="spaced"/>
	<div class="container wrap full width">
		<div class="flex full container mid text center column third">
			<span class="label flex full theme light-gray resulter" id="d4">1</span>
			<button class="medium" data-sides="4" type="button">d4</button>
		</div>
		<div class="flex full container mid text center column third">
			<span class="label flex full theme light-gray resulter" id="d6">1</span>
			<button class="medium" data-sides="6" type="button">d6</button>
		</div>
		<div class="flex full container mid text center column third">
			<span class="label flex full theme light-gray resulter" id="d8">1</span>
			<button class="medium" data-sides="8" type="button">d8</button>
		</div>
		<div class="flex full container mid text center column third">
			<span class="label flex full theme light-gray resulter" id="d10">1</span>
			<button class="medium" data-sides="10" type="button">d10</button>
		</div>
		<div class="flex full container mid text center column third">
			<span class="label flex full theme light-gray resulter" id="d12">1</span>
			<button class="medium" data-sides="12" type="button">d12</button>
		</div>
		<div class="flex full container mid text center column third">
			<span class="label flex full theme light-gray resulter" id="d20">1</span>
			<button class="medium" data-sides="20" type="button">d20</button>
		</div>
		<div class="flex full container mid text center column third">
			<span class="label flex full theme light-gray resulter" id="d100">1</span>
			<button class="medium" data-sides="100" type="button">d100</button>
		</div>
		<div class="flex full container wrap mid text center">
			<input class="flex full lazy medium" id="exp" type="text">
			<span class="label flex full theme gray-light resulter" id="result">1</span>
			<button class="flex full medium" id="roll" type="button">roll</button>
		</div>
	</div>
	<hr class="spaced weltis"/>
	<div class="flex full container wrap mid text center width">
		<span class="tag flex full theme dark column third saver">1</span>
		<span class="tag flex full theme dark column third saver">1</span>
		<span class="tag flex full theme dark column third saver">1</span>
		<span class="tag flex full theme dark column third saver">1</span>
		<span class="tag flex full theme dark column third saver">1</span>
		<span class="tag flex full theme dark column third saver">1</span>
	</div>
</div>
<script>!function(t){let e=[1,1,1,1,1,1],l=t=>{e.push(t),e.shift(),$("span.saver").forEach((t,l)=>{t.textContent=e[l]})};$("button[data-sides]").forEach((t,e)=>{t.addEventListener("click",()=>{let n=rng(Number(t.getAttribute("data-sides")));$("span.resulter")[e].textContent=n,l(n)})}),$("#roll")[0].addEventListener("click",()=>{let t=$("#exp")[0].value,e=""!=t?roll(t):1;$("#result")[0].textContent=e,l(e)})}(self);</script>

