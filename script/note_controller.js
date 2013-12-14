'use strict';

var note_controller = (function () {
    // returned object
    var my = {};

    my.init = function () {
        my.note_width = 200;
        my.note_height = 200;
        my.note_array = [];
        my.note_id = 0;

        // old fashion way 
        // note main div
        var note = document.createElement('div');
        note.className = 'pref-note';

        // jquery way 
        // close note div
        $('<div>').addClass('pref-close-button').appendTo($(note)).text('X').on("click", function (ev) {
            /// delete element from store array and DOM
            // get element index from id
            var index = ev.target.parentNode.id.slice(5) | 0;
            my.note_array[index] = undefined;
            var element = ev.target.parentNode;
            $(element).animate({ opacity: 0 }, 2000, function () { $(element.remove()) });
        });
        // minimize div
        $('<div>').addClass('pref-minimize-button').appendTo($(note)).text('_').on("click", function (ev) {
            //scale
            var element = this.parentNode;
            $(element).scale(1, 0.2, 2000, function () {
                $(element).on('dblclick', function () {
                    $(element).scale(0.2, 1, 2000, function () { $(element).unbind("dblclick") });
                })
            })
        });
                
        // caption div
        $('<div>').addClass('pref-caption-cont').appendTo($(note)).attr('contentEditable', true).
                        on('dblclick', function () { $(this).focus() });
        // body text div
        $('<div>').addClass('pref-body-cont').appendTo($(note)).attr('contentEditable', true).
                        on('dblclick', function () { $(this).focus() });

        my.note = note;
    }

    my.createNode = function (caption, text, top, left, color) {
        top = top || Math.abs(Math.random() * $(document).height() - my.note_width);
        left = left || Math.abs(Math.random() * $(document).width() - my.note_height);
        caption = caption || "no caption";
        text = text || "no text";
        color = color || get_random_color();

        var new_note = $(my.note).clone(true);

        new_note.find('.pref-caption-cont').text(caption);
        new_note.find('.pref-body-cont').text(text);
        new_note.css('top', top + 'px').css('left', left + 'px').css('backgroundColor', color).css('opacity', '0').
                            attr('id', 'note_' + my.note_id);

        new_note.appendTo(document.body);
        new_note.fadeTo(1000, 1);

        // jq-ui draggable magic in one row
        new_note.draggable({
            start: function (event, ui) { $(this).css("border", "5px solid #EDD777").css("zIndex","1"); },
            stop: function (event, ui) { $(this).css("border", "1px solid #000000").css("zIndex", "0"); }
        });

        // store in array cache time
        my.note_array[my.note_id] = new_note;

        my.note_id++;
    }

    my.archivate = function () {
        var data = [];
        for (var i = 0; i < my.note_array.length; i++) {
            var obj = {};
            if (my.note_array[i] != undefined) {
                obj.top = my.note_array[i].position().top;
                obj.left = my.note_array[i].position().left;
                obj.caption = my.note_array[i].find('.pref-caption-cont').text();
                obj.text = my.note_array[i].find('.pref-body-cont').text();
                obj.color = my.note_array[i].css('backgroundColor');
            }
            data.push(obj);
        }
        localStorage.setItem('data', JSON.stringify(data));
    }

    my.restore = function () {
        if (localStorage.getItem('data') != null) {
            var data = JSON.parse(localStorage.getItem('data'));
            for (var i = 0; i < data.length; i++) {
                my.createNode(data[i].caption, data[i].text, data[i].top, data[i].left, data[i].color);
            }
        }

    }

    return my;
}());