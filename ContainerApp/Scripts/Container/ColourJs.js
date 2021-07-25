function ColourModel() {

    // Make the self as 'this' reference
    // Declare observable which will be bind with UI

    var self = this;
    self.BASE_URL = ko.observable("");
    self.ErrorMessage = ko.observable(null); 
    self.Colours = ko.observableArray([]);
    self.Colour = ko.observable(null);
    self.Name = ko.observable(null);
    self.ValidationPassed = ko.observable(false);
    self.ShowAddColour = ko.observable(false);
    self.Search = ko.observable(null);

    self.LoadList = function () {

        url = self.BASE_URL() + 'Colour/GetAll';
        $.ajax({
            url: url,
            cache: false,
            type: 'GET',
            data: {  },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                self.Colours($.parseJSON(data));
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

        url = self.BASE_URL() + 'Colour/Search';
        $.ajax({
            url: url,
            cache: false,
            type: 'GET',
            data: { find: val },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                self.Colours($.parseJSON(data));
                console.log($.parseJSON(data));
            },
            error: function (request, status, error) {
                self.OutputErrors(request, status, error);
            }
        });

    });
    self.ShowOrHideAddColour = function ()
    {
        self.ShowAddColour(!self.ShowAddColour());
        self.Name(null);
    }

self.ValidateData = function (model) {

    self.ValidationPassed(false);

    if (model.Name == null || model.Name.length == 0)
    {
        alert("Colour name can not be null");
        return;
    }

 
    self.ValidationPassed(true);

};

self.SaveColour = function () {
    self.ErrorMessage(null);
    var dataTopost =
    {
        Name: self.Name()
    }

    self.ValidateData(dataTopost);

    if (self.ValidationPassed() == false) { return;}
      

    $.ajax({
        url: self.BASE_URL() + 'Colour/Add',
        cache: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: ko.toJSON(dataTopost),
        success: function (data) {
            self.LoadList();    
            self.ShowOrHideAddColour();
            toastr.success("Colour saved successfully");
        },
        error: function (request, status, error) {
            self.OutputErrors(request, status, error);
        }
    });
};

 self.UpdateColour = function () {

    self.ValidateData(self.Colour());
  
    if (self.ValidationPassed() === false) {
        return false;
    }

    self.ErrorMessage(null);

    $.ajax({
        url: self.BASE_URL() + 'Colour/Update',
        cache: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: ko.toJSON(self.Colour()),
        success: function (data) {
            self.Colour(null);
            self.LoadList();          
            toastr.success("Colour updated successfully");
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


