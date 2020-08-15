// ==UserScript== 
// @name           snatk.user.js
// @include        https://ilx.wh3rd.net/* 
// @include        https://ilx.p3r.net/*
// @include        https://www.ilxor.com/*
// @include        https://ilxor.com/*
// ==/UserScript==  

// YOU NEED TO MODIFY THE fules LINE BELOW
// a thread is a combination of boardId and threadId, you need both
// =======================================
var fules = [
    "boardid=48&threadid=107992",    // [code]test[/code]
];

// set to true if you want no mention of deleted threads
var nuke = false;

var threads;
// li class=thread / a href=...boardid=&threadid=
// get all threads (including the updated ones, hence the cpntains())
threads = document.evaluate("//li[contains(@class, 'thread')]/a",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

blocked = false;
var count = 0
if (threads.snapshotLength != 0) {
    count++;
    // alert("Posts: " + threads.snapshotLength);   // acd DEBUG
    for (var i = 0; i < threads.snapshotLength; i++) {
        var thisLink = threads.snapshotItem(i);
        // alert("ThisLink: " + thisLink);  // acd DEBUG
        for (var k = 0; k < fules.length; k++) {
            fule = fules[k];
            // if this post belongs to this fule then blank it
            if (thisLink.href.includes(fule)) {
                // alert("Found: ThisLink: [" + thisLink.href + "] Fule: [" + fule + "]");    // acd DEBUG
                // alert("thislink" + thisLink.parentNode);
                li = thisLink.parentNode;
                li.hidden = true;
                blocked = true;
                break;
            }
        }
    }
    if (blocked == true && nuke == false) {
        // there were hidden threads - display message at top of file
        var logo = document.createElement("div");
        logo.innerHTML = '<div style="position:fixed; top:0; right:0; left:auto; z-index:10; background-color:red; color:white; font-size:10pt; font-weight:bold;">Some Threads Were Hidden</div>';
        document.body.insertBefore(logo, document.body.firstChild);
    }
}

