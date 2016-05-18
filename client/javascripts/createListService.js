app.factory('ContactListDataService', ['$http', '$q', function ($http, $q) {

    function makeDataCall(type, passedData) {
        var deferred = $q.defer();
        console.log('this is in the make data call', type, passedData);
        $http({
            method: 'GET',
            url: 'leo/createMailList',
            params: {type: type, search: passedData}
        }).then(function (response) {
            data = response.data;
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }

    return {
        data: [],
        makeDataCall: makeDataCall
    };


}]);