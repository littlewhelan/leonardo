app.factory('ContactListDataService', ['$http', function ($http) {

	return {
		makeDataCall: function (type, passedData) {
            console.log(type,passedData);
			return $http({
				method: 'GET',
				url: '../createMailList',
				params: {type: type, search: passedData}
			});
		}
	}

}]);