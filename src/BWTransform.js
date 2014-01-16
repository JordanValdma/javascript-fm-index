function BWTransform(str){
		//todo $ character check
		str += "$";
		var strs = [[str, 0]];
		for(var i = 1; i < str.length; i++){
			strs[i] = [([strs[i-1][0][str.length-1]]) + (strs[i-1][0].slice(0, str.length-1)), str.length - i]; 
		}

		strs.sort(function(a,b){
			return a[0].localeCompare(b[0])
		});

		var bwtStr = '';
		var suffixIndexes = [];
		for(var i = 0; i < str.length; i++){
			bwtStr += strs[i][0][str.length-1];
			suffixIndexes.push(strs[i][1]);
		}

		return {
			indexes: suffixIndexes,
			bwtStr: bwtStr
		};
}