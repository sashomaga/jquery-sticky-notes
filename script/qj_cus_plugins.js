$.fn.scale = function (start, end, duration, complete) {
    return this.each(function () {
        var $elem = $(this);
        $({ deg: start }).animate({ deg: end }, {
            duration: duration,
            step: function (now) {
                $elem.css({
                    '-webkit-transform': 'scale(' + now + ')'
                });
            },
            complete: complete || $.noop
        });
    });
};