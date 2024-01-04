
// ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ // k o k k o // u t f - 8 // ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ //
// ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ // k o k k o // u t f - 8 // ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ //
// ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ // k o k k o // u t f - 8 // ¤ ¤ ¤ ¤ ¤ // ¤ ¤ ¤ ¤ ¤ //

/*
 *	~~`~~`~~`~~`~~`~~`~~`~~`~~`~~
 *	create a closure and block
 *	the functions to be called
 *	outside except for the ones
 *	starting with 'W.'
 *	~~`~~`~~`~~`~~`~~`~~`~~`~~`~~
 *	beware uninitialized functions
 *	without 'W.' as they must be
 *	initialized with 'let'
 *	~~`~~`~~`~~`~~`~~`~~`~~`~~`~~
 */
;!function(W){

	/*
	 *	text
	 */
	let

	A = [1,1,1,1,1,1],

	U = (x)=>{
		A.push(x); A.shift();
		$('span.big.full.column.label').forEach((s,i)=>{
			s.textContent = A[i];
		});
	};

	$('button[data-sides]').forEach((b,i)=>{
		b.addEventListener('click',()=>{
			let x = rng(Number(b.getAttribute('data-sides')));
			$('span.light.full.big.label')[i].textContent = x;
			U(x);
		});
	});

	$('#roll')[0].addEventListener('click',()=>{
		let i = $('#exp')[0].value, x = i != '' ? roll(i) : 1;
		$('#result')[0].textContent = x;
		U(x);
	});

/*
 *	'}' makes the closure and
 *	'(self)' iterate instantly
 *	the function
 */
}(self)
