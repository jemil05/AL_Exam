var ls = window.localStorage;
var date = new Date();
var time = date.getTime();
var product = null;

window.onload = () => {
	updateTable();
}

function updateTable() {
	var txt = "<table id='products'><tr id='table-title'><th>Name</th><th>Description</th><th>Photo</th><th>Featured?</th><th>Edit</th><th>Delete</th></tr>";
	var pl = SortProductKeys();
	for(i = pl.length - 1; i >= 0; i--) {
		txt += "<tr>";
		var data = JSON.parse(ls.getItem(pl[i]));
		txt += "<td class='cname'>" + data["pname"] + "</td>";
		txt += "<td class='cdescription'>" + data["pdescription"] + "</td>";
		txt += "<td class='cphoto'><img src='" + data["pphoto"] + "' style='height:200px'></td>";
		txt += "<td class='cfeatured'>" + data["pfeatured"] + "</td>";
		txt += "<td class='cedit'><button onclick='updateProduct(this.id)' id='e&" + data['ptime'] + "'>Edit</button></td>";
		txt += "<td class='cdelete'><button onclick='deleteProduct(this.id)' id='d&" + data['ptime'] + "'>Delete</button></td>";
		txt += "</tr>";
	}
	txt += "</table>";
	document.getElementById("table").innerHTML = txt;
	document.getElementById("total").innerHTML = "Number of Products: " + ls.length;
	time = date.getTime();
}

function addProduct() {
	var name = document.getElementById("name").value;
	var description = document.getElementById("description").value;
	var photo = document.getElementById("photo").value;
	var featured = document.getElementById("featured").checked;
	console.log("a" + time);
	var k = keyChecker(time);
	console.log("b" + time);
	time = k;
	product = {
		ptime : k,
		pname : name,
		pdescription : description,
		pphoto : photo,
		pfeatured : featured
	};
	console.log("d" + time);
	var productInfo = JSON.stringify(product);
	ls.setItem(k, productInfo);
	// loadAllProducts();
	document.getElementById("name").value = null;
	document.getElementById("description").value = null;
	document.getElementById("photo").value = null;
	document.getElementById("featured").value = false;
	updateTable();
}

function updateProduct(id) {
	var prod = JSON.parse(ls.getItem(id.split("&")[1]));
	var otime = id.split("&")[1];
	time = parseInt(otime);
	console.log("c" + time);
	document.getElementById("name").value = prod["pname"];
	document.getElementById("description").value = prod["pdescription"];
	document.getElementById("photo").value = prod["pphoto"];
	document.getElementById("featured").value = prod["pfeatured"];
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}

function deleteProduct(id) {
	var otime = id.split("&")[1];
	time = parseInt(otime);
	ls.removeItem(time);
	updateTable();
}

function keyChecker(ptime) {
	var v = 0;
	for(i = ls.length - 1; i >= 0; i--) {
		console.log("x" + JSON.parse(ls.getItem(ls.key(i)))["ptime"]);
		if(time == parseInt( JSON.parse(ls.getItem(ls.key(i)))["ptime"])) {
			alert("match");
			console.log("return" + time);
			ls.removeItem(parseInt( JSON.parse(ls.getItem(ls.key(i)))["ptime"]));
			return ptime;
		}
		else {
			ptime = date.getTime();
		}
	}
	return ptime;
}

function SortProductKeys(){
	if(ls.length > 0){
		var productArray = new Array();
		for (k=0; k<ls.length; k++){
			productArray[k] = localStorage.key(k);
		}
	}
	var sortedProducts = productArray.sort();
	return sortedProducts;
}
