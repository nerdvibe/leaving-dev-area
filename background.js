/*
* Yo developer! I'm happy that you are going through this.code :)
* This was developed during a boring sunday in order to avoid mistakes while developing, feel free to edit and improve the code!
*
* Star the project in https://github.com/xunga/leaving-dev-area
*
* Crafted with <3 by Alessio Scarapazzi
* https://github.com/xunga
*
* */

WEBSITE_JSON = 'websites.json';
websites = {};

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    var i, len, website;
    var topbar = {};

    if(changeInfo.status == 'complete' ){

        for (i = 0, len = websites.length; i < len; i++) {
            website = websites[i];
            if(tab.url.indexOf('://' + website.url  + '/') > -1){
                topbar.name = website.name;
                topbar.color = website.color;
                topbar.delay = website.delay || 0;
                break;
            }
        }

        if (Object.keys(topbar).length) {

            var bar = '<div class="developerBar" ' +
                'style="font: 10px/13px Tahoma, Verdana, sans-serif; font-weight: normal; color: #404040; position: fixed; top: 0; left: 0; right: 0; z-index: 2; height: 15px; /* bar size */ line-height: 15px; /* bar size */ color: #ddd; background: #243942; border-bottom: 1px solid #191919; background-image: -webkit-linear-gradient(top, #243942, #22373f 50%, #1d2e35 50%, #1b2b32);"> ' +
                '<div class="container" style="width: 540px; margin: 0 auto;"> ' +
                '<h1 style="float: left; margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;">Hey you are visiting ' + topbar.name + '! Ahoy!</h1> ' +
                '</div> ' +
                '</div>';


            setTimeout(function() {
                chrome.tabs.executeScript(tab.ib, {
                    code: "document.body.innerHTML += '" + bar + "';"
                    //file: 'inject.js'
                });
            }, topbar.delay);
        }

    }
});

//Loading the webiste list
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', WEBSITE_JSON , true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            return callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

(function () {
    loadJSON(function(response) {
        websites = JSON.parse(response);
        websites = websites.websites;
    });
})();
