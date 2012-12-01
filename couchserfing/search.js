$('#search').submit(function(e) {
    e.preventDefault();
    var action = $(this).attr('action');
    $.ajax(action).success(function(data, textStatus, jqXHR) {
        console.log(data, textStatus, jqXHR);
    }).fail(function() {
        console.error('Oops')
    });
});
