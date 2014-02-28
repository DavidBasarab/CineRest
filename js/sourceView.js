sourceView = {
    initialize: function () {
        $.ajax({
            url: 'http://192.168.1.58/CineRest/Sources',
            type: 'GET',
            success: onSourcesReceived
        });
    }
}

function onSourcesReceived(sources) {
    var $mainList = $('#sourceList');
    $.each(sources, function (index, currentSource) {
        var newListItem = $('<li class="dragMe"><div id="source' + currentSource.SourceId + '" class="source"><img src="http://192.168.1.58/CineRest/Source/' + currentSource.SourceId + '/Image"/><span>' + currentSource.Name + '</span></div></li>');
        $mainList.append(newListItem);
    })

    $('.dragMe').draggable({
        revert: true,
        stack: '.dragMe',
        cursor: 'move'
    });

    refreshImages();
}

function refreshImages() {
    var images = $.find('img');

    $.each(images, function (index, currentImage) {
        var imageSource = $(currentImage).attr('src').split('?')[0];
        $(currentImage).attr('src', imageSource + '?' + new Date().getTime());
    });
    window.setTimeout(function () {
        refreshImages();
    }, 500);
}

/*

 <li class="dragMe">
 <div id="source1" class="source">
 <img src="http://192.168.1.58/CineRest/Source/Image/0"/>
 <span>Source 1</span>
 </div>
 </li>
 <li  class="dragMe">
 <div id="source2" class="source">
 <img src="http://192.168.1.58/CineRest/Source/Image/1"/>
 <span>Source 2</span>
 </div>
 </li>
 <li class="dragMe">
 <div id="source3" class="source">
 <img src="http://192.168.1.58/CineRest/Source/Image/2"/>
 <span>Source 3</span>
 </div>
 </li>
 <li class="dragMe">
 <div id="source4" class="source">
 <img src="http://192.168.1.58/CineRest/Source/Image/3"/>
 Source 4
 </div>
 </li>



 */

