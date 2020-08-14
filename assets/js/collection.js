(function(){
  $(document).on('change', '.filter-field-input', function () {
      $(this).closest('form').submit();
    });
  $('.js-open-filter').on('click', function () {
    alertify.panel({
      target: $('[data-modal="collection-filter"]').html(),
      position: 'left',
      onOpen: function (modal) {
        InSalesUI.Filter.create($(modal));
      }
    });
  });
        var pageType = getUrlVars()["page_size"];
        $('input#page_size_'+pageType).removeAttr('disabled').prev('a').addClass('active');

        $('.page_size a').click(function (e) {
          e.preventDefault();
          $('.page_size input').attr('disabled','disabled');
          $('.page_size a').removeClass('active');
          $(this).addClass('active');
          $(this).next('input').removeAttr('disabled');
          $(this).parents('form').submit();
        });
  
}())
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}