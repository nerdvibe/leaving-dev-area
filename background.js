// Called when the user clicks on the browser action.

/*chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
});*/


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.url.indexOf('://' + website + '/') > -1) {

        console.log('Turning ' + tab.url + ' awesome!');
        // do your things

    }
});
