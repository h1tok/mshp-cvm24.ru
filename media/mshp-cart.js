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

if(typeof gets['mobile'] !== 'undefined') {
    /* Удаляем из корзины */
    ajaxAPI.cart.remove(76267453).done(function (onDone) {

        /!* Добавляем в корзину *!/
        ajaxAPI.cart.add({
            76267453: 1
        }).done(function (onDone) {
            window.location.href = "http://shop-55201.myinsales.ru/new_order?mobile=Y";
        });
    });
}else{
    window.onload = function () {
        document.body.classList.add('loaded_hiding');
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }
}