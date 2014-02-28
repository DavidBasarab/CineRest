var panelWidth = 1920;
var panelHeight = 1080;

panelView = {
    initialize: function () {

        $('#clearAllWindows').click(onClearWindowClick);

        $('.panel').droppable({
            hoverClass: '.panel.hovered',
            drop: handlePanelDrop
        });
    }
}

function onClearWindowClick() {
    $.ajax({
        url: 'http://192.168.1.58/CineRest/Wall/Windows',
        type: 'DELETE',
        success: onWindowsClear
    });
}

function onWindowsClear() {
    var panels = $('.panel');

    $.each(panels, function(index, currentPanel) {
       $(currentPanel).html('');
    });
}

function handlePanelDrop(event, ui) {
    var $panel = $(this);

    $panel.html('');

    var panelNumber = $panel.attr('id').replace('panel', '') - 1;

//    var sourceDiv = (ui.draggable).find('.source');
    var sourceDiv = (ui.draggable);

    var sourceId = sourceDiv.attr('id').replace('source', '');

    var createWindow = new Object();

    createWindow.SourceId = sourceId;
    createWindow.X = (panelWidth * panelNumber) + (panelNumber * 1);
    createWindow.Y = 0;
    createWindow.Width = panelWidth;
    createWindow.Height = panelHeight;

    $.ajax({
        url: 'http://192.168.1.58/CineRest/Wall/Window',
        type: 'POST',
        data: JSON.stringify(createWindow),
        success: function() {
            onWindowCreated(sourceId, $panel);
        }
    });


}

function onWindowCreated(sourceId, panel) {
    $('<div class="populatedPanel"><img src="http://192.168.1.58/CineRest/Source/' + sourceId + '/Image" style="width: 100%; height: 100%;"/></div>')
        .appendTo(panel);
}

