var ls = window.localStorage;
var counter = 0;
var flag = 1;
// var t = 2000;
var duration = 5000;
function loopingImages() {
    var pl = SortProductKeys();
    var j = counter%(pl.length);
    var data = JSON.parse(ls.getItem(pl[j]));
    document.getElementById("image-container").innerHTML = "<img onmouseenter='freeze()' onmouseout='continuous()' id='photo' src='" + data["pphoto"] + "'>";
    document.getElementById("product-name").innerHTML = data["pname"];
    document.getElementById("product-description").innerHTML = data["pdescription"];
    // document.getElementById("image-container").innerHTML = "<img onmouseenter='freeze()' onmouseout='continuous()' id='photo' src='" + data["pphoto"] + "'>";
    console.log(flag);
    counter += flag;
    console.log(duration);
}

// function displayImage() {
    // 	var time = t;
    // 	setInterval(loopingImages, time);
    // }
    
window.onload = () => {
    setInterval(loopingImages, duration);
    // loopingImages();
}

function freeze() {
    flag = 0;
    // duration = 999999999;
    // alert("enter");
    // setInterval(loopingImages, 2000);
}

function continuous() {
    flag = 1;
    // duration = 1000;
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
