app.factory('ContactListDataService',['Shttp', function($http) {

    var results = [];
    var allCompanies = [];
    var allKids = [];
    var allAdults = [];

    var makeDataCall = function (passedData) {
        return http({
            method: 'GET',
            URL: '../createMailList',
            params: {search: passedData}
        }).then(function (response) {
            results = response.data;
            getCompanies(results);
            getAdults(results);
            getKids(results);
        });
    };


    var getAdults = function (array) {
        var getElement3 = function (array) {
            allAdults.splice(0, allAdults.length);
            array.forEach(function (element) {
                if (element.type == 'adult')
                    allAdults.push(element);
            })
        };
        getElement3(array);
        return allAdults
    };

    var getCompanies = function (array) {
        var getElement3 = function (array) {
            allCompanies.splice(0, allCompanies.length);
            array.forEach(function (element) {
                if (element.type == 'company')
                    allCompanies.push(element);
            })
        };
        getElement3(array);
        return allCompanies
    };

    var getKids = function (array) {
        var getElement3 = function (array) {
            allKids.splice(0, allKids.length);
            array.forEach(function (element) {
                if (element.type == 'child')
                    kids.push(element);
            })
        };
        getElement3(array);
        return allKids
    };

    var dataApi = {
        makeDataCall: makeDataCall,
        getCompanies: getCompanies,
        getKids: getKids,
        getAdults: getAdults,
        results: results,
        allKids: allKids,
        allAdults: allAdults,
        allCompanies: allCompanies
    };

    return dataApi;

}]);
