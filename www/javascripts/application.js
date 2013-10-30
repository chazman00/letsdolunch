	
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
        options.filter="Peter"; 
        var fields = ["displayName", "name", "nickname", "emails"];
        //navigator.contacts.find(fields, onContactSuccess, onContactError, options);
    }
	
	function textChanged(elm)
	{
		var options = new ContactFindOptions();
        options.filter=elm.value; 
		options.multiple=true;
        var fields = ["displayName", "name", "nickname", "emails"];
        navigator.contacts.find(fields, onContactSuccess, onContactError, options);
	}

    // onSuccess: Get a snapshot of the current contacts
    //
    function onContactSuccess(contacts) {
	
		
		/*
		 List
		 ------------

			<div class="topcoat-list__container">
			  <h3 class="topcoat-list__header">Category</h3>
			  <ul class="topcoat-list">
				<li class="topcoat-list__item">
				  Item
				</li>
				<li class="topcoat-list__item">
				  Item
				</li>
				<li class="topcoat-list__item">
				  Item
				</li>
			  </ul>
			</div>

		*/
		var searchDiv = document.getElementById("contactsSearch");
		var divCont = document.createElement("div");
		//divCont.setAttribute("class","topcoat-list__container");
		var list = document.createElement("ul");
		//list.setAttribute("class","topcoat-list");	
		searchDiv.appendChild(divCont);
		divCont.appendChild(list);
        for (var i=0; i<contacts.length; i++) {					
			var listItem = document.createElement("li");
			//listItem.setAttribute("class","topcoat-list__item");		
			listItem.setAttribute("id","contact"+i);	
			//listItem.setAttribute("ontouchend","submitContacts('this')");
            var txt = document.createTextNode(contacts[i].name.formatted);
			listItem.appendChild(txt);
			list.appendChild(listItem);

			
        }
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