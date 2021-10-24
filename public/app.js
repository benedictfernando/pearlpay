
$.ajaxSetup({
    beforeSend: function() {
        $('#loading').show();
    },

    complete: function() {
        $('#loading').fadeOut(1000);
    },

    error: function() {
        $('#loading').hide();
    }
});


$(function() {
    $('.people-tbl tbody tr').on('click', function() {
        var tr = $(this); var id = tr.data('id');
        $.ajax({
            url: '/contact/' + id,
            success: function(html) {
                $('#content').html(html);
            }
        });
    });
})
