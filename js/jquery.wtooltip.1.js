/* ===========
 * nueva variable "data" 
 * captura la informacion que se le colocara la tooltip
 * Version 2.0
 * ======== */
(function ($) {
//	$(document).click(function(){
//		$('body').find('.tooltip').removeClass('active');
//		$('.tooltip-standart').hide().queue(function () {
//			$(this).remove();
//			$(this).dequeue();                            
//		});
//	});
    $.fn.wToolTip = function (option) {
        var defaults = {
            evento: 'hover',
            posicion: "center bottom",
            clase: "tooltip-standart",
            arrow: "tts-arrow",
            content: ""

        }

        return this.each(function () {

            opt = $.extend({}, defaults, option);
            var $this = $(this);
            var data = $this.attr('data-title');
            var $tooltip;
            if (typeof data !== typeof undefined && data !== false) {
                // ...
                data = data.toLowerCase();
                if (data == 'not-data') {
                    data = opt.content;
                };
            }else{
                data = opt.content;
            };

            /* EVENTOS */
            if (opt.evento == 'click') {
                $this.live('click', function (e) {
					e.stopPropagation();
                    e.preventDefault();                   
                    $LTBody = $('body');
                    $tooltip = $('.' + opt.clase);
                    $(opt.clase).not($tooltip).hide();
                    if ($tooltip.is(':visible')) {
						if($this.hasClass('active')){
							$tooltip.hide().delay(300).queue(function () {
								$(this).remove();
								$(this).dequeue();                            
							});
							$this.removeClass('active');
						}else{
							$('body').find('.tooltip').removeClass('active');
							$tooltip.hide().delay(300).queue(function () {
								$(this).remove();
								$(this).dequeue();                            
							});
							$this.addClass('active');
							$LTBody.find($tooltip).remove();
							var LTTInfo = '<div class="' + opt.clase + '">' + data + '<span class="' + opt.arrow + '"></span></div>';
							$('.' + opt.clase).remove();
							$LTla = $(LTTInfo).appendTo($LTBody);
							$tooltip = $('.' + opt.clase);
							TTPosition($this, $tooltip, opt);
						}
                    } else {
						$this.addClass('active');
                        $LTBody.find($tooltip).remove();
                        var LTTInfo = '<div class="' + opt.clase + '">' + data + '<span class="' + opt.arrow + '"></span></div>';
                        $('.' + opt.clase).remove();
                        $LTla = $(LTTInfo).appendTo($LTBody);
                        $tooltip = $('.' + opt.clase);
                        TTPosition($this, $tooltip, opt);
                    }
                    //return false;
                });

            }

            //			$tooltip.find('.wtlpCerrar').live('click', function(){
            //				$tooltip.hide();
            //				return false;
            //			});

            /* EVENTOS */
            if (opt.evento == 'hover') {
                $LTBody = $('body');
                $this.on('mouseenter', function (e) {
                    var LTTInfo = '<div class="' + opt.clase + '">' + data + '<span class="' + opt.arrow + '"></span></div>';
                    $('.' + opt.clase).remove();
                    $LTla = $(LTTInfo).appendTo($LTBody);
                    $tooltip = $('.' + opt.clase);
                    TTPosition($this, $tooltip, opt);
                });

                $this.on('mouseleave', function () {
                    $tooltip.hide().delay(300).queue(function () {
                        $(this).remove();
                        $(this).dequeue();
                    });
                });



            }
            /* /EVENTOS */

        });

        function TTPosition($LThis, $LToolTip, LOpcion) {
            if (LOpcion.posicion == 'center top') {
                var LTop = $LThis.offset().top;
                var LHeight = $LThis.outerHeight();
                var LTpTop = LTop + LHeight + 15;

                $LToolTip.css({
                    left: function () {
                        var LCLeft = $LThis.offset().left + ($LThis.outerWidth() / 2);
                        var LTWidth = ($LToolTip.outerWidth() / 2);
                        var LTLeft = LCLeft - LTWidth;
                        return LTLeft;

                    },
                    top: LTpTop
                });

                $LToolTip.find(LOpcion.arrow).css({
                    left: function () {
                        return ($LToolTip.outerWidth() - $LThis.outerWidth()) / 2;
                    }
                });

            }
            if (LOpcion.posicion == 'center bottom') {
                var LCTop = $LThis.offset().top;
                var LTHeight = $LToolTip.height();
                var LTpTop = LCTop - LTHeight - 25;
                $LToolTip.css({
                    left: function () {
                        var LCLeft = $LThis.offset().left + ($LThis.width() / 2);
                        var LTWidth = ($LToolTip.width() / 2);
                        var LTLeft = LCLeft - LTWidth - 15;
                        return LTLeft;
                    },
                    top: LTpTop
                });

                $LToolTip.find(LOpcion.arrow).css({
                    left: function () {
                        return ($LToolTip.outerWidth() - $LThis.outerWidth()) / 2;
                    }
                });
            }
        }

    };

}(jQuery));