
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

	let

	/*
	 *	Value Hasher
	 *	values to number
	 */
	Hash = {
		value: '',
		
		fromString(...values) {
			let input = '';
			
			for (let value of values) {
				input += btoa(value) + +value + value;
			}
			
			this.value = btoa(input);
			
			return this
		},
		
		toNumber(value = this.value) {
			let hash = 0;
			
			for (let i = 0; i < value.length; i++) {
				let charCode = value.charCodeAt(i);
				hash = (hash << 5) - hash + charCode;
			}
			
			this.value = hash;
			
			return this
		},
		
		get1(value = this.value) {
			return value >>> 0;
		},
		
		getAbs(value = this.value) {
			return Math.abs(value);
		},
		
		get122(value = this.value) {
			value = BigInt(value) * (BigInt(value) << 122n);
			
			value = BigInt(value) % (BigInt(2) ** BigInt(122) - BigInt(1));
			
			return value;
		},
		
		get12(value = this.value) {
			value *= value << 12;
			
			value %= 2**12 - 1;
			
			return value;
		}
	},
	
	/*
	 *	Pseudorandom Number Generators
	 *	number to number
	 */
	PseudorandomNumberGenerators = {
		seed: Date.now(),
		
		setSeed(seed) {
			seed = +seed || +this?.seed || 122;
			return seed;
		},
		
		mixor1(seed) {
			seed = this.setSeed(seed);
			
			seed = (seed ^ (seed >>> 47)) * 0xEF1B57E1;
			seed = (seed ^ (seed << 31)) * 0x7F0A0811;
			seed = (seed ^ (seed >>> 27)) * 0x2BC2D830;
			
			return this.seed = seed;
		},
		
		mixor122(seed) {
			seed = this.setSeed(seed);
			
			seed &= 0x7FFFFFFF
			seed *= 0xA437;
			seed ^= (seed >>> 23) | (seed << 43);
			
			return this.seed = seed;
		},
		
		mixor1E8(seed) {
			seed = this.setSeed(seed);
			
			seed ^= seed << 13;
			seed ^= seed >>> 17;
			seed ^= seed << 5;
			
			return this.seed = seed >>>= 0;
		},
		
		sincast(seed) {
			seed = this.setSeed(seed);
			
			let x = Math.sin(this.seed++) * 1e4;
			
			return x - ~~x;
		}
	},

	randomizer = function(seed) {
		seed = PseudorandomNumberGenerators.mixor1E8(seed);
		
		seed &= 0x7FFFFFFF;
		seed /= 0x7FFFFFFF;
		
		return seed;
	},

	Randomize = {
		range(x, y) {
			x = +x || 0;
			y = +y > x ? +y : x + 1;
			
			let	difference = y - x,
				result = randomizer() * difference,
				offset = result + x;
			
			return offset
		},
		
		color(r,g,b) {
			r = +r || ~~this.range(0,255);
			g = +g || ~~this.range(0,255);
			b = +b || ~~this.range(0,255);
			
			let	red = r.toString(16).padStart(2,'0'),
				green = g.toString(16).padStart(2, '0'),
				blue = b.toString(16).padStart(2, '0'),
				color = '#' + red + green + blue;
			
			return color;
		},
		
		fromList(list) {
			let	index = ~~this.range(0, list.length - 1);
			
			return list[index];
		}
	},

	/*
	 *	returns array of arrays
	 *	of how many numbers
	 *	appeared how many times
	 */
	testRandomizer = function(func, starting = 0, iterations = 1e5) {
		const results = [];
		
		for (let i = starting; i <= iterations; i++) {
			const result = func(i);
			const existingResult = results.find(item => item[0] === result);
			
			if (existingResult) {
				existingResult[1]++;
			} else {
				results.push([result, 1]);
			}
		}
		
		results.sort((a, b) => a[0] - b[0]);
		
		return results;
	},

	/*
	 *	returns random numbers;
	 *	[]: element of array;
	 *	"": one letter;
	 *	x: from 1 to x;
	 *	x & y: from x to y;
	 *	_: 1 or 0;
	 */
	genericRandom = function(x, y = 1) {
		let k = tof(x);
		// y not needed if !number
		if (!asb(y,1)) y = null;
		// returns random element of array if is
		if (k=='Array' || k=='string') return Randomize.fromList(x);
		// returns random number from x to y
		if (k=='number') {
			// returns number if are equal
			if (x == y) return x;
			// reverse x,y if necessary
			if (x > y) [x,y] = [y,x];
			// define number difference
			return ~~Randomize.range(x, y)
		}
		// returns 1 or 0
		return ~~(Randomize.random() * 2);
	};

	W.hsh = Hash;
	W.rng = genericRandom;
	W.Randomize = Randomize;
	W.testRandomizer = testRandomizer;

/*
 *	'}' makes the closure and
 *	'(self)' iterate instantly
 *	the function as window
 */
}(self)
