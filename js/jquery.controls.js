$.fn.selectSe = function(options){
    return this.each(function(){
        var w = $(this).css('width');
        w = (/[0-9]*px/i.test(w)) ? parseInt(w) : 200;
        var LBASEURL = '';
        if(!(typeof BASEURL === 'undefined')){ LBASEURL = BASEURL; }
        var opt = {
            'border': 'none',
            'background': 'transparent',
            'height': 32,
            'width': w,
            'textAlign': 'left'			
        }        
        if ($(this).attr('opt')) {
            $.extend(opt, eval('(' + $(this).attr('opt') + ')'));
        }        
        var select = $(this).css({ 
				'visibility': 'hidden',
				'width': '1px',
				'height': '0px',
				'position': 'absolute',
				'bottom': 0
			});
        var options = select[0].options;
        var input_s = $('<input readonly="readonly" type="text" />').css({
            'border': opt.border,
            'background': opt.background,
            'paddingLeft': 0
        });
        var container = select.parent();
        
        var css_divs = {
            'float': 'left',
            'backgroundImage': 'url(' + LBASEURL + 'img/misc/sel-input.jpg)',
            'backgroundRepeat': 'no-repeat',
            'width': 8,
            'height': opt.height
        };
		var css_divs_error = {
            'backgroundImage': 'url(' + LBASEURL + 'img/misc/sel-input.jpg)'
		};
        var css_arrow = {
            'backgroundImage': 'url(' + LBASEURL + 'img/misc/sel-arrow.jpg)',
            'width': 32,
            'height': opt.height
			
        };
		var css_arrow_error = {
			'backgroundImage': 'url(' + LBASEURL + 'img/misc/sel-arrow.jpg)'
		};
        var css_option = {
            'height': 16,
            'color': '#ddd',
            'background': '#657091',
            'cursor': 'pointer',
            'fontSize': '14px',
            'fontFamily': 'Arial',
            'paddingLeft': 8,
            'paddingRight': 8,
            'paddingTop':8,
            'paddingBottom':8
        };
        var css_option_over = {};
        $.extend(css_option_over, css_option)
        css_option_over.color = '#546085';
        css_option_over.background = '#ddd';
        
        var drop_down = function(){
            options = select[0].options;
            if (options.length > 0) {
                divl.css('backgroundImage', css_divs.backgroundImage);
                divc.css('backgroundImage', css_divs.backgroundImage);
                diva.css('backgroundImage', css_divs.backgroundImage);
                divr.css('backgroundImage', css_divs.backgroundImage);
				arrow.css('backgroundImage', css_arrow.backgroundImage);
                options_div.empty().show();
                
                if (options.length > 6) 
                    options_div.css({
                        'overflowY': 'scroll',
                        'overflowX': 'hidden',
                        'height': css_option.height * 6
                    })
                var table = $('<table></table>').appendTo(options_div).css({'borderCollapse': 'collapse','width':'100%'});
                $.each(options, function(i, val){
                    var tr = $('<tr></tr>').appendTo(table);
                    var td = $('<td></td>').attr({
                        'align': 'left',
                        'value': val.value
                    }).html(val.text).appendTo(tr).css(css_option).bind('mouseover', function(){
                        $(this).css(css_option_over);
                    }).bind('mouseout', function(){
                        $(this).css(css_option);
                    }).bind('mousedown', function(){
                        select.attr('value', $(this).attr('value'));                        
						select.find('option:eq('+$(this).parent().index()+')').attr('selected', true)
                        input_s.val($(this).html());
                        
                        if (select.change) {
                            select.change();
                        }                        
                    });
                    if(val.value=="0"){
                        $('.options_div').find('tr:first').hide();
                    }
                });
                
                $(document).bind('mousedown', function(e){
                    if (!$(e.target).is('.options_div')) {                        
                        options_div.hide();
                        input_s.focus();
                        $(document).unbind('mousedown');
                    }
                });
            }
        }
        
        var div = $('<div class="selBoxContent"></div>').appendTo(container).css({
            'float': 'left',
            'position': 'relative',
            'height': css_divs.height,
            'cursor': 'pointer'
        }).bind('click', drop_down);
        var divl = $('<div></div>').appendTo(div).css(css_divs).css({
            'backgroundPosition': '0px 0px'
        });
        var divc = $('<div></div>').appendTo(div).css(css_divs).css({
            'backgroundPosition': '-' + css_divs.width + 'px 0px',
            'width': opt.width - css_arrow.width - (css_divs.width * 2)
        });
        var diva = $('<div></div>').appendTo(div).css(css_divs).css({
            'backgroundPosition': '-' + css_divs.width + 'px 0px',
            'width': css_arrow.width
        });
        var divr = $('<div></div>').appendTo(div).css(css_divs).css({
            'backgroundPosition': 'right 0px',
			'width': 1
        });
        var arrow = $('<div></div>').appendTo(diva).css(css_arrow);
        
        // Solo para centrar verticalmente el input ******
        var table = $('<table></table>').appendTo(divc).css({
            'height': '100%',
            'width': '100%' //opt.width - css_arrow.width - (css_divs.width * 2)
        });
        var tr = $('<tr></tr>').appendTo(table);
        var td = $('<td></td>').appendTo(tr);
        // *****************
        
        input_s.appendTo(td).css({
            'cursor': 'pointer',
            'textAlign': opt.textAlign,
            'width': '98%', //opt.width - css_arrow.width - (css_divs.width * 2),
			'font-family': 'Arial, sans-serif',
			'font-size': '14px',
			'font-style': 'normal',
			'color': '#546085'
        }).bind('blur', function(){
            divl.css('backgroundImage', css_divs.backgroundImage);
            divc.css('backgroundImage', css_divs.backgroundImage);
            diva.css('backgroundImage', css_divs.backgroundImage);
            divr.css('backgroundImage', css_divs.backgroundImage);
            options_div.hide();
        });
        
        // Options **********
        var css_options_div = {
            'position': 'absolute',
            'background': '#555',
            'width': opt.width -9,
            'top': 32,
            'left': 0,
            'zIndex':2,
            'border': '1px solid #d6d6d6',
            'overflowX': 'hidden',
			'font-family': 'Arial, sans-serif',
			'font-size': '14px',
			'font-style': 'normal'
        }
        
        var options_div = $('<div></div>').addClass('options_div').appendTo(div).css(css_options_div).hide();
        // ******************
        
        if(options.length > 0) {
            input_s.val(options[0].text);
            select.val(options[0].value);
        }
        
        var div_disabled = $('<div></div>').hide().appendTo(div).css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: opt.width-8,
            height: opt.height,
            background: '#eeeeee',
            opacity: 0.7
        });
        
        this.enable = function(){
            div_disabled.hide();
            div.bind('click', drop_down);
        };
        this.disable = function(){
            div_disabled.show().css('cursor', 'default');
            div.unbind('click', drop_down);
        };
        this.setValue = function(v){            
			select.attr('value', select[0].options[v].value);
			input_s.val(select[0].options[v].text);
        };
		
		this.enableError = function() {
			divl.css('backgroundImage', css_divs_error.backgroundImage);
			divc.css('backgroundImage', css_divs_error.backgroundImage);
			diva.css('backgroundImage', css_divs_error.backgroundImage);
			divr.css('backgroundImage', css_divs_error.backgroundImage);
			arrow.css('backgroundImage', css_arrow_error.backgroundImage);
		};
		
		this.disableError = function() {
			divl.css('backgroundImage', css_divs.backgroundImage);
			divc.css('backgroundImage', css_divs.backgroundImage);
			diva.css('backgroundImage', css_divs.backgroundImage);
			divr.css('backgroundImage', css_divs.backgroundImage);
			arrow.css('backgroundImage', css_arrow.backgroundImage);
		};
        
        if (select.attr('disabled')) {
            this.disable();
        }
    });
};
$.fn.checkBox = function(params){
    var LBASEURL = '';
    if(!(typeof BASEURL === 'undefined')){ LBASEURL = BASEURL; }
    var opt = {
        imgPath: LBASEURL+'http://www.clc.cl/Dev_CLC/media/Imagenes/previcolon-2015-ldnew/s-ck.png',
        width: 10
    };
    $.extend(opt, params);
    return this.each(function(){
        var radioStyle = {
            width: '100%',
            height: '100%',
            margin: '0px',
            position: 'absolute',
            zIndex: 2,            
            cursor: 'pointer',
            outline: 'none',
            opacity: 0,
            '_noFocusLine': 'expression(this.hideFocus=true)',
            '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)',
            'filter': 'alpha(opacity=0)',
            '-khtml-opacity': 0,
            '-moz-opacity': 0,
            top: 0,
            left: 0
        }
        var styleParent = {
            float: 'left',
            width: opt.width,
            height: opt.width,
            padding: '0px',
            display: 'inline-block',
            position: 'relative',
            zIndex: 1,
            top: '1px',
            backgroundImage : 'url('+opt.imgPath+')',
            backgroundRepeat : 'no-repeat'
        }
        var parentSelected = {
            backgroundPosition: "left bottom"
        }
        var parentUnSelected = {
            backgroundPosition: '0px 0px'
        }
        if(!$(this).hasClass('chkCreado')){
            $(this).addClass('chkCreado');
            $(this).css(radioStyle);
            $(this).wrap( "<span class='cb_area'></span>");
            $(this).parent().css(styleParent);
            if($(this).is(':checked')){
                $(this).parent().addClass('selected').css(parentSelected);
            }
            /** Methods **/
            this.setChecked = function(){
                cbSelected(this);               
            };
            this.setUnChecked = function(){
                cbUnSelected(this);
            };  
            $(this).click(function(){
                if($(this).attr('checked'))
                    cbSelected(this);
                else
                    cbUnSelected(this);
            });
        }
        var cbSelected = function(el){
            $(el).parent().addClass("selected").css(parentSelected);
            $(el).attr('checked','checked');
        };
        var cbUnSelected = function(el){
            $(el).parent().removeClass("selected").css(parentUnSelected);
            $(el).removeAttr('checked');
        };
    });
};