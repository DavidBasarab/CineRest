
app = {
    initialize: function () {
        getWorkspaces();
    }
}

app.initialize();


function getServer() {
    return 'http://192.168.1.125/DBasarabCinRestService';
}

function getWorkspaces() {
    $.ajax({
        url: getServer() + '/Workspace',
        type: 'GET',
        success: function(data) {
            $('.main_content').html(JSON.stringify(data));
            //$('.workspaceSelect').change();
        },
        error: function(xhr) {
            alert('xhr.Status = ' + xhr.status);
        }
    });
}