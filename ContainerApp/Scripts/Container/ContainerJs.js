function ContainerModel() {

    // Make the self as 'this' reference
    // Declare observable which will be bind with UI

    var self = this;
    self.BASE_URL = ko.observable("");
    self.ErrorMessage = ko.observable(null);
    self.Containers = ko.observableArray([]);
    self.Types = ko.observableArray([]);
    self.Colours = ko.observableArray([]);
    self.Container = ko.observable(null);
    self.ShowAddContainer = ko.observable(false);
    self.Search = ko.observable(null);
    self.Name = ko.observable(null);
    self.ColourId = ko.observable(null);
    self.TypeId = ko.observable(null);
    self.ValidationPassed = ko.observable(false);
    self.initializeLookUp = function () {

        url = self.BASE_URL() + 'Container/GetLookupData';
        $.ajax({
            url: url,
            cache: false,
            data: {},
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
               var result = $.parseJSON(data);
               self.Colours(result.Colours);
               self.Types(result.Types);
    },
        error: function (request, status, error) {
            self.OutputErrors(request, status, error);
        }
});

    };
    self.LoadList = function () {

        url = self.BASE_URL() + 'Container/GetAll';
        $.ajax({
            url: url,
            cache: false,
            type: 'GET',
            data: {  },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                self.Containers($.parseJSON(data));
                console.log($.parseJSON(data));
            },
            error: function (request, status, error) {
                self.OutputErrors(request, status, error);
            }
        });

    };

    self.Search.subscribe(function (val) {
        if (val == null || val == '')
        {
            self.LoadList();
            return;
        }

            url = self.BASE_URL() + 'Container/Search';
            $.ajax({
                url: url,
                cache: false,
                type: 'GET',
                data: { find: val },
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    self.Containers($.parseJSON(data));
                    console.log($.parseJSON(data));
                },
                error: function (request, status, error) {
                    self.OutputErrors(request, status, error);
                }
            });
               
    });
    
    
    self.ShowOrHideAddContainer = function ()
    {
        self.ShowAddContainer(!self.ShowAddContainer());
        self.Name(null);
        self.ColourId(null);
        self.TypeId(null);
    }


self.GotoMainPage = function () {

    $.ajax({
        url: self.BASE_URL() + 'Home/HomeView?NCircID=' + self.NCircID() + '&SupplierID=' + self.SupplierID(),
        cache: false,
        type: 'GET',
        success: function (data) {
            $('#PageContentArea').html(data);

        }, error: function (request, status, error) {
            self.OutputErrors(request, status, error);
        }
    });

};

self.ValidateData = function (model) {

    self.ValidationPassed(false);

    if (model.Name == null || model.Name.length == 0)
    {
        alert("Container name can not be null");
        return;
    }

    if (model.ColourId == null)
    {
        alert("Please select colour");
        return;
    }

    if (model.TypeId == null) {
        alert("Please select Type");
        return;
    }


    self.ValidationPassed(true);

};

self.SaveContainer = function () {
    self.ErrorMessage(null);
    var dataTopost =
    {
        Name: self.Name(),
        ColourId: self.ColourId(),
        TypeId: self.TypeId()
    }

    self.ValidateData(dataTopost);

    if (self.ValidationPassed() == false) { return;}

   

    $.ajax({
        url: self.BASE_URL() + 'Container/Add',
        cache: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: ko.toJSON(dataTopost),
        success: function (data) {
            self.LoadList();    
            self.ShowOrHideAddContainer();
            toastr.success("Container saved successfully");
        },
        error: function (request, status, error) {
            self.OutputErrors(request, status, error);
        }
    });
};


    self.Delete = function (model)
    {
        self.ErrorMessage(null);

        if (confirm('Are you sure to Delete "' + model.Name + '"  Container ??')) {

            $.ajax({
                url: self.BASE_URL() + 'Container/Delete',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON({Id: model.Id}),
                success: function (data) {
                    self.LoadList();
                    toastr.success("Container deleted successfully");
                },
                error: function (request, status, error) {
                    self.OutputErrors(request, status, error);
                }
            });

            return;

        }

    }
     

    self.UpdateContainer = function () {

    self.ValidateData(self.Container());
  
    if (self.ValidationPassed() === false) {
        return false;
    }

    self.ErrorMessage(null);

    $.ajax({
        url: self.BASE_URL() + 'Container/Update',
        cache: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: ko.toJSON(self.Container()),
        success: function (data) {
            self.Container(null);
            self.LoadList();          
            toastr.success("Container updated successfully");
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


