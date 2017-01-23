var MOUSE = {
    click: false,
    initialize: function (canvas) { 
        $(canvas).mouseup(function () {
            MOUSE.click = !MOUSE.click;
        });
    }
};