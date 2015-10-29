app.service('validService', [function () {

    var validateInput = function (type, id) {
        //console.log("validateInput()");
        // stores the form being called on
        var pattern;
        var $obj = (id) ? $('#'+ id) : false;
        console.log("object is ", $obj, type, id);
        switch (type) {
            case "name":
            case "city":
            case "state":
                // allows and alpha chars, as well as white space and a few extra chars
                pattern = /^[a-zA-z\s,.'-]+$/;
                break;
            case "corpName":
                pattern = /^[a-zA-Z0-9\s,.?@!#'~*_;+-]+$/;
                break;
            case "address":
                pattern = /^[a-zA-Z0-9\s,.?@!#'~*_;+:()%&-]+$/;
                break;
            case "zip":
                pattern = /^[0-9]{5}$/;
                break;
            case "phone":
                pattern = /^([(][0-9]{3}[)]|[0-9]{3})[\s\-.]?[0-9]{3}[\s\-.]?[0-9]{4}$/;
                break;
            case "email":
                pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                break;
            case "notes":
                pattern = /^[a-zA-Z0-9\s,.?@!#'~*_;+:()%&<>\[\]{}\-="|`\\\/]+$/;
                break;
            case "ext":
                pattern = /^[a-zA-Z0-9\s:-]+$/;
                break;
            case "date":
                pattern = /^20[0-9]{2}[-](0[1-9]|1[0-2])[-](0[1-9]|[1-2][0-9]|3[01])$/;
                break;
            case "birthdate":
                pattern = /^(199[0-9]|20[0-9]{2})[-](0[1-9]|1[0-2])[-](0[1-9]|[1-2][0-9]|3[01])$/;
                break;
            case "amount":
                pattern = /^[\$]?[\d]+([.][\d]{2})?$/;
                break;
            default:
                console.log("invalid class search");
                return false;
                break;
        }

		// TODO: if cursor in box and click to add, it throws error saying .val() is undefined
        // if required or trimmed length is not 0, then validate info
        if($obj.attr('required') || $obj.val().trim().length > 0) {
            // checks if value matches regex for field type
            if(!pattern.test($obj.val().trim())) {
                // if fails, adds invalid class (highlighting), changes placeholder to what should be entered
                $obj.addClass('invalid').attr('placeholder', $obj.data('invalid')).val('');
                console.log(type, ' failed test', pattern);
            } else {
                // if passes, removes invalid class, resets placeholder to default
                $obj.removeClass('invalid').attr('placeholder', $obj.data('placeholder'));
                console.log(type, ' passed test', pattern);
            }
        }
    };

    return {
        validateInput: validateInput
    };
}]);