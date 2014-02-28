var panelWidth = 1920;
var panelHeight = 1200;
var wallWindows = new Array();

panelView = {
    initialize: function () {

        $('#clearAllWindows').click(onClearWindowClick);

        $('.panel').droppable({
            hoverClass: '.panel.hovered',
            drop: handlePanelDrop
        });

        monitorPanels();
    }
}

function monitorPanels() {
    $.ajax({
        url: 'http://192.168.1.58/CineRest/Wall/Windows',
        type: 'GET',
        success: function (result) {
            onGetAllWindowsComplete(JSON.parse(result))
        }
    });

}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
        if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false;
    }
    return true;
}

var previousWindowsResult = null;

function onGetAllWindowsComplete(windows) {
    if (windows == null || windows.length == 0) {
        clearAllWindows();
    }

    if (previousWindowsResult == null) {
        previousWindowsResult = windows;
    } else if (arraysEqual(previousWindowsResult, windows)) {

        window.setTimeout(monitorPanels, 500);

        return;
    }

    previousWindowsResult = windows;

    clearAllWindows();

    $.each(windows, function (index, currentWindow) {
        var sourceId = currentWindow.SourceId;
        var xPosition = currentWindow.X;

        var $panel = null;

        if (xPosition >= getXCoordinate(0) && xPosition < getXCoordinate(1)) {
            $panel = $('#panel1');
        } else if (xPosition >= getXCoordinate(1) && xPosition < getXCoordinate(2)) {
            $panel = $('#panel2');
        } else {
            $panel = $('#panel3');
        }

        $panel.html('');

        onWindowCreated(sourceId, $panel, currentWindow);
    });

    window.setTimeout(monitorPanels, 2000);
}

function onClearWindowClick() {
    $.ajax({
        url: 'http://192.168.1.58/CineRest/Wall/Windows',
        type: 'DELETE',
        success: clearAllWindows
    });
}

function clearAllWindows() {
    var panels = $('.panel');

    $.each(panels, function (index, currentPanel) {
        $(currentPanel).html('');
    });
}

function handlePanelDrop(event, ui) {
    var $panel = $(this);

    $panel.html('');

    if ($(ui.draggable).hasClass('populatedPanel') == true) {
        processDropFromPanel($panel, ui);
    }
    else {
        processDropFromSource($panel, ui);
    }
}

function processDropFromPanel($panel, ui) {

    var panelNumber = $panel.attr('id').replace('panel', '') - 1;

    var wallWindow = ui.draggable;

    var handleId = $(wallWindow).attr('id').replace('panel_source', '');

    $panel.append(wallWindow);

    var windowData = wallWindows[handleId];

    windowData.X = getXCoordinate(panelNumber);

    $panel.html('');

    onWindowCreated(windowData.SourceId, $panel, windowData);

    $.ajax({
        url: 'http://192.168.1.58/CineRest/Wall/Window',
        type: 'PUT',
        data: JSON.stringify(windowData)
    });
}

function getXCoordinate(panelNumber) {
    return (panelWidth * panelNumber) + (panelNumber * 1);
}
function processDropFromSource($panel, ui) {

    var panelNumber = $panel.attr('id').replace('panel', '') - 1;

    var sourceDiv = (ui.draggable).find('.source');

    var sourceId = sourceDiv.attr('id').replace('source', '');

    var createWindow = new Object();

    createWindow.SourceId = sourceId;
    createWindow.X = getXCoordinate(panelNumber);
    createWindow.Y = 0;
    createWindow.Width = panelWidth;
    createWindow.Height = panelHeight;

    $.ajax({
        url: 'http://192.168.1.58/CineRest/Wall/Window',
        type: 'POST',
        data: JSON.stringify(createWindow),
        success: function (result) {
            onWindowCreated(sourceId, $panel, JSON.parse(result));
        }
    });
}

function onWindowCreated(sourceId, panel, result) {
    var newElement = $('<div id="panel_source' + result.Handle + '" class="populatedPanel"><img src="http://192.168.1.58/CineRest/Source/' + sourceId + '/Image" style="width: 100%; height: 100%;"/></div>');

    $(newElement).appendTo(panel);

    $(newElement).data(result);

    $('.populatedPanel').draggable({
        revert: false,
        stack: '.populatedPanel',
        cursor: 'move',
        snap: '.panel'
    });

    wallWindows[result.Handle] = result;

}

