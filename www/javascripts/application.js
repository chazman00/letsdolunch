
// steroids.view.navigationBar.show("Hello World");
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
		divCont.setAttribute("class","topcoat-list__container");
		var list = document.createElement("ul");
		list.setAttribute("class","topcoat-list");	
		searchDiv.appendChild(divCont);
		divCont.appendChild(list);
        for (var i=0; i<contacts.length; i++) {					
			var listItem = document.createElement("li");
			listItem.setAttribute("class","topcoat-list__item");		
			listItem.setAttribute("id","contact"+i);			
            var txt = document.createTextNode(contacts[i].name.formatted);
			listItem.appendChild(txt);
			list.appendChild(listItem);
			
        }
    }

    // onError: Failed to get the contacts
    //
    function onContactError(contactError) {
        alert('onError!');
    }