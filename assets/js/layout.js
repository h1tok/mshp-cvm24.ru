(function () {
    $.fn.equivalent = function (){
        var $blocks = $(this),
            maxH    = $blocks.eq(0).height(); 

        $blocks.each(function(){
            maxH = ( $(this).height() > maxH ) ? $(this).height() : maxH;
        });
        $blocks.css('min-height', maxH); 
    }
    setTimeout(function(){
    	$('.product-slider').each(function(){
          $(this).find('.product-title').equivalent(); 
        }); 
    },1000);
  if($(window).width() > 1024) {
	var prodSwaps = [];
      $('.product-card').each(function (i) {
        prodSwaps[i] = $(this).parents('.product-card-wrapper').height();
        $(this).hover(function() {
          $(this).height(prodSwaps[i] + $(this).find('.product-cart-control').height() * 0.5);
          $(this).parent().height(prodSwaps[i]);
        }, function () {
          $(this).height('auto').parent().height('auto');
        });
      }); 
    setTimeout(function(){
      $('.product-card').each(function (i) {
        prodSwaps[i] = $(this).parents('.product-card-wrapper').height();
        $(this).hover(function() {
          $(this).height(prodSwaps[i] + $(this).find('.product-cart-control').height() * 0.5);
          $(this).parent().height(prodSwaps[i]);
        }, function () {
          $(this).height('auto').parent().height('auto');
        });
      }); 
    },1500);
  } else {
  	$('.menu_title').on('click', function () {
      	$(this).toggleClass('current').next().toggle();
    });
  }
  $(document).on("click", '#addtocart .ajs-close', function(event) {
    event.preventDefault();
  		$('.alertify .ajs-close').click();
  });
  $('.products_list').on('click', function () {
  	$('#grid').hide();
    $('#list').show();
    $('.grid_list a').removeClass('active');
    $(this).addClass('active');
  });
  $('.products_list').on('click', function () {
  	$('#grid').hide();
    $('#list').show();
    $('.grid_list a').removeClass('active');
    $(this).addClass('active');
  });
  $('.langs>a, .langs>button').on('click', function () {
    $('.langs ul').toggle();
    if($(".langs ul").is(':visible')) {
      $(document).mouseup(function (e){
        var div = $(".langs");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
          div.find('ul').hide();
        }
      });
    }
  });
  
  $('.js-open-sidebar').on('click', function () {
    alertify.panel({
      target: $('[data-modal="mobile-sidebar"]').html(),
      position: 'left',
      onOpen: function (modal) {
        var $sidebarBlocks = $(modal).find('.sidebar-block-content');

        $sidebarBlocks.each(function () {
          var $menu = $(this).find('.mobile-sidebar-menu').first();

          InSalesUI.Menu.create($menu);
        });
        $('.sidebar-close').on('click', function () {
           alertify.closeAll(); 
        });
        $('.langs>a, .langs>button').on('click', function () {
          $('.langs ul').toggle();
          if($(".langs ul").is(':visible')) {
            $(document).mouseup(function (e){
              var div = $(".langs");
              if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.find('ul').hide();
              }
            });
          }
        });        
      }
    });
  });
  $('.js-open-contacts').on('click',function(){
    $('.contacts-top-menu-block').removeClass('hidden');
    $(this).addClass('is-active');
    // console.log('Открывается!');
  });
  $('.sidebar-menu-marker').on('click',function(){
     $(this).toggleClass('is-opened').closest('li').children('ul').toggleClass('open');
  })
  $(document).on('click touchstart',function(elem){
    var contacts_top = $(elem.target).closest('.contacts-top-menu-block').length;
    var js_open_contacts = $(elem.target).closest('.js-open-contacts').length;
    if (!contacts_top && !js_open_contacts){
        $('.contacts-top-menu-block').addClass('hidden');
        $(".js-open-contacts").removeClass('is-active');
          // console.log('Закрывается!');
    }
  });

/**
 * QUICK_VIEW
 */
$(document).ready(function() {
  $(document).on("click", "[data-quick-view]", function(event) {
    event.preventDefault();
    var _id = $(this).data("quick-view");
    Products.get(_id).done(function(product) { 
      console.log('product', product);
      $(".js-quick_view").html(
        templateLodashRender(convertProperties(product), "quick_view")
      );
      $('.quick_view_releated').load(product.url + ' #related_products');
      $('.quick_view_similar').load(product.url + ' #similar_products');
      setTimeout(function(){
        var _productSliderOptions ={
          slidesPerView: 3,
          spaceBetween: 16,
          breakpoints: {
            380: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 2,
            },
          }
        };

        var SimillarSwiper =  new Swiper ('[data-slider="similar-products"]', _productSliderOptions);
        var RelatedSwiper = new Swiper ('[data-slider="related-products"]', _productSliderOptions);
        $('.js-quick_view a[data-quick-view]').hide();
        $('.product-card').each(function (i) {
          prodSwaps[i] = $(this).parents('.product-card-wrapper').height();
          $(this).hover(function() {
            $(this).height(prodSwaps[i] + $(this).find('.product-cart-control').height() * 0.5);
            $(this).parent().height(prodSwaps[i]);
          }, function () {
            $(this).height('auto').parent().height('auto');
          });
        });        
      },1500);
      
      Products.initInstance($(".js-quick_view [data-product-id]"));
  var _galleryThumbs = {
    slidesPerView: 6,
    spaceBetween: 16,
    autoHeight: true,
    lazyLoading: true,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      }
    }
  };
  if ($('.quick_view [data-slider="gallery-thumbs"]').length ){
    var MainSwiper =  new Swiper ('.quick_view [data-slider="gallery-thumbs"]', _galleryThumbs);
  }
  EventBus.subscribe('update_variant:insales:product', function (variant) {
    if (!variant.first_image.from_variant) {
      return;
    }
    if (variant.action.quantityState.change) {
      return
    }

    var currentSlideNumber = $('[data-slider="gallery-thumbs-mobile"]')
      .find('[href="' + variant.first_image.original_url + '"]')
      .attr('data-slide-number');

    var currentSlide = $('[data-slider="gallery-thumbs"]')
      .find('[data-image-large="' + variant.first_image.large_url + '"]');
    if (MainSwiper) {
      MainSwiper.slideTo(currentSlideNumber -1 );
    }
    copySrc(currentSlide);

  });
      
      $.fancybox.open({
        src: "#quick-view", // Source of the content
        type: "inline"
      });

    });
  });
  $(document).on("click", "[data-choose-options]", function(event) {
    event.preventDefault();
    var _id = $(this).data("choose-options");
    Products.get(_id).done(function(product) { 
      $(".js-quickshop").html(
        templateLodashRender(convertProperties(product), "quickshop")
      );

      Products.initInstance($(".js-quickshop [data-product-id]"));
      
      $.fancybox.open({
        src: "#quickshop", // Source of the content
        type: "inline"
      });
    });
  });
/**
 * RECENTLYVIEW
 */  
  var $recently_view = $(".js-recently_view");
  if ($recently_view.length > 0) {
    var myRecentlyView = new RecentlyView({
      success: function(_products) {
        if (_.size(_products) > 0) {
          var _templateRecentlyView = _.template(
            $('[data-template-id="recently_view"]').html()
          );
          $recently_view.html(_templateRecentlyView({ products: _products }));
              var _spOptions = {
                slidesPerView: 6,
                spaceBetween: 20,
                breakpoints: {
                  380: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  }
                }
              };

              $('[data-slider="recently"]').each(function () {
                new Swiper (this, _spOptions);
              });
          // Инициализация data-product-id
          Products.getList(_.map(_products, "id"));
        }
      }
    });
  }
});
  
var convertProperties = function(_product) {
  _product.parameters = {};
  _product.sale = null;

  // Пермалинк параметра: массив характеристик
  $.each(_product.properties, function(index, property) {
    $.each(_product.characteristics, function(index, characteristic) {
      if (property.id === characteristic.property_id) {
        setParam(_product.parameters, property.permalink, property);
        setParam(
          _product.parameters[property.permalink],
          "characteristics",
          []
        );

        var uniq = true;
        $.each(
          _product.parameters[property.permalink].characteristics,
          function(index, cha) {
            if (cha.id == characteristic.id) {
              uniq = false;
            }
          }
        );
        if (uniq) {
          _product.parameters[property.permalink].characteristics.push(
            characteristic
          );
        }
      }
    });
  });

  // Скидка в процентах
  if (_product.variants) {
    $.each(_product.variants, function(index, variant) {
      if (variant.old_price) {
        var _merge = Math.round(
          ((parseInt(variant.old_price) - parseInt(variant.price)) /
            parseInt(variant.old_price)) *
            100,
          0
        );
        if (_merge < 100) {
          _product.sale = _merge;
        }
      }
    });
  }

  function setParam(obj, name, value) {
    obj[name] || (obj[name] = value);
  }

  return _product;
};
function templateLodashRender(content, templateId) {
  var templateContent = $('[data-template-id="' + templateId + '"]').html();
  var renderContent = _.template(templateContent);

  return renderContent(content);
}
  
  
  var toggleForms = function(button, form){
    button.on('click', function(){
      form.toggle();

      if (form.is(":hidden")){
        button.addClass('is-unchecked');
        button.removeClass('is-checked');
        $('.js-comments-toggle-notice').hide()
      }
      else{
        button.addClass('is-checked');
        button.removeClass('is-unchecked');
      }
      var form_clear =  InSalesUI.Form.get(form);
      form_clear.clear();
    });
  };

  toggleForms($('.js-comments-toggle'),$('#comment_form'));
  toggleForms($('.js-reviews-toggle'),$('#review_form'));

  $('.js-open-search-panel').on('click', function (elem) {
    alertify.panel({
      target: $('[data-modal="search-form"]').html(),
      position: 'top', hideAfter: false
    });
  });

  if (window.innerWidth  <= 768){
    if ($('.hidden-breadcrumbs').hasClass("js-hidden-bread")){

      $('.breadcrumb-item').each(function(index){
        if ((index > 2) && (index != $(".breadcrumb-item").size() - 1))
        {
          $(this).addClass("hidden");
          // console.log($(this).text());
        }
      })
      $('.js-hidden-bread').click(function(){
        $('.breadcrumb-item').removeClass("hidden");
        $('.js-hidden-bread').parent().addClass("hidden");
      })
    }
  }
        $('.js-close').click(function(e){
            e.preventDefault();
            $('.ajs-close').click();
        });  
})();
$(window).on('resize',function(){
    	$('.product-slider').each(function(){
          $(this).find('.product-title').equivalent(); 
        }); 
});