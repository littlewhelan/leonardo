app.service('dateService', ['MomentJS', function (moment) {
	var dbFormat = "YYYY-MM-DD";

	var toDbFormat = function (date) {
		return moment(date).format(dbFormat);
	};

    return {
        toDB: toDbFormat
    };
}]);