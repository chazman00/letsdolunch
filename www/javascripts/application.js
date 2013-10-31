	
steroids.view.navigationBar.show("Let's Do Lunch");

function ldlonload() {
	StackMob.init({
	  publicKey: "0d9e876e-1f32-4fb8-ab2f-b66f57e6ad78",
	  apiVersion: 0
	});

}
/*
function createEvent() {

	var Contact = StackMob.Model.extend({
	  schemaName: 'contact'  //schemaName must be lowercase
	});
	
	var Location = StackMob.Model.extend({
	  schemaName: 'location'  //schemaName must be lowercase
	});
	
	var Event = StackMob.Model.extend({
	  schemaName: 'event'  //schemaName must be lowercase
	});
	
	var event = new Event({
		owner: 'Charles',
		status: 'In Progress'
	});
	
	var contact1 = new Contact( {
		name: "Charles Nordine",
		email: "cnordine@gmail.com",
		sms: "7175766541"
	});
	
	var contact2 = new Contact( {
		name: "Rich Krott",
		email: "rich.krott@gmail.com",
		sms: "7175853666"
	});
	
	event.addRelationship('contacts', [contact1, contact2], {
		success: function(model, result, options) {
			//Now that StackMob's done saving the new Todos and updated the User's field,
			//Let's view the todos.
			var allevents = new Event();
			allevents.fetch({
			  success: function(collection, result, options) {
				console.debug(collection.toJSON()); //You'll find the allevents are now saved on StackMob.
			  }
			});
		console.debug(model.toJSON());
			
		}
		
	});
	

}

*/
function scheduleEvent() {
	//createEvent();
	window.location = "index.html";
}


function showModal(modal) {
  var webView = new steroids.views.WebView(modal);
  steroids.modal.show(webView);
  
  
}

function onDeviceReady() {
        // find all contacts with 'Bob' in any name field
        var options = new ContactFindOptions();
        options.filter="Rachel"; 
		//options.multiple=true;
        var fields = ["displayName", "name", "nickname", "emails"];
        navigator.contacts.find(fields, onContactSuccess, onContactError, options);
    }
	
	function textChanged(value)
	{
		var options = new ContactFindOptions();
        options.filter=value; 
		options.multiple=true;
        var fields = ["displayName", "name", "nickname", "emails"];
        //navigator.contacts.find(fields, onContactSuccess, onContactError, options);
	}

    // onSuccess: Get a snapshot of the current contacts
    //
    function onContactSuccess(contacts) {
		var html = "";
		var ul = $( "#autocomplete" );
		$.each( contacts, function ( i,contact ) {
			var emailHTML = "";
			$.each(contact.emails, function (j, email) {
				emailHTML += email.value + "<br/>";
			});
			html += "<li><a href='#'><h2>" +contact.name.formatted + "</h2><p>"+ emailHTML +"</p></a></li>";
		});
		ul.html( html );
		ul.listview( "refresh" );
		ul.trigger( "updatelayout");
		
		/*
		

		
		var searchDiv = document.getElementById("contactsSearch");
		var divCont = document.createElement("div");
		//divCont.setAttribute("class","topcoat-list__container");
		var list = document.createElement("ul");
		list.setAttribute("data-role","listview");	
		searchDiv.appendChild(divCont);
		divCont.appendChild(list);
        for (var i=0; i<contacts.length; i++) {		
			$("#contactsSearch").append("<li><a href='#'>" + contacts[i].name.formatted + "</a></li>");
			
			var listItem = document.createElement("li");
			listItem.setAttribute("class","topcoat-list__item");		
			listItem.setAttribute("id","contact"+i);	
			//listItem.setAttribute("ontouchend","submitContacts('this')");
            var txt = document.createTextNode();
			listItem.appendChild(txt);
			list.appendChild(listItem);
			*/
			
    }
    
	
	function submitContacts(element) {
		//var data = $("#datadiv");
		/*
		jQuery.document(data, "contacts", $(function { 
			var ids = new Object();
			$("#contact*").each(function(index, item) {
					ids[index] = $(item).text();
				});
			return ids;
			
		})); */
		var msg = {contact: $(element).text()};
		window.postMessage(msg, "*");
		
		steroids.modal.hide();
	} 
	
    // onError: Failed to get the contacts
    //
    function onContactError(contactError) {
        alert('onError!');
    }