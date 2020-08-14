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

if(typeof gets['mobile'] !== 'undefined'){
    window.onload = function () {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(function () {
            document.body.classList.add('loaded');
            document.body.classList.remove('loaded_hiding');
        }, 100);

        /* Скрываем блоки */
        $(".header-wrapper").remove();
        $(".footer-wrapper").remove();
        $(".top-panel-wrapper.hidden-xs").remove();
        $(".lnk_back_cart").remove();
        $(".co-social_login-box").remove();
        $(".co-checkout-block .co-client").remove();

        var timerId = setInterval(() =>  $("#jivo-iframe-container").remove(), 10);
        setTimeout(() => { clearInterval(timerId); }, 3000);

        $(".checkout2_wrapper").css({
            "margin-top": "0px"
        });

        $(".co-input-field.js-input-field").css({
            'padding': '9px 11px'
        });

        $("#check_create").css({
            'background': '#e32619',
            'padding-top': '0.7rem',
            'padding-bottom': '0.7rem'
        });

        $(".co-delivery_method.co-input-wrapper.co-toggable_field.co-toggable_field--bordered").css({
            'padding': '0.1rem 0'
        });

        $(".co-payment_method.co-input-wrapper.co-toggable_field.co-toggable_field--bordered").css({
            'padding': '0.1rem 0'
        });

        $(".co-toggable_field-information.co-delivery_method-information").css({
            'flex': '1 1 150px'
        });

        $(".co-payment_method-information.co-toggable_field-information").css({
            'flex': '1 1 150px'
        });

        $(".timers-link a").css({
            'font-size': '15px'
        });

        $(".co-toggable_field-input input:checked span").css({
            'box-shadow': 'inset 0 0 0 7px #fa4324'
        });
    }
}else{
    window.onload = function () {
        document.body.classList.add('loaded_hiding');
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }
}