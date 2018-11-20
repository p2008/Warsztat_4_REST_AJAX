$(function () {
    var startUrl = 'http://localhost:8000/book/';

    ajax(startUrl, 'get', {});
    onClickDetails(startUrl);
    onSubmit(startUrl);
    onDelete(startUrl);

    function books(result){
        var headers = Object.keys(result[0]);
        var theScriptHtml =$('#table_books').html();
        var theTemplate = Handlebars.compile(theScriptHtml);
        var contexObj = {'headers': headers, 'data': result};
        var compileData = theTemplate(contexObj);
        $('#books').append(compileData);
    }

    function onClickDetails(url){
        $('#books').on('click', '.info',function () {
            var id = $(this).parent().attr('id');
            var that = $(this).parent().next();

            ajax(url+id, 'get', {}, true, false, true, that);

            if(that.css('display') === 'none'){
                that.css('display', 'table-row');
            }
            else{
                that.css('display', 'none');
            }
        });
    }

    function onDelete(url){
        $('#books').on('click', '.del',function () {
            var id = $(this).parent().attr('id');
            var that = $('#'+id);
            console.log(that);

            var data = {
                'id': $('.tbody .tr').length + 1,
                'author': $('#author').val(),
                'title': $('#title').val(),
                'isbn': $('#isbn').val(),
                'publisher': $('#publisher').val(),
                'genre': $('#genre').val()
            };

            that.next().remove();
            ajax(url+id, 'delete', data, true, true);
        });
    }

    function onSubmit(url){
        console.log('submit');
        $('form').on('submit',function (e) {
            e.preventDefault();
            var data = {
                'id': $('.tbody .tr').length + 1,
                'author': $('#author').val(),
                'title': $('#title').val(),
                'isbn': $('#isbn').val(),
                'publisher': $('#publisher').val(),
                'genre': $('#genre').val()
            };

            ajax(url, 'post', data, true, true);
        });
    }

    // function ajax(url, type, data, notBooks) {
    function ajax(url, type, data, notBooks, ajaxRefresh, click, clicked) {
        $.ajax({
            url: url, //'http://localhost:8000/book/',
            //url: "https://swapi.co/api/people/",
            data: data, //{},
            type: type, //'get',
            dataType: "json"
        }).done(function (result) {
            if(!notBooks) {
                books(result);
            }

            if(ajaxRefresh){
                $('#books').html('');
                ajax(startUrl, 'get', {});
            }

            if(click){
                if(!clicked.hasClass('info')) {
                    let theScriptHtml = $('#book_details').html();
                    let theTemplate = Handlebars.compile(theScriptHtml);
                    let contexObj = {'data': result};
                    let compileData = theTemplate(contexObj);
                    clicked.append(compileData);
                    clicked.addClass('info');
                }
            }
            console.log('ajax')
        // END OF DONE
        }).fail(function (xhr, status, err) {
            // console.log(xhr);
            // console.log(status);
            // console.log(err);
            // $("#name").text("Sprzątamy po błędach");
        }).always(function (xhr, status) {
            // console.log(xhr);
            // console.log(status);
        });
    }
});