
var styleVisible = true;
var baseTimeEdit = 0;
var multplier = 1;
var t1;
var t2;
async function typingText(chapterID, savePoint = false){
    t1 = performance.now();
    //variables
    typingEnded = 0;
    var chapter = document.querySelectorAll("#"+ chapterID + " > p");
    var box = document.querySelector("main");
    box.innerHTML = "";
    var currentStyle = "";
    var inSpan = false;
    var baseTime = 50;
    baseTimeEdit = baseTime;
    var chapersIndex = 0;
    var style;
    localStorage['current'] = chapterID;
    if(savePoint){
        localStorage['savePoint'] = chapterID;
    }
    for(g = 0; g < chapter.length; g++){
        var text = chapter[g].innerHTML; //contains single line
        var t = document.createElement("P");
        multplier = 5;
        styleVisible = true;
        box.appendChild(t);
        var defalutText = document.createElement("SPAN");
        t.appendChild(defalutText);
            for(i = 0; i < text.length; i++){
                if(text.charAt(i) == "<" && text.charAt(i+1) == "s" && text.charAt(i+1) != "/"){ //adding styling to words by putting them inside span element
                    currentStyle = document.createElement("SPAN");
                    var spanContent = text.substring(i + 1, text.indexOf(">",i));

                    ChangeSpanStyle_FontStyle(spanContent, currentStyle);
                    SpanVar_AltStyle(spanContent, currentStyle, text)
                    if(styleVisible){
                        ChangeSpanStyle_Color(spanContent, currentStyle);
                        ChangeTypingDelay(spanContent, currentStyle);
                        ChangeLineEndDelay(spanContent, currentStyle);
                        ChangeSpanClass(spanContent, currentStyle);
                        SpanAltText_click(spanContent, currentStyle);
                        ChangeParagSfx(spanContent, currentStyle);
                        SpanAltColor(spanContent, currentStyle);
                        SpanAltText_hover(spanContent, currentStyle);
                        LinkToNextChapter(spanContent, currentStyle);

                    }
                    if(spanContent.includes("data-checkvarvisible=")){
                        var style2 = spanContent.indexOf("data-checkvarvisible=") + 22;
                        var wholeThing = spanContent.substring(style2, spanContent.indexOf(";",style2));
                        if(style2 != -1){
                            var varName = wholeThing.substring(0, wholeThing.indexOf("|")).trim();
                            var varSymbol = wholeThing.substring(wholeThing.indexOf("|") + 1,wholeThing.indexOf("|",wholeThing.indexOf("|")+1)).trim();
                            var varValue = parseInt(wholeThing.substring(wholeThing.indexOf("|",wholeThing.indexOf("|")+1) +1,wholeThing.length));
                            console.log(varSymbol);
                            switch (varSymbol) {
                                case "==":
                                    if(window[varName] == varValue){
                                        inSpan = true;
                                        i = text.indexOf(">", i); //jump to end of span tag
                                        t.appendChild(currentStyle);
                                    }else {
                                        console.log("tet");
                                        i = text.indexOf("<", text.indexOf(">", i)) + 6;
                                        inSpan = false;
                                    }
                                    break;
                                case "!=":
                                    if(window[varName] != varValue){
                                        inSpan = true;
                                        i = text.indexOf(">", i); //jump to end of span tag
                                        t.appendChild(currentStyle);
                                    }else {
                                        console.log("tet");
                                        i = text.indexOf("<", text.indexOf(">", i)) + 6;
                                        inSpan = false;
                                    }
                                    break;
                                case "/=":
                                    if(window[varName] <= varValue){
                                        inSpan = true;
                                        i = text.indexOf(">", i); //jump to end of span tag
                                        t.appendChild(currentStyle);
                                    }else {
                                        console.log("tet");
                                        i = text.indexOf("<", text.indexOf(">", i)) + 6;
                                        inSpan = false;
                                    }
                                    break;
                                case "\\=":
                                    if(window[varName] >= varValue){
                                        inSpan = true;
                                        i = text.indexOf(">", i); //jump to end of span tag
                                        t.appendChild(currentStyle);
                                    }else {
                                        console.log("tet");
                                        i = text.indexOf("<", text.indexOf(">", i)) + 6;
                                        inSpan = false;
                                    }
                                    break;
                                case "\\":
                                    if(window[varName] > varValue){
                                        inSpan = true;
                                        i = text.indexOf(">", i); //jump to end of span tag
                                        t.appendChild(currentStyle);
                                    }else {
                                        console.log("tet");
                                        i = text.indexOf("<", text.indexOf(">", i)) + 6;
                                        inSpan = false;
                                    }
                                    break;
                                case "/":
                                if(window[varName] < varValue){
                                    inSpan = true;
                                    i = text.indexOf(">", i); //jump to end of span tag
                                    t.appendChild(currentStyle);
                                }else {
                                    console.log("tet");
                                    i = text.indexOf("<", text.indexOf(">", i)) + 6;
                                    inSpan = false;
                                }
                                    break;
                            }
                    }
                    }else{
                        inSpan = true;
                        i = text.indexOf(">", i); //jump to end of span tag
                        t.appendChild(currentStyle);
                    }
                }else if(text.charAt(i) == "<" && text.charAt(i+1) == "/"){ //chceck for closed tag
                    i = text.indexOf(">", i);
                    inSpan = false;
                    baseTimeEdit = baseTime;
                    defalutText = document.createElement("SPAN");
                    //currentText = "";
                    t.appendChild(defalutText);
                }else{ //add text to paragraph
                    if(inSpan){
                        if(text.charAt(i) == " "){
                            currentStyle.innerHTML += "&nbsp;";
                            await sleep(baseTimeEdit * 2);
                        }else{
                            currentStyle.innerHTML += text.charAt(i);
                            await sleep(baseTimeEdit);
                        }
                    }else{
                        if(text.charAt(i) == " "){
                            defalutText.innerHTML += "&nbsp;";
                            await sleep(baseTimeEdit * 1.3);
                        }else{
                            defalutText.innerHTML += text.charAt(i);
                            await sleep(baseTimeEdit);
                        }

                    }
                }
            }
        //currentText = "";
        if(t.innerHTML == ""){
            box.removeChild(box.lastChild);
        }
        if(g != chapter.length -1 && t.innerHTML != ""){
            await sleep(baseTime * multplier);
        }
    }
    t2 = performance.now();
    console.log("Call to doSomething took " + (t2 - t1) + " milliseconds.");
    return 1;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
