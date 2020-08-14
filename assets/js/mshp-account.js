var gets = (function() {
    var a = window.location.search;
    var b = new Object();
    a = a.substring(1).split("&");
    for (var i = 0; i < a.length; i++) {
        c = a[i].split("=");
        b[c[0]] = c[1];
    }
    return b;
})();

var uploadOn = (function (){
    window.onload = function () {
        document.body.classList.add('loaded_hiding');
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }
})();

if(typeof gets['mobile'] !== 'undefined') {
    window.onload = function () {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(function () {
            document.body.classList.add('loaded');
            document.body.classList.remove('loaded_hiding');
        }, 100);

        /* Удаляем блоки */
        $(".header-wrapper").remove();
        $(".footer-wrapper").remove();
        $(".top-panel-wrapper.hidden-xs").remove();
        $(".co-login.co-login--social_login.co-checkout-block--padded").remove();
        $("a").remove();

        var timerId = setInterval(() =>  $("#jivo-iframe-container").remove(), 10);
        setTimeout(() => { clearInterval(timerId); }, 3000);

        $('.co-input-field.js-input-field').css({
            'padding': '9px 11px'
        });

        $('.co-checkout-title.co-title.co-title--h1').css({
            'text-align': 'center',
        });

        $('.co-login').css({
            'flex': '1 1 100%',
        });

        $('.co-section--content_wrapper .co-section--content').css({
            'align-items': 'center',
            'justify-content': 'center'
        })

        var url = window.location.href;
        var a = document.referrer;

        if(url.indexOf('client_account/login?mobile=Y') !== -1) {

            $('<a href="/client_account/contacts/new?mobile=Y" type="button" class="mshp-registration">Регистрация</a>').insertAfter(".co-button.co-form-button.js-co-login-submit");
            $('<a href="/client_account/password/change?mobile=Y" class="mshp-forgotten">Забыли пароль?</a>').insertAfter(".mshp-registration");

            $('.co-button.co-form-button.js-co-login-submit').text('Вход');

            $('.co-button.co-form-button.js-co-login-submit').css({
                'background': '#fa4324',
                'width': '45%',
                'border-radius': '4px',
                'padding-top': '0.6rem',
                'padding-bottom': '0.6rem'
            });

        }else if(url.indexOf('client_account/password/change?mobile=Y') !== -1){
            $('.co-button.co-form-button.js-co-login-submit').css({
                'background': '#fa4324',
                'padding-top': '0.6rem',
                'padding-bottom': '0.6rem',
                'border-radius': '4px'
            });
        }else if(url.indexOf('client_account/contacts/new?mobile=Y') !== -1){
            $('#client_language_id').closest('.co-input.co-input--select.co-input--language.co-input--nested').css('display', 'none');

            $('.co-button.co-form-button.js-co-login-submit').text('Зарегистрироваться');

            $('.co-input-description').css('color', '#fa4324');

            $('.co-button.co-form-button.js-co-login-submit').css({
                'background': '#fa4324',
                'padding-top': '0.6rem',
                'padding-bottom': '0.6rem',
                'border-radius': '4px'
            });
        }else if(url.indexOf('client_account/orders?mobile=Y') !== -1){
            $(".co-sidebar--menu").remove();

            var elements = document.getElementsByClassName('co-table-cell co-table-cell--body');

            if (elements.length > 0) {
                var html_orders = '<div class="co-checkout-block--padded"><div class="mshp-orders-table-top">';
                html_orders += '    <div class="mshp-orders-table-top-one">Номер и дата заказа</div>';
                html_orders += '    <div class="mshp-orders-table-top-two">Цена</div>';
                html_orders += '</div></div>';

                for (var i = 0; i < elements.length; i++) {
                    if(elements[i].getAttribute('data-title') == 'Дата оформления'){
                        //html_orders += '<div class="mshp-table-row">';
                        //html_orders += '<div class="mshp-table-row-one"><b>';
                        //html_orders += elements[i].innerHTML;
                        //html_orders += '</b></div></div>';
                    }

                    if(elements[i].getAttribute('data-title') == 'Номер заказа'){
                        //html_orders += ' № ' + elements[i].innerHTML + '</b></div></div>';
                    }


                    console.log(elements[i].getAttribute('data-title'));
                    console.log(elements[i].innerHTML);
                }

                console.log(elements);

                $(".co-section--content").append(html_orders);

                $(".co-table.co-table--to_card").closest(".co-checkout-block--padded").remove();
            }
        }

        if (a != '') {

            if(typeof gets['error'] !== 'undefined') {
                var error = decodeURIComponent(gets["error"]);

                if(error == 'Подтвердите, что вы не робот'){
                    html = '<script src="https://www.google.com/recaptcha/api.js?hl=ru" async="async" defer="defer"></script>';
                    html += '<div class="co-input co-input--text co-input--captcha">';
                    html += '  	<div class="g-recaptcha" data-callback="onReCaptchaSuccess" data-sitekey="6Lc0T0YUAAAAAAVNiH-_bnSC4E-YHMFTeYOqZyRx"></div>';
                    html += '</div>';

                    $(html).insertBefore('.co-form-controls');

                }
                $('<div class="co-notice--danger co-notice--flash">' + error + '</div>').insertBefore( ".co-login-form_placeholder.co-checkout-block--padded" );
            }
        }
    }
}else{
    // Проверяем редирект неверных данных
    var url = window.location.href;
    var a = document.referrer;

    if (a != '') {
        if(url.indexOf('client_account/session') !== -1){
            var url_history = 'client_account/login?mobile=Y';

            if(a.indexOf(url_history) !== -1){
                if($('.co-notice--danger.co-notice--flash').text() == 'Подтвердите, что вы не робот'){
                    window.location.href = "/client_account/login?mobile=Y&error=Подтвердите, что вы не робот";
                }else if($('.co-notice--danger.co-notice--flash').text() == 'Сочетание логина и пароля не подходит'){
                    window.location.href = "/client_account/login?mobile=Y&error=Сочетание логина и пароля не подходит";
                }
            }else{
                uploadOn();
            }

        }else if(url.indexOf('client_account/password/change') !== -1){
            var url_history = 'client_account/password/change?mobile=Y';

            if(a.indexOf(url_history) !== -1) {
                if ($('.co-notice--danger.co-notice--flash').text() == 'Неправильный e-mail') {
                    window.location.href = "/client_account/password/change?mobile=Y&error=Неправильный e-mail";
                }
            }else{
                uploadOn();
            }
        }else if(url.indexOf('client_account/orders') !== -1){
            var url_history = 'client_account/login?mobile=Y';

            if(a.indexOf(url_history) !== -1) {
                window.location.href = "/client_account/orders?mobile=Y";
            }else{
                uploadOn();
            }
        }else if(url.indexOf('client_account/contacts') !== -1){

        }else{
            uploadOn();
        }
    }else{
        uploadOn();
    }
}