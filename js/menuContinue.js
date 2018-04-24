if(typeof localStorage['savePoint'] !== 'undefined'){
    var cnt = document.createElement("A");
    cnt.href = "game.html";
    var str = "Continue";
    for(i = 0; i < str.length; i++){
        var tet = document.createElement("SPAN");
        tet.innerHTML = str.charAt(i);
        cnt.appendChild(tet);
    }
    cnt.onclick = "function(){localStorage['current'] = null}"
    document.querySelector("main > #continue").appendChild(cnt);
}
