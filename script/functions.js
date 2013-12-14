'use strict';

function get_random_color() {
    var color_symbols_count = 6;
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < color_symbols_count; i++) {
        color += letters[Math.round(Math.random() * (letters.length - 1))];
    }
    return color;
}