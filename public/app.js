
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
