
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

	/*
	 *	text
	 */
	C = $('.container.counter'),

	/*
	 *	text
	 */
	size = 3,
	chars = [2,2,2,2,2,2],
	pf = 3,
	pv = 3,

	/*
	 *	text
	 */
	U = function(x, e) {
		if (!asb(x,1)) throw new Error('First argument is not a number!');
		if (!asb(e,'')) throw new Error('Second argument is not a string!');
		log('[script]','x:',x);
		log('[script]','e:',e);
		let s = document.getElementById(`dado-${e}`);
		log('[script]','Updating',s.textContent,'of',`dado-${e}`,'with',x);
		s.textContent = ptod(x);
		if (e == 'taglia') size = x;
		else if (e == 'for') chars[0] = x;
		else if (e == 'agl') chars[1] = x;
		else if (e == 'res') chars[2] = x;
		else if (e == 'inf') chars[3] = x;
		else if (e == 'std') chars[4] = x;
		else if (e == 'con') chars[5] = x;
		document.getElementById('mid-pf').textContent = ~~(dcalc(ptod(size)+'+'+ptod(chars[2])).max/4.0);
		log('[script]','3 Chars:',chars);
		document.getElementById('mid-pv').textContent = ~~(dcalc(ptod(size)+'+'+ptod(chars[5])).max/4.0);
		log('[script]','4 Chars:',chars);
		document.getElementById('rank').textContent = ctol(chars);
		document.getElementById('ucm').textContent = dcalc(ptod(chars[2])+'+'+ptod(size)).max+'uc';
		log('[script]','5 Chars:',chars);
		log('[script]','Taglia:',size);
		log('[script]','Chars:',chars);
		log('[script]','PF:',pf);
		log('[script]','PV:',pv);
	},

	/*
	 *	text
	 */
	R = function() {
		document.getElementById('rand-pf').textContent = ~~(roll(ptod(size)+'+'+ptod(chars[2]))/2.0);
		document.getElementById('rand-pv').textContent = ~~(roll(ptod(size)+'+'+ptod(chars[5]))/2.0);
		document.getElementById('rank').textContent = ctol(chars);
		document.getElementById('ucm').textContent = dcalc(ptod(chars[2])+'+'+ptod(size)).max+'uc';
	};

	/*
	 *	text
	 */
	C.forEach((e,i) => {
		log('[script.C.forEach]','element',e);
		log('[script.C.forEach]','index',i);
		
		let
		m = e.querySelector('.decrement'),
		p = e.querySelector('.increment'),
		k = e.querySelector('.count');
		
		log('[script.C.forEach]','.decrement',m);
		log('[script.C.forEach]','.increment',p);
		log('[script.C.forEach]','.count',k);
		
		m.addEventListener('click', () => {
			let x = parseInt(k.textContent, 10);
			x = Math.max(x - 1, 0);
			k.textContent = x;
			U(x, e.id);
		});
		
		p.addEventListener('click', () => {
			let x = parseInt(k.textContent, 10);
			x++;
			k.textContent = x;
			U(x, e.id);
		});
	});

	$('#generator')[0].addEventListener('click', () => {
		R();
	});

/*
 *	'}' makes the closure and
 *	'(self)' iterate instantly
 *	the function
 */
}(self)
