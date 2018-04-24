if(localStorage['current'] !== null){
    var currentChapter = typingText(localStorage['savePoint']);
}else{
    var currentChapter = typingText(localStorage['current']);
}
var typingEnded;
