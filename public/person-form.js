$(function() {

    var eatbl = $('.person-form .ea-tbl tbody');
    var patbl = $('.person-form .pa-tbl tbody');

    function removeAtr(btn) {
        btn = $(btn);
        var tr = btn.closest('tr');
        tr.remove();
    };

    $('.person-form .ea-tbl .ea-btn-add').on('click', function() {
        var html =
        `
            <tr>
                <td>
                    <a href="javascript:" class="ui button icon ea-btn-remove">
                        <i class="icon close"></i>
                    </a>
                </td>
                <td class="field">
                    <input type="text" name="emailaddresses" value>
                </td>
            </tr>
        `;

        html = $(html); eatbl.append(html);
        html.find('.ea-btn-remove').on('click', function() {
            removeAtr(this);
        });
    });

    $('.person-form .ea-btn-remove').on('click', function() {
        removeAtr(this);
    });

    $('.person-form .pa-tbl .pa-btn-add').on('click', function() {
        var idx = patbl.find('tr').length;
        var html =
        `
            <tr>
                <td>
                    <a href="javascript:" class="ui button icon pa-btn-remove">
                        <i class="icon close"></i>
                    </a>
                </td>
                <td class="field">
                    <input type="hidden" name="postaladdresses[${idx}].id">
                    <input type="text" name="postaladdresses[${idx}].street">
                </td>
                <td class="field">
                    <input type="text" name="postaladdresses[${idx}].city">
                </td>
                <td class="field">
                    <input type="text" name="postaladdresses[${idx}].zipcode">
                </td>
            </tr>
        `;

        html = $(html); patbl.append(html);
        html.find('.pa-btn-remove').on('click', function() {
            removeAtr(this);
        });
    });

    $('.person-form .pa-tbl .pa-btn-remove').on('click', function() {
        removeAtr(this);
    });

    $('.person-form').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        $.ajax({
            url: '/contact',
            type: 'POST',
            data: form.serializeToJSON({ associativeArrays: true }),
            success: function() {
                form.find('#msg').show().delay(3000).fadeOut();
            }
        });
    });
});