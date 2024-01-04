<?php 
	$pageTitle = "Weltis - Characteristics Calculator";
	$pageClasses = 'wcc';
	$customJavascripts = ['chartjs.prng','chartjs.dice'];
?>


<div class="container col even theme light article">
	<h1 class="spaced">Genera Caratteristiche.</h1>
	<div class="paragraph">
		<p>Con questo strumento è possibile generare tabelle di caratteristiche per determinare Punti Ferita e Punti Vigore.</p>
	</div>
	<div class="paragraph">
		<p>I valori che coinvolgono lanci di dadi, come Punti Ferita e Punti Vigore, mostrano valori di media matematica (con lo sfondo scuro) insieme a valori casuali (con lo sfondo chiaro).</p>
	</div>
	<hr class="spaced weltis"/>
	<div class="container wrap full width mono">
		<div class="flex full text just center sans column half">
			<button class="large" type="button" id="generator">Genera!</button>
		</div>
		<div class="flex full text just center column half">
			<div class="container ungap counter" id="taglia">
				<button class="small decrement" type="button">−</button>
				<span class="tag text right theme dark count">3</span>
				<button class="small increment" type="button">+</button>
				<span class="tag flex full theme light-gray" id="dado-taglia">d8</span>
				<span class="tag theme gray-light">Taglia</span>
			</div>
		</div>
		<div class="flex full text just center column half">
			<div class="ungap container counter" id="for">
				<button class="small decrement" type="button">−</button>
				<span class="tag text right theme dark count">2</span>
				<button class="small increment" type="button">+</button>
				<span class="tag flex full theme light-gray" id="dado-for">d6</span>
				<span class="tag theme gray-light">FOR</span>
			</div>
			<div class="ungap container counter" id="agl">
				<button class="small decrement" type="button">−</button>
				<span class="tag text right theme dark count">2</span>
				<button class="small increment" type="button">+</button>
				<span class="tag flex full theme light-gray" id="dado-agl">d6</span>
				<span class="tag theme gray-light">AGL</span>
			</div>
			<div class="ungap container counter" id="res">
				<button class="small decrement" type="button">−</button>
				<span class="tag text right theme dark count">2</span>
				<button class="small increment" type="button">+</button>
				<span class="tag flex full theme light-gray" id="dado-res">d6</span>
				<span class="tag theme gray-light">RES</span>
			</div>
		</div>
		<div class="flex full text just center column half">
			<div class="ungap container counter" id="inf">
				<button class="small decrement" type="button">−</button>
				<span class="tag text right theme dark count">2</span>
				<button class="small increment" type="button">+</button>
				<span class="tag flex full theme light-gray" id="dado-inf">d6</span>
				<span class="tag theme gray-light">INF</span>
			</div>
			<div class="ungap container counter" id="std">
				<button class="small decrement" type="button">−</button>
				<span class="tag text right theme dark count">2</span>
				<button class="small increment" type="button">+</button>
				<span class="tag flex full theme light-gray" id="dado-std">d6</span>
				<span class="tag theme gray-light">STD</span>
			</div>
			<div class="ungap container counter" id="con">
				<button class="small decrement" type="button">−</button>
				<span class="tag text right theme dark count">2</span>
				<button class="small increment" type="button">+</button>
				<span class="tag flex full theme light-gray" id="dado-con">d6</span>
				<span class="tag theme gray-light">CON</span>
			</div>
		</div>
		<div class="flex full text just center ungap container column half">
			<span class="tag theme dark" id="mid-pf">3</span>
			<span class="tag theme light-gray" id="rand-pf">3</span>
			<span class="tag flex full theme gray-light">Punti Ferita</span>
		</div>
		<div class="flex full text just center ungap container column half">
			<span class="tag theme dark" id="mid-pv">3</span>
			<span class="tag theme light-gray" id="rand-pv">3</span>
			<span class="tag flex full theme gray-light">Punti Vigore</span>
		</div>
		<div class="flex full text just center ungap container column half">
			<span class="tag flex full theme light-gray">Carico Massimo</span>
			<span class="tag text right theme gray-light" id="ucm">14uc</span>
		</div>
		<div class="flex full text just center ungap container column half">
			<span class="tag flex full theme light-gray">Classificazione</span>
			<span class="tag theme dark" id="rank">2Δ0</span>
		</div>
	</div>
</div>
<script>
!function(t){let e=$(".container.counter"),n=3,o=[2,2,2,2,2,2],d=function(t,e){document.getElementById(`dado-${e}`).textContent=ptod(t),"taglia"==e?n=t:"for"==e?o[0]=t:"agl"==e?o[1]=t:"res"==e?o[2]=t:"inf"==e?o[3]=t:"std"==e?o[4]=t:"con"==e&&(o[5]=t),document.getElementById("mid-pf").textContent=~~(dcalc(ptod(n)+"+"+ptod(o[2])).max/4),document.getElementById("mid-pv").textContent=~~(dcalc(ptod(n)+"+"+ptod(o[5])).max/4),document.getElementById("rank").textContent=ctol(o),document.getElementById("ucm").textContent=dcalc(ptod(o[2])+"+"+ptod(n)).max+"uc"},c=function(){document.getElementById("rand-pf").textContent=~~(roll(ptod(n)+"+"+ptod(o[2]))/2),document.getElementById("rand-pv").textContent=~~(roll(ptod(n)+"+"+ptod(o[5]))/2),document.getElementById("rank").textContent=ctol(o),document.getElementById("ucm").textContent=dcalc(ptod(o[2])+"+"+ptod(n)).max+"uc"};e.forEach((t,e)=>{let n=t.querySelector(".decrement"),o=t.querySelector(".increment"),c=t.querySelector(".count");n.addEventListener("click",()=>{let e=parseInt(c.textContent,10);e=Math.max(e-1,0),c.textContent=e,d(e,t.id)}),o.addEventListener("click",()=>{let e=parseInt(c.textContent,10);e++,c.textContent=e,d(e,t.id)})}),$("#generator")[0].addEventListener("click",()=>{c()})}(self);
</script>
