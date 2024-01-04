
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

	// hyperdice regex
	let R = /\d?(?:d\d+)*d(?:\d+!{0,2}|f)/gi,

	/*
	 *	returns randoms;
	 *	(x) times for (n) faced dices
	 *	#REQS#
	 *	rng()
	 */
	D = function(x,n) {
	//	log('[dice.js/dicer]','Rolls:',x);
	//	log('[dice.js/dicer]','Dicefaces:',n);
		// protection for !number & !Fudge arguments
		x = ~~x; if (!asb(x,1)) throw new Error('First argument is not a number!');
		if (asb(~~n,1) && ~~n!=0) n = Math.abs(~~n);
		else if (n.toLowerCase()!=='f') throw new Error('Second argument should be a non-zero number or Fudge!');
		// initialize array of results; also i
		let a = [], i;
		// make the effective rolls
		for (i = 0; i < x; i++) a.push(rng(n));
		// return results
	//	log('[dice.js/dicer]','Result:',a);
		return a
	},

	/*
	 *	returns sum of numbers in array
	 */
	S = function(a) {
	//	log('[dice.js/sum]','Array:',a);
		// protection for argument
		if (!asb(a,[])) throw new Error('Argument is not an array!');
		// initialize sum; also i
		let s = 0, i;
		// loop sum and protection
		for (i of a) {
			// protection for numbers in array
			if (!asb(~~i,1)) throw new Error('Array contains a non-number value!');
			// add current number to sum
			s += ~~i;
		}
		// return array sum
	//	log('[dice.js/sum]','Sum:',s);
		return s
	},

	/*
	 *	returns multiply of numbers in array
	 */
	M = function(a) {
	//	log('[dice.js/mul]','Array:',a);
		// protection for argument
		if (!asb(a,[])) throw new Error('Argument is not an array!');
		// initialize multiplication; also i
		let m = 1, i;
		// loop multiplication and protection
		for (i of a) {
			// protection for numbers in array
			if (!asb(~~i,1)) throw new Error('Array contains a non-number value!');
			// add current number to multiplication
			m *= ~~i;
		}
		// return array multiplication
	//	log('[dice.js/mul]','Multiplicated:',m);
		return m
	},

	/*
	 *	complex;
	 *	returns random of given single hyperdice
	 *	#REQS#
	 *	D(); S(); M()
	 */
	H = function(e) {
	//	log('[dice.js/hyper]','Expression:',e);
		// protection for expression
		if (!asb(e,'')) throw new Error('Argument is not a string!'); else e = e.replace(/\s/g, '');
		// initialization of i; also array of all dicefaces; also multiplier
		let i, d = e.match(/\d+|f/gi), m = M(d);
	//	log('[dice.js/hyper]','Parsed:',d);
		// add diceface at start if not present
		if (e[0] == 'd') d.unshift(1);
		// loop diceface randoms
		for (i in d) d[i] = i == 0 ? d[i] : S(D(d[i-1],d[i]));
		// protection for 'd1!!'
		if (m===1) return 1;
		// check for continuous explosions
		if (e.includes('!!') && ~~d[i] == m) {
	//		log('[dice.js/hyper]','!!',~~d[i]);
			return H(e);
		}
		// check for single explosions
		if (e.includes('!') && ~~d[i] == m) {
	//		log('[dice.js/hyper]','!',~~d[i]);
			e = e.substr(0,e.length-1);
			return H(e);
		}
		// return last summed diceface
	//	log('[dice.js/hyper]','Result unround:',d[i]);
		return ~~d[i]
	},

	/*
	 *	complex;
	 *	parses given aleatoric expression
	 *	#REQS#
	 *	R; H()
	 */
	P = function(e = []) {
	//	log('[dice.js/parser]','To Parse:',e);
		// initialize separated dices and hypers; also d
		let h = e.match(R), d;
	//	log('[dice.js/parser]','Matched Hypers:',h);
		// random and replace every dice
		for (d in h) h[d] = H(h[d]);
		// replace the results with rolls
		d = 0; e = e.replace(R, () => {return h[d++]} );
		// return evaluated final expression
	//	log('[dice.js/parser]','Eval:',e);
		return eval(e)
	};

	/*
	 *	returns expression by
	 *	given points
	 *	WELTIS base 3.0.2
	 */
	W.ptod = function(p = 1) {
	//	log('[dice.js/ptod]','Unprotected Points:',p);
		// points protection
		p = Math.abs(p);
		// dice points dictionary
		let d = {
			0: 'd1',
			1: 'd4',
			2: 'd6',
			3: 'd8',
			4: 'd10',
			5: 'd12',
			6: 'd12',
			7: 'd12',
			8: 'd12',
			9: 'd20'
		},
		// number of completed tables
		t = ~~(p / 9),
		// explicit for t
		u = (t == 1 ? 'd20' : t + 'd20'),
		// complete explicit result
		r = d[p % 9] + (t ? '+' + u : '');
	//	log('[dice.js/ptod]','Newdices:',t);
	//	log('[dice.js/ptod]','Newdice Mode:',u);
	//	log('[dice.js/ptod]','Unful Result:',r);
		// in all cases except fully completed tables
		if (!p || p % 9) return r;
		// else in the cases of fully completed tables
		return u
	};

	/*
	 *	returns expected level
	 *	from given characteristics
	 *	array
	 */
	W.ctol = function(a = [2, 2, 2, 2, 2, 2]) {
	//	log('[ctol]','Array:',a);
		// calculate median
		let m = ~~(med(...a));
	//	log('[ctol]','Median:',m);
		// get max variance
		let d = (Math.max((Math.max(...a) - m),(m - Math.min(...a))));
	//	log('[ctol]','Variance:',d);
		// return median delta max variance
		return m+'Δ'+d
	};

	/*
	 *	returns the max and min value
	 *	of a given expression
	 */
	W.dcalc = function(e = 'd4') {
		let d = e.match(R),m=0,n=0;
	//	log('[dcalc]','Expression:',e);
	//	log('[dcalc]','Matched:',d);
		// maximum number calculator
		for (i of d) {
	//		log('[dcalc]','Current Element:',i);
			m += M(i.match(/\d+/gi));
	//		log('[dcalc]','Current Max:',m);
			if (i[0] == 'd') n++;
			else n += i[0];
	//		log('[dcalc]','Current Min:',n);
		}
		return { 'max': ~~[m], 'min': ~~[n] }
	};

	/*
	 *	returns a rolled number
	 *	from a given expression
	 *	#REQS#
	 *	P()
	 */
	W.roll = function(e = 'd6',t = 1) {
	//	log('[dice.js/roll]','Hyperdice RegEx:',R);
	//	log('[dice.js/roll]','Expression Original:',e);
	//	log('[dice.js/roll]','Rolls:',t);
		// return error if expression is not a string
		if (!asb(e,'')) throw new Error('First argument is not a string!');
		// clean the expression
		e = e.replace(/\s/g,'').replace(/df!*/g,'df').toLowerCase();
	//	log('[dice.js/roll]','Expression Clean:',e);
		// resets times argument if !number
		if (!asb(t,1)) throw new Error('Second argument is not a number!');
		// initialize results[], i; clean times argument
		let a = [], i; t = ~~t;
		// save results for times argument
		for (i = 0; i < t; i++) a.push(P(e));
		// return results
	//	log('[dice.js/roll]','Results:',a);
		return a
	};

/*
 *	'}' makes the closure and
 *	'(self)' iterate instantly
 *	the function
 */
}(self)
