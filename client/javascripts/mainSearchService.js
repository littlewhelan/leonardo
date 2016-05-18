//This service should pass data between controllers
app.factory('ResultService', ['$http',function($http) {
    var results = [];
    var adults = [];
    var companies = [];
    var kids = [];

    var makeDataCall = function(passedData) {
        return $http({
            method: 'GET',
            url: 'leo/search',
            params:{search:passedData}
        }).then(function (response) {
            results = response.data;
            getCompanies(results);
            getKids(results);
            getAdults(results);
        });
    };
    var getCompanies = function(array) {
        var getElement1 = function(array) {
            companies.splice(0,companies.length);
            array.forEach(function(element){
                if (element.type == 'company')
                companies.push(element);
            })
        };

        getElement1(array);
        console.log('this is getElement1',companies);
        return companies
    };

    var getAdults = function(array) {
        var getElement2 = function(array) {
            adults.splice(0,adults.length);
            array.forEach(function(element){
                if (element.type == 'adult')
                    adults.push(element);
            })
        };
        getElement2(array);
        console.log('this is in getElement2', adults);
        return adults
    };

    var getKids = function(array) {
        var getElement3 = function(array) {
            kids.splice(0,kids.length);
            array.forEach(function(element){
                if (element.type == 'child')
                    kids.push(element);
            })
        };
        getElement3(array);
        console.log('this is getElements3', kids);
        return kids
    };

    //public
    var publicApi = {
        getKids: getKids,
        getAdults: getAdults,
        getCompanies: getCompanies,
        makeDataCall: makeDataCall,
        results: results,
        companies: companies,
        adults: adults,
        kids: kids
    };
    return publicApi;
}]);