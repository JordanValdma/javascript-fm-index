function FmIndex(bwtString, suffixIndexes){
	this.bwtString = bwtString;
	this.suffixIndexes = suffixIndexes;

	this.c = undefined;
	this.alphabetIndexes = undefined;

	this.occTable = undefined;

	this.initialize = function(){
		this.constructAlphabet();
		this.constructC();
		this.constructOcc();
	}

	this.constructAlphabet = function(){
		this.alphabetIndexes = {};
		var arrayUnique = function(a) {
		    return a.reduce(function(p, c) {
		        if (p.indexOf(c) < 0) p.push(c);
		        return p;
		    }, []);
		};

		this.alphabet = arrayUnique(this.bwtString.split('')).sort();
		for(var i = 0; i < this.alphabet.length; i++){
			this.alphabetIndexes[this.alphabet[i]] = i;
		}
	}

	this.constructC = function(){
		var cResult = {};
		var cTable = [];
		var n = 0;

		for(var i = 0; i<this.alphabet.length; i++){
			n = 0;
			for(var j = 0; j<this.bwtString.length; j++){
				if(this.bwtString[j] < this.alphabet[i]){
					n++;
				}
			}
			cResult[cTable[i]] = n;
			cTable.push(n)
		}

		this.c = cTable;

	}

	this.constructOcc = function(){

		var occs = [];

		for(var i = 0; i < this.alphabet.length; i++){
			occs[i] = [];
		}

		var r;
		for(var j = 0; j<this.bwtString.length; j++){
			for(var i = 0; i < this.alphabet.length; i++){

				r = occs[i][j-1];

				occs[i][j] = (typeof r  == 'undefined') ? 0 : r;

				if(this.alphabet[i] == this.bwtString[j]){
					occs[i][j]++;
				}
			}
		}

		this.occTable = occs;

	}

	this.occ = function(c, k){
		return this.occTable[this.alphabetIndexes[c]][k-1];
	}

	this.getC = function(c){
		return this.c[this.alphabetIndexes[c]];
	}

	this.wordAppliesToDictionary = function(word){
		//if not exist in alphabet then not found
		for(var i = 0; i < word.length; i++){
			if(typeof this.alphabetIndexes[word[i]] == 'undefined'){
				return false;
			}
		}
		return true;
	}


	this.findSuffixIndexes = function(word){
		if(!this.wordAppliesToDictionary(word)){
			return -1;
		}

		var c = word[word.length-1];
		var start = this.getC(c) + 1;

		//make sure to stay in bounds
		var pre2 = this.alphabet[this.alphabetIndexes[c] + 1]
		if(typeof pre2 == 'undefined'){
			pre2 = this.alphabet[this.alphabetIndexes[c]];
		}
		var end = this.getC(pre2);

		if(word.length == 1){
			return {start: start, end: end};
		}

		var found = false;
		for(var i = word.length-2; i >= 0; i--){
			c = word[i];
			start = this.getC(c) + this.occ(c, start-1) + 1;
			end = this.getC(c) + this.occ(c, end);
			if(end<start){
				break;
			}
			found = true;
		}
		
		if(found){
			return {start: start, end: end};
		} else {
			return -1;
		}


	}

	this.count = function(word){
		var f = this.findSuffixIndexes(word);
		if(f != -1){
			return f.end-f.start + 1;
		} else {
			return -1;
		}
	}

	this.locate = function(word){
		var f = this.findSuffixIndexes(word);
		var ret = [];

		for(var i = f.start - 1; i < f.end; i++){
			ret.push(this.suffixIndexes[i]);
		}

		return ret;
	}

	this.initialize();

}