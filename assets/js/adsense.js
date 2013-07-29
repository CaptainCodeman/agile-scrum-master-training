var adsense = (function (w) {
    window.layout = 1002;

    if (typeof w.console === "undefined") { w.console = { log: function () { return; } }; }

    var self = {};
    var script;

    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++)
        if (scripts[i].src.indexOf('/adsense.js', scripts[i].src.length - 11) != -1 || scripts[i].src.indexOf('/adsense.min.js', scripts[i].src.length - 15) != -1)
            script = scripts[i];

    var client = script.getAttribute('data-client');
    var analytics = script.getAttribute('data-analytics');
    var debug = (script.getAttribute('data-debug').toLowerCase() == 'true');
    var inventory = eval('(' + script.getAttribute('data-inventory') + ')');

    self.render = function (name) {
        var key = name + '-' + w.layout;
        if (inventory[key] === undefined) {
            console.log('no inventory for ' + key);
        }
        else
        {
            var ad = inventory[key];
            console.log('matched ad to ' + key);

            if (analytics.length > 0)
                w.google_analytics_uacct = analytics;

            w.google_ad_client = client;
            w.google_ad_slot = ad.Slot;
            w.google_ad_width = ad.Width;
            w.google_ad_height = ad.Height;

            if (debug)
                document.write('<img src="http://placehold.it/' + google_ad_width + 'x' + google_ad_height + '" alt="" width="' + ad.w + '" height="' + ad.h + '"/>');
            else
                document.write('<sc' + 'ript src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></sc' + 'ript>');
        }
    };

    return self;
})(window);