(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        define([], factory(window.jQuery));
    } else {
        factory(window.jQuery);
    }
}(function($) {

    if(!$) {
        return console.warn('Notifications requires jQuery');
    }

    const MOBILE_NOTIFICATION_WIDTH = 600;

    var template = '<div class="notification"><ul></ul></div>';
    var close_icon = '<div class="close"></div>';
    var noty_id = undefined;
    var noty_timer;

    const methods = {
        show: function (message, options) {
            clearTimeout(noty_timer);
            if(methods.active()) {
                methods.getElement().remove();
                noty_id = undefined;
            }
            var noty_template = $(template);
            noty_id = Math.random().toString(36).substr(2, 10);
            noty_template.data('notification', options);
            noty_template.attr('id', noty_id);
            noty_template.addClass(options.type);
            if(options.allowClose) {
                noty_template.append(close_icon);
            }
            if($(window).width() > MOBILE_NOTIFICATION_WIDTH) {
                noty_template.css('margin-left', '-' + Math.round(options.maxWidth / 2) + 'px');
            }
            noty_template.css({
                'max-width': options.maxWidth,
                'color': options.color
            });

            if(Array.isArray(message)) {
                if(Array.isArray(message[0])) {
                    message = message[0];
                }
                message = message.map(function (item) {
                    return '<li>' + item + '</li>';
                });
                message = message.join('');
            } else {
                message = "<li>" + message + "</li>";
            }
            noty_template.find('ul').html(message);
            $('body').append(noty_template);

            if ($.isFunction(noty_template.data('notification').onShow)) {
                noty_template.data('notification').onShow.apply(window, [noty_template.data('notification')]);
            }

            noty_timer = setTimeout(function () {
                methods.hide();
            }, options.timeout);
        },
        hide: function () {
            if(this.active()) {
                clearTimeout(noty_timer);
                const element = this.getElement();
                element.addClass('out');
                noty_timer = setTimeout(function () {
                    if ($.isFunction(element.data('notification').onHide)) {
                        element.data('notification').onHide.apply(window, [element.data('notification')]);
                    }
                    methods.getElement().remove();
                    noty_id = undefined;
                }, 500);
            }
        },
        active: function () {
            return noty_id !== undefined;
        },
        getElement: function () {
            if(this.active()) {
                return $('div.notification#' + noty_id);
            }
            return null;
        }
    };

    $.notification = function (message, options) {
        const opts = $.extend({}, $.notification.defaults, options);
        methods.show(message, opts);
    };

    $.notification.defaults = {
        type: 'success',
        allowClose: true,
        timeout: 5000,
        color: '#ffffff',
        maxWidth: 500,
        onHide: null,
        onShow: null
    };

    // Close icon
    $(document).on('click', 'div.notification div.close', function () {
        if(methods.active()) {
            methods.hide();
        }
    });

}));