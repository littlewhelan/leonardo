app.service('dateService', ['MomentJS', function (moment) {
	var dbFormat = "YYYY-MM-DD";
	var uiFormat = "M/D/YYYY";

	var toDbFormat = function (date) {
		return moment(date).format(dbFormat);
	};

	var fromDbFormat = function (date) {
		return moment(date).format(uiFormat);
	};

    return {
        toDB: toDbFormat,
		fromDB: fromDbFormat
    };
}]);