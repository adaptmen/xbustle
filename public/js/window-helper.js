/*jslint devel: true, node: true, forin: true, plusplus: true, regexp: true*/

var WindowHelper = {
    alignInBlock: function(targetBlock, parentBlock, hAlign, vAlign) {
        let tWidth = $(targetBlock).width();
        let tHeight = $(targetBlock).height();
        let pWidth = $(parentBlock).width();
        let pHeight = $(parentBlock).height();
        let wDiff = pWidth - tWidth;
        let hDiff = pHeight - tHeight;
        hAlign == "left" 
            ? $(targetBlock).css({"margin-left": `0px`})
            : hAlign == "center" 
                ? $(targetBlock).css({"margin-left": `${hDiff / 2}px`}) 
                : $(targetBlock).css({"margin-left": `${hDiff}px`})
        vAlign == "top" 
            ? $(targetBlock).css({"margin-top": `0px`})
            : vAlign == "center" 
                ? $(targetBlock).css({"margin-top": `${wDiff / 2}px`}) 
                : $(targetBlock).css({"margin-top": `${wDiff}px`})
    }
}





















