var currentImageId = 0;

app = {
    initialize: function () {
        var self = this;
        startTouchHandler();
        $('.dragMe').draggable({
            revert: true,
            stack: '.dragMe',
            cursor: 'move'
        });

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

    var sourceId = sourceDiv.attr('id').replace('source', '') - 1;


    $('<div class="populatedPanel"><img src="http://192.168.1.58/CineRest/Source/Image/' + sourceId + '" style="width: 100%; height: 100%;"/></div>')
        .appendTo(panel);
}

function startTouchHandler() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}
function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch (event.type) {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0/*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}