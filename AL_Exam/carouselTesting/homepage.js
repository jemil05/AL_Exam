var ls = window.localStorage;
var counter = 0;
var t = 2000;
function loopingImages() {
    var pl = SortProductKeys();
    var j = counter%(pl.length);
    var data = JSON.parse(ls.getItem(pl[j]));
    document.getElementById("image-container").innerHTML = "<img onmouseenter='freeze()' onmouseout='continuous()' id='photo' src='" + data["pphoto"] + "'>";
    counter++;
}

// function displayImage() {
    // 	var time = t;
    // 	setInterval(loopingImages, time);
    // }
    
window.onload = () => {
    setInterval(loopingImages, 2000);
    // loopingImages();
}

function freeze() {
    // setInterval(loopingImages, 2000);
}

function continuous() {
    // setInterval(loopingImages, 2000);
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
