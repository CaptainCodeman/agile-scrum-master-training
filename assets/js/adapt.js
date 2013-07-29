(function (w, d) {
    if (typeof w.console === "undefined") { w.console = { log: function () { return; } }; }

    // get parameters
    var script;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++)
        if (scripts[i].src.indexOf('/adapt.js', scripts[i].src.length - 9) != -1 || scripts[i].src.indexOf('/adapt.min.js', scripts[i].src.length - 13) != -1)
            script = scripts[i];
    var path = script.getAttribute('data-path');
    var debug = (script.getAttribute('data-debug').toLowerCase() == 'true');
    var resize = (script.getAttribute('data-resize').toLowerCase() == 'true');
    var delay = parseInt(script.getAttribute('data-delay'));
    var defaultwidth = parseInt(script.getAttribute('data-defaultwidth'));
    var layouts = eval('(' + script.getAttribute('data-layouts') + ')');

    // set layout based on browser width and breakpoints
    var setLayout = function () {
        var x = d.documentElement.clientWidth || defaultwidth;
        for (var k in layouts)
            if (x >= k)
                w.layout = parseInt(k);

        if (debug)
            console.log('width: ' + x + ', layout: ' + w.layout + ' (' + layouts[w.layout] + ')');
    };

    setLayout();

    // create stylesheet to load appropiate styles
    var css = d.createElement('link');
    css.rel = 'stylesheet';
    css.media = 'screen';
    css.href = path + layouts[w.layout];
    (d.head || d.getElementsByTagName('head')[0]).appendChild(css);

    // listen for resizing with timer to wait until stopped
    var timer;

    function adapt() {
        clearTimeout(timer);
        var layout = w.layout;
        setLayout();
        if (layout != w.layout)
            window.location.reload(false);
    }

    function resized() {
        clearTimeout(timer);
        timer = setTimeout(adapt, delay);
    }

    if (w.addEventListener)
        w.addEventListener("orientationchange", function () { adapt(); }, false);

    if (resize && w.addEventListener)
        w.addEventListener('resize', resized, false);
    else if (resize && w.attachEvent)
        w.attachEvent('onresize', resized);
    else if (resize)
        w.onresize = resized;

})(window, window.document);