/*chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
});*/

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
                break;
            }
        }


        if (Object.keys(topbar).length) {

            console.log('Turning ' + topbar.name + ' awesome!');

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
