
app.service('newContactListData', ['ContactListDataService', '$http',
    function (ContactListDataService, $http) {
        var listNum = "";
        var importDataArray =[];

        this.postList = function (name) {
            console.log("did the name make it to the service? " + name );
            return $http.post('/newContactList', {name: name}).then(function (response) {
                console.log(response.data);
                listNum = response.data;
                console.log("Id? ", listNum);
            }, function(data){
                console.log(data); //error
            });
        };
        this.popList = function (list) {
            this.dataObject = {
                "importDataArray": importDataArray,
                "listNum": listNum
            };
            console.log('got to popList');
            console.log('importDataArray: ',this.importDataArray, '\ntype: ', typeof this.importDataArray);
            getChecked(list);
            $http.post('/populateContactList', this.dataObject).then(function (data, status, headers, config) {
                console.log('posted');
                console.log(data);
                console.log('importDataArray: ',this.importDataArray, '\ntype: ', typeof this.importDataArray);
            });
        };
        //get all the checked elements and stuff them in an array
        var getChecked = function (l) {
            console.log('getChecked is running');
            l.forEach(
                function (object) {
                    {
                         this.contactObject =
                        {
                            "email_addresses": [
                                object.email
                            ],
                            "first_name":object.firstName,
                            "last_name": object.lastName,
                            "company_name": object.company,
                            "addresses": [{
                                city: object.city
                            }]
                        };

                        console.log(this.contactObject);
                        importDataArray.push(this.contactObject);
                    }
                }
            );
        }
    }]);


