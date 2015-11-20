/**
 * File: ui.js, created by Peter Welby 18 Oct. 2015
 * This script implements the required functionality on top of the jQuery UI widgets
 * Updated 19 Oct. 2015 to combine tab and slider logic
 */

"use strict";

/** Function: addTab -- add a tab to the given jQuery UI tabs widget with the given content */
var addTab = function(jqContext, strTitle, strContent) {
    var targetUl = jqContext.children("ul"),
        numTabs = targetUl.children("li").length + 1;

    // Append an ugly string concatenation as the list item + anchor combo to create the tab with its title
    targetUl.append("<li><a href='#tab" + numTabs + "'>" + "Tab " + numTabs + "</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>");

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

    jqContext.tabs("refresh");
};

var slideChange = function(event, ui) {
    // The class we added is the first, so get it from the event's target
    var other = $("input." + $(event.target).attr("class").split(" ")[0]);

    if (parseInt(other.val()) !== ui.value) {
        other.val(ui.value);
    }
};

/* Set up UI widgets */
$(document).ready(function(){
    var tabs = $("#tableArea").tabs(), tabForm = $("#tabForm"),
        cStart = $("#cStart"), cEnd = $("#cEnd"),
        rStart = $("#rStart"), rEnd = $("#rEnd"),
        tStart = $("#tStart"), tEnd = $("#tEnd"),
        objInputSliderOpts = { min: -100, max: 100, change: slideChange },
        objTabIndexSliderOpts = { min: 2, range: true, disabled: true };

    // Add tab-close listener for [x] icon on each tab -- found in the sample code at
    // http://jqueryui.com/tabs/#manipulation
    tabs.delegate( "span.ui-icon-close", "click", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    });



    // Initialize input slider widgets
    var objInputSliders = {}, p,
        sliderTabRange = $("#sliderTabRange").slider(objTabIndexSliderOpts);

    objInputSliders.sliderColumnStart = $("#sliderColumnStart").slider(objInputSliderOpts);
    objInputSliders.sliderColumnEnd = $("#sliderColumnEnd").slider(objInputSliderOpts);
    objInputSliders.sliderRowStart = $("#sliderRowStart").slider(objInputSliderOpts);
    objInputSliders.sliderRowEnd = $("#sliderRowEnd").slider(objInputSliderOpts);

    // Input->Slider binding listeners (Slider->Input is handled by slideChange)
    // Note: The validator adds an "error"/"valid" class so just to make sure we get OURS,
    // we need to split the class attribute on the space character and take the first substring
    cStart.change(function() {
        var textInput = $(this),
            slider = $("div." + textInput.attr("class").split(" ")[0]);
        console.log(slider);
        console.log("div." + textInput.attr("class").split(" ")[0]);
        if (slider.slider("value") !== parseInt(textInput.val())){
            slider.slider("value", parseInt(textInput.val()));
        }
    });
    cEnd.change(function() {
        var textInput = $(this),
            slider = $("div." + textInput.attr("class").split(" ")[0]);
        console.log(slider);
        console.log("div." + textInput.attr("class").split(" ")[0]);
        if (slider.slider("value") !== parseInt(textInput.val())){
            slider.slider("value", parseInt(textInput.val()));
        }
    });
    rStart.change(function() {
        var textInput = $(this),
            slider = $("div." + textInput.attr("class").split(" ")[0]);
        console.log(slider);
        console.log("div." + textInput.attr("class").split(" ")[0]);
        if (slider.slider("value") !== parseInt(textInput.val())){
            slider.slider("value", parseInt(textInput.val()));
        }
    });
    rEnd.change(function() {
        var textInput = $(this),
            slider = $("div." + textInput.attr("class").split(" ")[0]);
        console.log(slider);
        console.log("div." + textInput.attr("class").split(" ")[0]);
        if (slider.slider("value") !== parseInt(textInput.val())){
            slider.slider("value", parseInt(textInput.val()));
        }
    });


    // Initialize tab removal form validation
    tabForm.validate({
        submitHandler: function(form) {
            var startIndex = parseInt($("#tStart").val()),
                endIndex = parseInt($("#tEnd").val());

            removeTab($(form), startIndex, endIndex);

            return false;
        },
        rules: {
            tStart: { required: true, integer: true, min: 2 },
            tEnd: { required: true, integer: true, min: 2, greaterEqual: "tStart" }
        }
    })
});
