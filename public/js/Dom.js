function Dom(selector) {
	if(selector.startsWith("#")){
		this.elements = [document.getElementById(selector.substring(1))]; //array of elements
	}
	else{
		var result = document.getElementByTagName(selector);
		this.elements = [];
		for(var i = 0; i < result.length; i++){
			this.elements.push(result.item(i));
		}
	}
}

Dom.prototype.value = function(content) {
	if(content == undefined){
		var s = "";
		for (var i = 0; i < this.elements.length; i++) {
			s += this.elements[i].value;
		}
	return s;
	}
	else {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].value = content;
		}
	}
}

Dom.prototype.html = function(content) {
	if(content == undefined){
		var s = "";
		for (var i = 0; i < this.elements.length; i++) {
			s += this.elements[i].innerHTML;
		}
	return s;
	}
	else {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].innerHTML = content;
		}
	}
}

Dom.prototype.display = function(value) {
	if(value == undefined){
		return this.element[0].style["display"];
	}
	else{
	for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style["display"] = value;
		}
	}
}

Dom.prototype.reverseDisplay = function(value) {
	for (var i = 0; i < this.elements.length; i++) {
			if(this.elements[i].style["display"] == "none" ||
				this.elements[i].style["display"] == ""){
				this.elements[i].style["display"] = "block";
			}
			else{
				this.elements[i].style["display"] = "none";
			}
		}
}

var $ = function(selector) {
	return new Dom(selector);
}