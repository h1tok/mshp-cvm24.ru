$(document).on('afterShow.fb', function( e, instance, slide ) {
  var timers_swiper;
  if($('[data-slider="timers-slider"] .swiper-button-next').length == 0) {
        timers_swiper = new Swiper ('[data-slider="timers-slider"]', {
            slidesPerView: 7,
            slidesPerGroup: 2,
            spaceBetween: 20,
          	//loop: true,
            breakpoints: {
              380: {
                slidesPerView: 1,
                slidesPerGroup: 1,    
                loop: true,
                loopFillGroupWithBlank: true,
                spaceBetween: 0,            
              },
              480: {
                slidesPerView: 2,
          	slidesPerGroup: 1
              },
              768: {
                slidesPerView: 3,
          	slidesPerGroup: 1
              },
              1024: {
                slidesPerView: 5,
          	slidesPerGroup: 1
              }
            }   
        });     
        timers_swiper.on('init', function() {
          if($('[data-slider="timers-slider"] .swiper-slide').length < 7) {
            $('.timers-current').html($('.swiper-slide:first .day_week').data('month') +' - '+ $('.swiper-slide:last .day_week').data('month'));
          } else {
            if($(window).width() < 1024) {
                $('.timers-current').html($('.swiper-slide:first .day_week').data('month') +' - '+ $('.swiper-slide:nth-child(5) .day_week').data('month'));
            } else if($(window).width() < 768) {
                $('.timers-current').html($('.swiper-slide:first .day_week').data('month') +' - '+ $('.swiper-slide:nth-child(3) .day_week').data('month'));
            } else if($(window).width() < 480) {
                $('.timers-current').html($('.swiper-slide:first .day_week').data('month') +' - '+ $('.swiper-slide:nth-child(2) .day_week').data('month'));
            } else {
                $('.timers-current').html($('.swiper-slide:first .day_week').data('month') +' - '+ $('.swiper-slide:nth-child(7) .day_week').data('month'));        
            }
          }
        });
        // init Swiper
        timers_swiper.init(); 
  }
		timers_swiper.on('slideChangeEnd', function (s) { 
          if($(window).width() > 1024) {
             $('.timers-current').html($('.swiper-slide:nth-child('+ (s.activeIndex + 1) +') .day_week').data('month') +' - '+ $('.swiper-slide:nth-child('+ (s.activeIndex + 7) +') .day_week').data('month'));  
          } else if($(window).width() > 768) {
              $('.timers-current').html($('.swiper-slide:nth-child('+ (s.activeIndex + 1) +') .day_week').data('month') +' - '+ $('.swiper-slide:nth-child('+ (s.activeIndex + 5) +') .day_week').data('month'));  
          } else if($(window).width() > 480) {
              $('.timers-current').html($('.swiper-slide:nth-child('+ (s.activeIndex + 1) +') .day_week').data('month') +' - '+ $('.swiper-slide:nth-child('+ (s.activeIndex + 3) +') .day_week').data('month'));  
          } else if($(window).width() > 100) {
              $('.timers-current').html($('.swiper-slide:nth-child('+ (s.activeIndex + 1) +') .day_week').data('month') +' - '+ $('.swiper-slide:nth-child('+ (s.activeIndex + 2) +') .day_week').data('month'));  
          }          
  		});       
});
$(function(){             
        var html_slots = '';  
        var slots_hours = Site.slots_hours.split(";");
        console.log(slots_hours);
        $.ajax({
          url: Site.link_slots_json, 
          type: 'POST',
          async: false,
          crossDomain: true,
          dataType: 'json',
          success: function(data){
            console.log('data', data);
            var date = new Date();
            var insales_date = new Date( Site.insales_year, Site.insales_month, Site.insales_day, Site.insales_hours, Site.insales_minutes ); // по гринвичу
            if(insales_date) {
              insales_date.setHours(insales_date.getHours() + 3); 
              date = insales_date;
            }
            for (var key in data) {
              var date_json = new Date(key.substr(0, 4), (key.substr(4, 2) - 1), key.substr(6, 2));
              if( (new Date(date_json).getDate() >= date.getDate() && new Date(date_json).getMonth() == date.getMonth()) || new Date(date_json).getMonth() > date.getMonth()) {
                  html_slots += '<div data-slider-slide><div class="day_week" data-month="'+new Date(date_json).getDate() + ' '+ monthNames[new Date(date_json).getMonth()]+'">'+day_week[new Date(date_json).getDay()]+', '+new Date(date_json).getDate() +'</div><ul class="time_slots">';
                if(slots_hours) {
                  $.each(slots_hours,function(index,value){                    
                    var hours_item = value.split(' - ');
                    var hour_first = hours_item[0];
                    var hour_end = hours_item[1];
                    var item_class = '';
                    if(data[key][hour_first] == undefined) {
                      var item_class = ' limit';
                    }
                    if( new Date(date_json).getDate() == date.getDate() && new Date(date_json).getMonth() == date.getMonth() ) {
                      if (parseInt(hour_first) < parseInt(Site.slots_hour_next) || (parseInt(hour_first) < date.getHours() + 2 || (date.getHours() > 20 || (date.getHours() == 20 && date.getMinutes() > 30) ) ) ) {
                        var item_class = ' limit';
                      }
                      html_slots += '<li class="today'+item_class+'"><a href="#">' + hour_first + ' - ' + hour_end + '</a></li>';
                    } else {
                      if ( new Date(date_json).getDate() == (date.getDate()+1) && ( parseInt(hour_first) < parseInt(Site.slots_hour_next) && (date.getHours() > 20 || (date.getHours() == 20 && date.getMinutes() > 30))) ) {
                        var item_class = ' limit';
                      }
                      html_slots += '<li class="next_day'+item_class+'"><a href="#">' + hour_first + ' - ' + hour_end + '</a></li>';
                    }
                    
                  });
                }
             }
            }         
          }, error: function(data){
            console.log('error', data);
            for(var i = 0; i <= 31; i++) {
              var date = new Date();
		      var d_date = new Date();
			  var insales_date = new Date( Site.insales_year, Site.insales_month, Site.insales_day, Site.insales_hours, Site.insales_minutes ); // по гринвичу
              if(insales_date) {
                insales_date.setHours(insales_date.getHours() + 3); 
                date = insales_date;
                d_date = insales_date;
              }
	              d_date.setDate(insales_date.getDate() + i);
              if( i > 0 || (i == 0 && (date.getHours() < 20 || (date.getHours() == 20 && date.getMinutes() < 30)) )) {
                  html_slots += '<div data-slider-slide><div class="day_week day'+i+'" data-month="'+new Date(d_date).getDate() + ' '+ monthNames[new Date(d_date).getMonth()]+'">'+day_week[new Date(d_date).getDay()]+', '+new Date(d_date).getDate() +'</div><ul class="time_slots">';
                  $.each(slots_hours,function(index,value){                    
                          var hours_item = value.split(' - ');
                          var hour_first = hours_item[0];
                          var hour_end = hours_item[1];
                          if( new Date(d_date).getDate() == new Date().getDate() && new Date(d_date).getMonth() == new Date().getMonth() ) {
                            if (parseInt(hour_first) < parseInt(Site.slots_hour_next) || (parseInt(hour_first) < date.getHours() + 2 || (date.getHours() > 20 || (date.getHours() == 20 && date.getMinutes() > 30) ) ) ) {
                              var item_class = ' limit';
                            }
                            html_slots += '<li class="today'+item_class+'"><a href="#">' + hour_first + ' - ' + hour_end + '</a></li>';
                          } else {
                            if ( new Date(d_date).getDate() == (date.getDate()+1) && ( parseInt(hour_first) < parseInt(Site.slots_hour_next) && (date.getHours() > 20 || (date.getHours() == 20 && date.getMinutes() > 30))) ) {
                              var item_class = ' limit';
                            }
                            html_slots += '<li class="next_day'+item_class+'"><a href="#">' + hour_first + ' - ' + hour_end + '</a></li>';
                          }                    
                  });
	              html_slots += '</ul></div>';
              }
            }                      
          }
        });  
  		$('[data-slider="timers-slider"]').append(html_slots);
        $('body').on('click', '.time_slots li:not(.limit) a', function(){
          $('#order_field_7200994').val( $(this).parents('.swiper-slide').find('.day_week').data('month') + ' ' + $(this).html() );
          $('.timers-link a').html(Site.messages.slots_title_selected+': '+ $(this).parents('.swiper-slide').find('.day_week').data('month') + ' ' + $(this).html());
          $('.js-timers-info').html('Выбранный интервал действует в течении 15 минут');
          $.cookie('time_slot', $(this).parents('.swiper-slide').find('.day_week').data('month') + ' ' + $(this).html(), { expires: 1/24/60 * 15 });
          $.fancybox.close();
          return false;
        }); 
  		/*$('#order_form').submit(function(e){  
          console.log('00000011', $('#order_field_7200994').val());
          if ($('#order_field_7200994').val() == '') {
            e.preventDefault();
            //$.fancybox.open( $("#timers") );
            return false;
          } else {
          }
        });*/
  		$('#create_order').on('hover', function(e){
          console.log('iudp', $.cookie('time_slot') );
        });
        $('body').on('click', '#check_create', function(e){
          console.log($('#order_field_7200994').val());
          if ($('#order_field_7200994').val() == '') {
            e.preventDefault();
            $.fancybox.open( $("#timers") );
            return false;
          } else {
            $('#create_order').click();
          }
        });       
        $('#delivery_variants').after('<p class="timers-link"><a href="javascript:;">'+Site.messages.slots_title+'</a></p><div class="js-timers-info"></div>');
        $('body').on('click', '.timers-link a', function(){
            $.fancybox.open({
                src  : '#timers',
                touch : false,
            });
        });
        $('#order_field_7200994').parents('.co-input').hide();
        $('#order_field_7200975').attr('type','date');
        $("#client_consent_to_personal_data").attr( "checked",false );
        $(".co-delivery_method-list .co-input--tel input").after("<p style='margin-top: 10px;'>"+Site.messages.sample_number+"</p><p>"+Site.messages.world_call+"</p>");
        $('#create_order').hide().after('<a href="javascript:history.back()" class="lnk_back_cart">'+Site.messages.back_cart+'</a>').before('<a href="javascript:void();" id="check_create" class="co-button co-button--checkout">Подтвердить заказ</a>');
        $('.checkout-v2-wrapper input.co-input-field, .checkout-v2-wrapper textarea').each(function(){
        	$(this).attr('placeholder', $(this).prevAll('label').text());
          	$(this).prevAll('label:not([for="order_field_7200975"])').hide();
        });
        
        if($('h3.co-title:contains("Customer")').length > 0) {
        	$('.co-input-description:contains("Вы сможете видеть историю заказов и проще делать новые")').html("You can see the order history and make new ones easier.");
        }
  console.log("$.cookie('time_slot') ", $.cookie('time_slot') );
  		if($.cookie('time_slot') && $.cookie('time_slot') != '') {
          	$('#order_field_7200994').val( $.cookie('time_slot') );
          	$('.timers-link a').html(Site.messages.slots_title_selected+': '+ $.cookie('time_slot'));
          	$('.js-timers-info').html('Выбранный интервал действует в течении 15 минут');
        }  
         setTimeout(function(){

           },5000);       
      }) 