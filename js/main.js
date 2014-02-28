var currentImageId = 0;

app = {
    initialize: function () {

        startTouchHandler();

        sourceView.initialize();



        $('.panel').droppable({
            hoverClass: '.panel.hovered',
            drop: handlePanelDrop
        });
    },

    changeImageTimer: function () {

//        window.setTimeout(function () {
//            changeSourceImage();
//        }, 100);
    }
}

app.initialize();

function changeSourceImage() {
    $('#testImage').attr('src', 'http://192.168.1.58/CineRest/Source/Image/' + currentImageId + '?' + new Date().getTime());
    currentImageId++;
    if (currentImageId > 5) currentImageId = 0;
    window.setTimeout(function () {
        changeSourceImage();
    }, 500);
}

function handlePanelDrop(event, ui) {
    var panel = $(this);

    panel.html('');

    var sourceDiv = (ui.draggable).find('.source');

    var sourceId = sourceDiv.attr('id').replace('source', '');

    $('<div class="populatedPanel"><img src="http://192.168.1.58/CineRest/Source/' + sourceId + '/Image" style="width: 100%; height: 100%;"/></div>')
        .appendTo(panel);
}

