
$.ajaxSetup({
    beforeSend: function() {
        $('#loading').show();
    },

    complete: function() {
        $('#loading').fadeOut(1000);
    },

    error: function(xhr) {
        $('#loading').hide(); var { responseJSON } = xhr;
        var { message } = responseJSON; alert(message);
    }
});

// sir nap's js-modules functionality
var modules = {}
var app = (function () {
    function bindScripts(html) {
        var scriptAttr = html.parent().find('[js-modules]');
        if (!scriptAttr[0]) return;

        for (var item of scriptAttr) {
            item = $(item); var scriptName = item.attr('js-modules');
            item.removeAttr('js-modules');

            // if (!scriptName) throw 'scriptname is empty';
            if (scriptName) {
                for (var name of scriptName.split(' ')) {
                    var target = modules[name];
                    if (!target) return; target(item);
                }
            }
        }
    } return {
        ajax: function (options) {
            if (options.success) {
                var success = options.success;
                options.success = function (response, textStatus, xhr) {
                    var ishtml = /<\/?[a-z][\s\S]*>/i.test(response);
                    if (ishtml) { response = $(response) };
                    success(response, textStatus, xhr)
                    if (ishtml) { bindScripts(response) }
                }
            } $.ajax(options)
        }
    }
})()

$(function() {
    $('.people-tbl tbody tr').on('click', function() {
        var tr = $(this); var id = tr.data('id');
        location.hash = '/contact/' + id;
    });

    $('.people-tbl tbody tr .p-btn-remove').on('click', function() {
        var btn = $(this);
        var tr = btn.closest('tr');
        var id = tr.data('id');
        var firstname = tr.find('td:nth(1)').html();
        var lastname = tr.find('td:nth(2)').html();

        if (confirm(`Do you wish to continue deleting ${firstname} ${lastname}?`)) {
            app.ajax({
                url: '/contact/' + id,
                type: 'DELETE',
                success: function() {
                    tr.remove();
                    $('#content').empty();
                }
            });
        }
        // prevent event bubbling
        return false;
    });

    $('.people-tbl thead tr .p-btn-add').on('click', function() {
        app.ajax({
            url: '/contact/new',
            success: function(html) {
                $('#content').html(html);
            }
        });
    });

    window.onhashchange = function() {
        if (!!location.hash.replace(/#/g, '')) {
            app.ajax({
                url: location.hash.replace(/#/g, ''),
                success: function(html) {
                    $('#content').html(html);
                }
            });
        }
    }; $(window).trigger('hashchange');
})
