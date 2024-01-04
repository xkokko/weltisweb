
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
	 *	initialization for internals
	 */
	let

	/*
	 *	return array of parsed DOM identifier
	 */
	PDOM = function(s) {
	//	log('[core.js/PDOM]','String to parse =',s);
		// initialize vars
		let r = [], t = '', b, a = '',
		// function to save token in array
		u = (w) => { if (t) r.push(t); t = !asb(w) ? w : '' };
		// loop trough each char in string
		for (let i of s) {
	//		log('[core.js/PDOM]','Looping...',i,'of',s);
			// when !brackets nor hash nor dot: save i, starts new t with i
			if (!b && (i == '#' || i == '.')) u(i);
			// when bracket start: set vars
			else if (i == '[') {u(); b = 1; a = i}
			// when bracket end: save and reset vars
			else if (i == ']') {a += i; r.push(a); b = 0; a = ''}
			// when in brackets add i to attribute
			else if (b) a += i;
			// when !in brackets add i to token
			else t += i;
	//		log('[core.js/PDOM]','Looping...','tokens =',t);
		}
		// save any remaining tokens
		u();
		// return parsed array
	//	log('[core.js/PDOM]','Parsed array =',r);
		return r
	},

	/*
	 *	create DOM element from array DOM identifier
	 */
	CDOM = function(a) {
	//	log('[core.js/CDOM]','Array to parse =',a);
		// new element
		let e = document.createElement(a[0]);
	//	log('[core.js/CDOM]','Created element =',e);
		// loop trough remaining properties
		for (let i of a) {
			// set id if is
			if (i[0] == '#') e.id = i.substr(1);
			// add class if is
			else if (i[0] == '.') e.classList.add(i.substr(1));
			// add custom attribute if is
			else if (i[0] == '[' && i[i.length-1] == ']') {
				let [n, v] = i.substr(1, i.length - 2).split('=');
				e.setAttribute(n, v);
			}
		}
		// return created element
	//	log('[core.js/CDOM]','Final element =',e);
		return e
	};

	/*
	 *	create DOM elements on body or specific parent
	 */
	W.dom = function(q = 'div', p = $('body')[0]) {
	//	log('[dom]','Queried string =',q);
	//	log('[dom]','Passed parent =',p?p:'falsy');
		// protect DOM string
		if (!asb(q,'')) throw new Error('First argument is not a string!');
		// generate DOM element
		let r = CDOM(PDOM(q));
	//	log('[dom]','DOM Element generated =',r);
	//	log('[dom]','p could be =',$('body')[0]);
	//	log('[dom]','p is =',p||undefined);
	//	log('[dom]','p has =',p.nodeType);
		// protect parent argument
		if (asb(p.nodeType)) p = $('body')[0];
		// append element to parent
		p.appendChild(r);
	//	log('[dom]','Appended to =',p);
		// method to set inner text
		r.addText = function(t,h = false) {
		//	log(t);log(h)
			if (h) this.innerHTML = t ?? '';
			else this.innerText = t ?? '';
		//	if (asb(t,'')) this.innerText = t;
			return this
		};
		// method to creat child elements
	//	r.addChild = function(e) { return dom(e, this) };
		// return final element
	//	log('[dom]','Resulted element =',r);
		return r
	}

	/*
	 *	function to fast select any DOM element
	 */
	W.$ = function(s) {
		return document.querySelectorAll(s) || 0;
	}

	/*
	 *	property for activating log()
	 */
	W.jC = true;

	/*
	 *	function to log with date of log
	 */
	W.log = function(...x) {
		let	d = new Date(),
			h = String(d.getHours()).padStart(2, '0'),
			m = String(d.getMinutes()).padStart(2, '0'),
			s = String(d.getSeconds()).padStart(2, '0'),
			n = String(d.getMilliseconds()).padStart(3, '0'),
			l = `[${h}:${m}:${s}.${n}]`;
		if (jC) console.log(l,...x);
		return l;
	}

	/*
	 *	return number of repeated e in c
	 */
	W.rep = function(c) {
		// initialize element; also frequency; also result
		let q, f = {}, r;
		// protection for c
		if (asb(c)) throw new Error('First argument was not passed!');
		if (!asb(c,0)&&!asb(c,'')&&!asb(c,[])) throw new Error('First argument was not a number, string or array!');
		// make number into string
		if (asb(c,0)) c += '';
		// make phrase into array
		if (c.includes(' ')) c = c.split(' ');
		// loop for elements in container and set frequency
		for (q of c) f[q] = f[q] ? f[q] + 1 : 1;
		// loop to get highest frequency
		for (q in f) if (f[q] > f[r] || !r) r = q;
		// return repeats and name of repeated element
		return {'is': (f[r] > 1) ? true : false, 'in': r, 'of': f[r]}
	}

	/*
	 *	returns the type of a given object
	 *	stripped version of jC.type()
	 */
	W.tof = function(o) {
		// returns null if is
		if (o === null) return 'null';
		// initialize a typeof
		let t = typeof o;
		// returns primitive types
		if (!['object','function'].includes(t)) return t;
		// returns type stored as s
		let s = o[Symbol.toStringTag];
		if (typeof s === 'string') return s;
		// returns class if is
		if (t === 'function' && Function.prototype.toString.call(o).startsWith('class')) return 'class';
		// returns constructor name
		let c = o.constructor.name;
		if (typeof c === 'string' && c) return c;
		// return base implementation
		return t
	}

	/*
	 *	returns if the first argument is
	 *	as of the same type as the second
	 */
	W.asb = function(a,b) {
		if (tof(a) == tof(b)) return true;
		return false
	}

	/*
	 *	sums all given numbers
	 */
	W.sum = (...x) => {let n=0;x.forEach(e=>{n+=+e});return n};

	/*
	 *	return strings array from string divided every length
	 */
	W.spl = (s,l = 2) => s.match(new RegExp(`.{${l}}|.{1,${l-1}}`, 'g'));

	/*
	 *	returns true if element can be scrolled into view, else not
	 */
	W.viw = (i) => { i.scrollIntoView(true); return !asb(i) };

	/*
	 *	copies to clipboard given value
	 */
	W.cpy = function(s) {
		// copies via promise
		if (navigator && navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(s);
		// else via old style
		else {
			let e = dom('textarea');
			e.value = s;
			e.select();
			document.execCommand('copy');
			document.body.removeChild(e);
		}
		return s
	}

	/*
	 *	function to get the median number from an array of numbers
	 */
	W.med = function(...n) {
		// error catcher
		if (n.length == 0) throw new Error("No inputs");
		// initialize temporary array
		let m = n;
		// array elements sorter
	//	m.sort(function(a,b){return a-b;});
		m.sort((a,b) => a-b);
		// half
		let h = Math.floor(m.length / 2);
		// return medians
		if (m.length % 2) return m[h]
		return (m[h - 1] + m[h]) / 2.0;
	}

	/*
	 *	returns minified JSON
	 */
	W.jsn = (j) => j.replace(/[\n\t]/g,"").replace(/": /g, "\":");

/*
 *	'}' makes the closure and
 *	'(self)' iterate instantly
 *	the function
 */
}(self)
