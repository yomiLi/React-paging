module.exports = {
	test: function (req, res) {
		var pageIndex = req.query.pageIndex;
		var pageSize = req.query.pageSize;
		if (pageIndex < 5) {
			var arr = [];
			for (var i = 0; i < pageSize; i++) {
				arr.push(pageIndex * pageSize + i);
			}
			return res.json(arr);
		} else {
			return res.json([100]);
		}
	}
};