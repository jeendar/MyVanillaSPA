function Menu(defaultMenu){
	this.currentDivId = defaultMenu;
}

var $ = function(selector){
	return new Dom(selector);
}

function Dom(selector){
	if(selector.startsWith("#")){
		this.elements = [document.getElementById(selector.substring(1))];
	}
	else{
		var result = document.getElementByTagName(selector);
		this.elements = [];
		for (var i = 0; i < result.length; i++) {
			this.elements.push(result.item(i));
		}
	}
}

Dom.prototype.html = function(content){
	if(content == undefined){
		var s = "";
		for (var i = 0; i < this.elements.length; i++) {
			s += this.elements[i].innerHTML;
		}
		return s;
	}
	else{
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].innerHTML = content;
		}
	}
}

Dom.prototype.display = function(value){
	if(value == undefined){
		return this.elements[0].style["display"];
	}
	else{
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style["display"] = value;
		}
	}
}

Dom.prototype.reverseDisplay = function(value){
	for (var i = 0; i < this.elements.length; i++) {
		var element = this.elements[i];
		if(element.style["display"] == "none" || element.style["display"] == ""){
			element.style["display"] = "block";
		}
		else{
			element.style["display"] = "none";
		}
	}
}

Menu.prototype.show = function(id){
	$("#" + this.currentDivId).display("none");
	$("#" + id).display("block");
	this.currentDivId = id;
}

function showFloatMenu(id){
	$("#" + id).reverseDisplay("block");
}
