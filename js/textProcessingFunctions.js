function SpanVar_AltStyle(tagParam, newSpan, textInParag){
    if(tagParam.includes("data-checkvarstyle=")){
        var style2 = tagParam.indexOf("data-checkvarstyle=") + 20;
        var wholeThing = tagParam.substring(style2, tagParam.indexOf(";",style2));
        if(style2 != -1){
            var varName = wholeThing.substring(0, wholeThing.indexOf("|")).trim();
            var varSymbol = wholeThing.substring(wholeThing.indexOf("|") + 1,wholeThing.indexOf("|",wholeThing.indexOf("|")+1)).trim();
            var varValue = parseInt(wholeThing.substring(wholeThing.indexOf("|",wholeThing.indexOf("|")+1) +1,wholeThing.length));
            switch (varSymbol) {
                case "==":
                    if(window[varName] == varValue){
                        break;
                    }else{
                        styleVisible = false;
                        //i = textInParag.indexOf(">", i); //jump to end of span tag
                    }
                    break;
                case "!=":
                    if(window[varName] != varValue){
                        break;
                    }else{
                        styleVisible = false;
                        //i = textInParag.indexOf(">", i); //jump to end of span tag
                    }
                    break;
                case "/=":
                    if(window[varName] <= varValue){
                        break;
                    }else{
                        styleVisible = false;
                        //i = textInParag.indexOf(">", i); //jump to end of span tag
                    }
                    break;
                case "\\=":
                    if(window[varName] >= varValue){
                        break;
                    }else{
                        styleVisible = false;
                        //i = textInParag.indexOf(">", i); //jump to end of span tag
                    }
                    break;
                case "\\":
                    if(window[varName] > varValue){
                        break;
                    }else{
                        styleVisible = false;
                        //i = textInParag.indexOf(">", i); //jump to end of span tag
                    }
                    break;
                case "/":
                    if(window[varName] < varValue){
                        break;
                    }else{
                        styleVisible = false;
                        //i = textInParag.indexOf(">", i); //jump to end of span tag
                    }
                    break;
            }
        }
    }
}
function SpanAltColor(tagParam, newSpan){
    if(tagParam.includes("data-altcolor=")){
        style = tagParam.indexOf("data-altcolor=") + 15;
        if(style != -1){
            newSpan.dataset.altcolor = tagParam.substring(style, tagParam.indexOf(";",style));
            newSpan.addEventListener("click", function(){
                if(typeof this.dataset.altcolor !== "undefined"){
                    this.style.color = this.dataset .altcolor;
                }
            });
        }
    }
}
function SpanAltText_click(tagParam, newSpan){
    if(tagParam.includes("data-alttext-click=")){
        style = tagParam.indexOf("data-alttext-click=") + 20;
        if(style != -1){
            newSpan.dataset.alttext = tagParam.substring(style, tagParam.indexOf(";",style));
            newSpan.addEventListener("click", function(){
                if(typeof this.dataset.alttext !== "undefined"){
                    this.innerHTML = this.dataset.alttext;
                }
            });
        }
    }
}
function SpanAltText_hover(tagParam, newSpan){
    if(tagParam.includes("data-alttext-hover=")){
        style = tagParam.indexOf("data-alttext-hover=") + 20;
        if(style != -1){
            newSpan.dataset.alttext = tagParam.substring(style, tagParam.indexOf(";",style));
            newSpan.addEventListener("mouseover", function(){
                this.style.width = this.offsetWidth + "px";
                this.dataset.orginal = this.innerHTML;
                this.innerHTML = this.dataset.alttext;
            });
            newSpan.addEventListener("mouseout", function(){
                this.innerHTML = this.dataset.orginal;
                this.style.width = "";
            });
        }
    }
}
function ChangeSpanStyle_Color(tagParam, newSpan){
    if(tagParam.includes("color:")){
        style = tagParam.indexOf("color:") + 6;	//reading color from style
        if(style != -1){
            newSpan.style.color = tagParam.substring(style, tagParam.indexOf(";",style)); //take value from string
        }
    }
}
function ChangeSpanStyle_FontStyle(tagParam, newSpan){
    if(tagParam.includes("font-style:")){
        style = tagParam.indexOf("font-style:") + 11;
        if(style != -1){
            newSpan.style.fontStyle = tagParam.substring(style, tagParam.indexOf(";",style));
        }
    }
}
function ChangeSpanClass(tagParam, newSpan){
    if(tagParam.includes("class=")){
        style = tagParam.indexOf("class=") + 7;
        if(style != -1){
            newSpan.className = tagParam.substring(style, tagParam.indexOf(";",style));
        }
    }
}
function ChangeParagSfx(tagParam, newSpan){
    if(tagParam.includes("data-sfx=")){
        style = tagParam.indexOf("data-sfx=") + 10;
        if(style != -1){
            newSpan.dataset.sfx = tagParam.substring(style, tagParam.indexOf(";",style));
        }
    }
}
function ChangeTypingDelay(tagParam, newSpan){
    if(tagParam.includes("data-basetime=")){ //check if line has special typing time definition
        style = tagParam.indexOf("data-basetime=") + 15;
        if(style != -1){
            baseTimeEdit = parseInt(tagParam.substring(style, tagParam.indexOf(";",style)));
        }
    }
}
function ChangeLineEndDelay(tagParam, newSpan){
    if(tagParam.includes("data-timemulti=")){ //check if line has special typing time definition
        style = tagParam.indexOf("data-timemulti=") + 16;
        if(style != -1){
            multplier = parseInt(tagParam.substring(style, tagParam.indexOf(";",style)));
        }
    }
}
function LinkToNextChapter(tagParam, newSpan){
    if(tagParam.includes("data-nextchapter=")){
        style = tagParam.indexOf("data-nextchapter=") + 18;
        if(style != -1){
            newSpan.dataset.nextchapter = tagParam.substring(style, tagParam.indexOf(";",style));
            if(tagParam.includes("data-addvar=")){
                var style2 = tagParam.indexOf("data-addvar=") + 13;
                var wholeThing = tagParam.substring(style2, tagParam.indexOf(";",style2));
                if(style2 != -1){
                    newSpan.dataset.addvar = wholeThing;
                }
                newSpan.addEventListener("click", function(){
                    if(typingEnded == 1){
                        var varName = this.dataset.addvar.substring(0, this.dataset.addvar.indexOf("|")).trim();
                        var varValue = parseInt(this.dataset.addvar.substring(this.dataset.addvar.indexOf("|") + 1, this.dataset.addvar.length));
                        window[varName] += varValue;
                    }
                });
            }
            if(tagParam.includes("data-save=")){                                  //wywoływanie funkcji musi być ostanim eventem
                newSpan.addEventListener("click", function(){                   //ponieważ wywołanie tej funkcji zmienia wartość typingEnded na 0
                    if(typingEnded == 1){                                            //a wszystkie funkcje dodane do teg przycisku mogą się wykonać jednynie
                        currentChapter = typingText(this.dataset.nextchapter, true); //gdy wypisywanie tekstu zostanie zakończone
                        if(typeof this.dataset.sfx !== "undefined"){
                            document.querySelector("main").className = this.dataset.sfx;
                        }else{
                            document.querySelector("main").className = "";
                        }
                    }
                });
            }else{
                newSpan.addEventListener("click", function(){
                    if(typingEnded == 1){
                        currentChapter = typingText(this.dataset.nextchapter);
                        if(typeof this.dataset.sfx !== "undefined"){
                            document.querySelector("main").className = this.dataset.sfx;
                        }else{
                            document.querySelector("main").className = "";
                        }
                    }
                });
            }
        }
    }
}
