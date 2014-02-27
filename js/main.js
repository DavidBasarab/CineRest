var currentImageId = 0;

app = {
    initialize: function () {
        var self = this;
        self.changeImageTimer();
    },

    changeImageTimer: function () {

        window.setTimeout(function () {
            changeSourceImage();
        }, 100);
    }
}

app.initialize();

function changeSourceImage() {
    $('#testImage').attr('src', 'http://localhost/CineRest/Source/Image/' + currentImageId + '?' + new Date().getTime());
    currentImageId++;
    if(currentImageId > 5) currentImageId = 0;
    window.setTimeout(function () {
        changeSourceImage();
    }, 500);
}