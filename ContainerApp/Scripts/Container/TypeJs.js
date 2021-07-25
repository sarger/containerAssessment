function TypeModel() {

    // Make the self as 'this' reference
    // Declare observable which will be bind with UI

    var self = this;
    self.BASE_URL = ko.observable("");
    self.ErrorMessage = ko.observable(null);
    self.Types = ko.observableArray([]);
    self.Name = ko.observable(null);
    self.Type = ko.observable(null);
    self.ValidationPassed = ko.observable(false);
    self.ShowAddType = ko.observable(false);
    self.Search = ko.observable(null);

    self.LoadList = function () {

        url = self.BASE_URL() + 'Type/GetAll';
        $.ajax({
            url: url,
            cache: false,
            type: 'GET',
            data: {},
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                self.Types($.parseJSON(data));
                console.log($.parseJSON(data));
            },
            error: function (request, status, error) {
                self.OutputErrors(request, status, error);
            }
        });

    };

    self.Search.subscribe(function (val) {
        if (val == null || val == '') {
            self.LoadList();
            return;
        }

        url = self.BASE_URL() + 'Type/Search';
        $.ajax({
            url: url,
            cache: false,
            type: 'GET',
            data: { find: val },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                self.Types($.parseJSON(data));
                console.log($.parseJSON(data));
            },
            error: function (request, status, error) {
                self.OutputErrors(request, status, error);
            }
        });

    });

    self.ShowOrHideAddType = function () {
        self.ShowAddType(!self.ShowAddType());
        self.Name(null);
    }

    self.ValidateData = function (model) {

        self.ValidationPassed(false);

        if (model.Name == null || model.Name.length == 0) {
            alert("Type name can not be null");
            return;
        }


        self.ValidationPassed(true);

    };

    self.SaveType = function () {
        self.ErrorMessage(null);
        var dataTopost =
        {
            Name: self.Name()
        }

        self.ValidateData(dataTopost);

        if (self.ValidationPassed() == false) { return; }


        $.ajax({
            url: self.BASE_URL() + 'Type/Add',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(dataTopost),
            success: function (data) {
                self.LoadList();
                self.ShowOrHideAddType();
                toastr.success("Type saved successfully");
            },
            error: function (request, status, error) {
                self.OutputErrors(request, status, error);
            }
        });
    };

    self.UpdateType = function () {

        self.ValidateData(self.Type());

        if (self.ValidationPassed() === false) {
            return false;
        }

        self.ErrorMessage(null);

        $.ajax({
            url: self.BASE_URL() + 'Type/Update',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(self.Type()),
            success: function (data) {
                self.Type(null);
                self.LoadList();
                toastr.success("Type updated successfully");
            },
            error: function (request, status, error) {
                self.OutputErrors(request, status, error);
            }
        });

    };







    self.OutputErrors = function (request, status, error) {
        console.log(request);
        console.log(request.status);
        try {
            console.log(request);
            try {
                //Server returns a general expection instead of a json, 
                // local computer works fine, return json
                var isPropertyText = (request.responseText || "") ? true : false;
                var isPropertyJson = (request.responseJSON || "") ? true : false;

                if (isPropertyJson) {
                    var jsonResponse = request.responseJSON.Message;
                    self.ErrorMessage(jsonResponse);
                    toastr.error(jsonResponse, "Server Error Error");
                    return;

                } else if (isPropertyText) {

                    var htmlinput = $($.parseHTML(request.responseText)).text();

                    console.log(htmlinput);
                    $('#errormessage').html(htmlinput);
                    self.ErrorMessage(htmlinput);
                    toastr.error(htmlinput, "Server Error Error");
                    return;

                } else {

                    self.ErrorMessage(request.responseText);
                    toastr.error(request.responseText, "Server Error Error");
                    return;
                }
            } catch (ex) {
                alert("error processing request");
            }
        } catch (err) {
            alert("failed to process request");
        }

    };



}


