var ls = window.localStorage;
var counter = 0;
var duration = 5000;
var flag = 1;
function loopingImages() {
    var pl = SortProductKeys();
    var j = counter%(pl.length);
    var data = JSON.parse(ls.getItem(pl[j]));
    document.getElementById("image-container").innerHTML = "<img class='w3-animate-left' onmouseenter='freeze()' onmouseout='continuous()' id='photo' src='" + data["pphoto"] + "'>";
    document.getElementById("product-name").innerHTML = data["pname"];
    document.getElementById("product-description").innerHTML = data["pdescription"];
}

function freeze() {
    flag = 0;
}

function continuous() {
    flag = 1;
}

function counterUpdate() {
    counter += flag;
}

function SortProductKeys(){
    if(ls.length > 0){
        var productArray = new Array();
        var t = 0;
        for (k=0; k<ls.length; k++){
            if(JSON.parse(ls.getItem(ls.key(k)))["pfeatured"]) {
                productArray[t++] = ls.key(k);
            }
        }
    }
    var sortedProducts = productArray.sort();
    return sortedProducts;
}

setInterval(loopingImages, 1);
setInterval(counterUpdate, 5000);
