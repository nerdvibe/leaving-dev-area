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

    if(changeInfo.status == 'complete' ){
        var i, len, website;
        var topbar = {};

        for (i = 0, len = websites.length; i < len; i++) {
            website = websites[i];
            if(tab.url.indexOf('://' + website.url  + '/') > -1){
                topbar.name = website.name;
                topbar.color = website.color || 'LightCoral';
                topbar.delay = website.delay || 0;
                break;
            }
        }

        if (Object.keys(topbar).length) {
            var bar = ''+
                '<div class="developerBar" ' +
                'style="font: 10px/13px Tahoma, Verdana, sans-serif !important; font-weight: normal !important; color: #404040 !important; position: fixed; top: 0; left: 0; right: 0; z-index: 2; height: 15px; line-height: 15px; color: #ddd !important; background: #243942; border-bottom: 1px solid #191919; background-color:  ' + topbar.color + ';"> ' +
                    '<div class="container" style="width: 540px; margin: 0 auto;"> ' +
                        '<p style="float: left; margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; color: #FFFFFF !important">Hey you are visiting ' + topbar.name + '! Ahoy!</p> ' +
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

