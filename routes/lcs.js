var express = require("express")
var router = express.Router();

var subInAll = function(sub, array) {
	for (var i=0; i<array.length; i++) {
		var str = array[i].value;
		if (str.indexOf(sub)<0) return false;
	}
	return true;
}

var lcsFinder = function(array) {
	var result = {lcs: []};
	var maxLength = 0;
	var current = [];
	var first = array[0].value;
	for (var i=0; i<first.length; i++) {
		var c = first.charAt(i);
		if (subInAll(c, array)) {
			for (var j=i+1; j<=first.length; j++) {
				var sub = first.substring(i, j);
				if (subInAll(sub, array)) {
					if (sub.length>maxLength) {
						current = [];
						current.push(sub);
						maxLength = sub.length;
					} else if (sub.length==maxLength) {
						current.push(sub);
					}
				}
			}
		}
	}
	for (var i=0; i<current.length; i++) {
		result.lcs.push({value: current[i]});
	}
	return result;
}

router.post("/", function(req, resp) {
	console.log(req.body);
	resp.json(lcsFinder(req.body.setOfStrings));
});

module.exports = router;