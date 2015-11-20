/**
 * File: ui.js, created by Peter Welby 18 Oct. 2015
 * This script implements the required functionality on top of the jQuery UI widgets
 * Updated 19 Oct. 2015 to combine tab and slider logic
 */

"use strict";

/** Function: addTab -- add a tab to the given jQuery UI tabs widget with the given title and content */
var addTab = function(jqContext, strTitle, strContent) {
    var targetUl = jqContext.children("ul"),
        numTabs = targetUl.children("li").length + 1;

    // Append an ugly string concatenation as the list item + anchor combo to create the tab with its title
    targetUl.append("<li><a href='#tab" + numTabs + "'>" + strTitle + "</a></li>");

    // Do the same for the tab's content, where the div itself is the append target
    jqContext.append("<div id='tab" + numTabs + "'>" + strContent + "</div>");

    // Refresh the tabs widget to register the new tab
    jqContext.tabs("refresh");
};

/** Function: removeTab -- remove the tabs in the given context
 * with indices from  startIndex to endIndex */
var removeTab = function(jqContext, startIndex, endIndex) {
    var i;

    // It would be catastrophic to remove the Control Panel tab, so don't let that happen
    if (startIndex < 2) {
        console.log("ERROR: Cannot delete control tab!");
        return;
    }

    for (i = startIndex; i <= endIndex; i++) {
        jqContext.children("a[href='#tab" + i + "']").remove();
        jqContext.children("div#tab" + i).remove();
    }
};

/* Set up UI widgets */
$(document).ready(function(){
    var tableArea = $("#tableArea"),
        objInputSliderOpts = { min: -100, max: 100 },
        objTabIndexSliderOpts = { min: 2, range: true, disabled: true };

    tableArea.tabs();

    // Initialize input slider widgets
    $("#sliderColumnStart").slider(objInputSliderOpts);
    $("#sliderColumnEnd").slider(objInputSliderOpts);
    $("#sliderRowStart").slider(objInputSliderOpts);
    $("#sliderRowEnd").slider(objInputSliderOpts);
});
