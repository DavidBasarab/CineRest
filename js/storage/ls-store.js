var LocalStorageStore = function (successCallback, errorCallback) {

    this.getSavedData = function () {
        return JSON.parse(window.localStorage.getItem("savedData"));
    }

    this.storeData = function (theData) {
        window.localStorage.setItem("savedData", JSON.stringify(theData));
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function (callback, data) {
        if (callback) {
            setTimeout(function () {
                callback(data);
            });
        }
    }

    this.initialize = function () {
        var theData = this.getSavedData();

        if (!theData) {
            var savedData = {
                "carPrice": 25000,
                "tradeInPrice": 7000,
                "tradeInAmount": 5000
            };

            this.storeData(savedData);
        }

        callLater(successCallback);
    }

    this.initialize();
}