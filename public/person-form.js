modules['person-form-js'] = function(html) {
    
    var form = html.find('.person-form');
    var eatbl = form.find('.ea-tbl');
    var patbl = form.find('.pa-tbl');

    function removeAtr(btn) {
        btn = $(btn);
        var tr = btn.closest('tr');
        tr.remove();
    };

    eatbl.find('.ea-btn-add').on('click', function() {
        var _html =
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

        _html = $(_html); eatbl.find('tbody').append(_html);
        _html.find('.ea-btn-remove').on('click', function() {
            removeAtr(this);
        });
    });

    eatbl.find('.ea-btn-remove').on('click', function() {
        removeAtr(this);
    });

    patbl.find('.pa-btn-add').on('click', function() {
        var idx = patbl.find('tr').length;
        var _html =
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

        _html = $(_html); patbl.find('tbody').append(_html);
        _html.find('.pa-btn-remove').on('click', function() {
            removeAtr(this);
        });
    });

    patbl.find('.pa-btn-remove').on('click', function() {
        removeAtr(this);
    });

    form.on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        app.ajax({
            url: '/contact',
            type: 'POST',
            data: form.serializeToJSON({ associativeArrays: true }),
            success: function() {
                form.find('#msg').show().delay(3000).fadeOut();
            }
        });
    });
}