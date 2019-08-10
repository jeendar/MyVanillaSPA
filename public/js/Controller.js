function getAuthor(){
	$.get(
		"ajax/test",
		{
				"Author" : Ajax.getValue("Author"),
				"autre" : "autre"
		},
		action
	);
}

function action(text, xml){
	Ajax.html("result", "<h4>" + text + "</h4>");
	
}
