//service for ajax calls to constant contact

app.service('newContactListData', ['ContactListDataService', '$http',
    function (ContactListDataService, $http) {

    var newContactList = [];
    var listNum = "1499523610";

    this.postList = function () {
        $http.post('/newContactList').then(function (data) {
            console.log(data);
            listNum = data.id

        }, function(data){
            console.log(data); //error
        });
        console.log(options)
    };

    var importDataArray = [
        {
            "email_addresses": [
                "user1@example.com"
            ],
            "first_name": "John",
            "last_name": "Smith",
            "company_name": "Company X",
            "addresses": [{
                city: "anytown"
            }]
        },
        {
            "email_addresses": [
                "user2@example.com"
            ],
            "first_name": "Jane",
            "last_name": "Smithy",
            "company_name": "Company Y",
            "addresses": [{
                city: "sometown"
            }]
        }
    ];

    //var contactListObject =({
    //    "Import Data" : importDataArray,
    //    "list": [listNum],
    //    "column_names":["EMAIL","FIRST NAME", "LAST NAME", "CITY","COMPANY NAME"]});


    this.popList = function () {
        getChecked();
        $http.post('/populateContactList.js', importDataArray, listNum).success(function (data, status, headers, config) {
            console.log(data);
        });
        console.log(options);

    };

    //get all the checked elements and stuff them in an array
    var getChecked = function () {
            $(":checked.type-element").each(
                function () {
                    if (id == ContactListDataService.results.id) {
                        var contactObject =
                        {
                            "email_addresses": [
                                $(this).email
                            ],
                            "first_name": $(this).firstName,
                            "last_name": $(this).lastName,
                            "company_name": $(this).company,
                            "addresses": [{
                                city: $(this).city
                            }]
                        };
                        importDataArray.push(contactObject);
                    }

                }
            );
        }
}]);