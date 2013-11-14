
function Contact(cordovaContact) {	
	alert(cordovaContact);
	this.deviceID = cordovaContact.id;
	this.salutation = cordovaContact.name.honorificPrefix;
	this.first = cordovaContact.name.givenName;
	this.last = cordovaContact.name.familyName;
	if (cordovaContact.emails) {
		this.email = cordovaContact.emails[0].value;
	}
	if (cordovaContact.phoneNumbers) {
		this.smsNumber = cordovaContact.phoneNumbers[0].value;
	}
	if (cordovaContact.photos) {
		this.photo = cordovaContact.photos[0].value;
	}
	this.address = cordovaContact.addresses[0].formatted;
	//this.User = User;
	
}

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
	$("#autocomplete").on( "listviewbeforefilter", function (  qq, data ) {
		var $ul = $( this ),
			$input = $( data.input ),
			value = $input.val(),
			html = "";
			
		$ul.html( "" );
		if ( value && value.length > 2 ) {
			var options = new ContactFindOptions();
			options.filter=value ; 
			options.multiple=true;
			var fields = ["displayName", "name", "nickname", "emails"];
			navigator.contacts.find(fields, onContactSuccess, onContactError, options);

		}
	});
}

var curPosition; 
var onGeoSuccess = function(position) {
	curPosition = position;
	  /*alert('Latitude: '          + curPosition.coords.latitude          + '\n' +
          'Longitude: '         + curPosition.coords.longitude         + '\n' +
          'Altitude: '          + curPosition.coords.altitude          + '\n' +
          'Accuracy: '          + curPosition.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + curPosition.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + curPosition.coords.heading           + '\n' +
          'Speed: '             + curPosition.coords.speed             + '\n' +
          'Timestamp: '         + curPosition.timestamp                + '\n'); */
		
};
 
// onError Callback receives a PositionError object
//
function onError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}

function onLocationReady() {
	
	
        // find all contacts with 'Bob' in any name field
	$("#autocomplete").on( "listviewbeforefilter", function (  qq, data ) {
		var $ul = $( this ),
			$input = $( data.input ),
			value = $input.val(),
			html = "";
			
		$ul.html( "" );
		if ( value && value.length > 2 ) {
					
		console.log(value);	
		var auth = { 
				  //
				  // Update with your auth tokens.
				  //
				  consumerKey: "xtbTqL89sPsFQw`bogFkxdw", 
				  consumerSecret: "svxtxyaVSsaIvW4hPZzC5_MDFWY",
				  accessToken: "5iMttq_dKNPjWLdYjNNJ6nhuKXe-KW3c",
				  // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
				  // You wouldn't actually want to expose your access token secret like this in a real application.
				  accessTokenSecret: "6T7eUEqzG5gGprmK7ra-QHZVhaY",
				  serviceProvider: { 
					signatureMethod: "HMAC-SHA1"
				  }
				};
				
				var accessor = {
				  consumerSecret: auth.consumerSecret,
				  tokenSecret: auth.accessTokenSecret
				}; 
				//alert(curPosition.coords.latitude);
				//alert(curPosition.coords.longitude);
				var lat = curPosition.coords.latitude.toString().substring(0,9);
				var lon = curPosition.coords.longitude.toString().substring(0,10);
				//alert("lat: "+lat+"\n long: "+lon);
				var ll = lat+","+lon; //+","+curPosition.coords.accuracy;
				console.log(ll);
				parameters = [];
				parameters.push(['term', value]);
				parameters.push(['near', 'Harrisburg+PA']);
				parameters.push(['callback', 'cb']);
				parameters.push(['oauth_consumer_key', auth.consumerKey]);
				parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
				parameters.push(['oauth_token', auth.accessToken]);
				parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

				var message = { 
				  'action': 'http://api.yelp.com/v2/search',
				  'method': 'GET',
				  'parameters': parameters 
				};

				OAuth.setTimestampAndNonce(message);
				OAuth.SignatureMethod.sign(message, accessor);

				var parameterMap = OAuth.getParameterMap(message.parameters);
				parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
				console.log(parameterMap);
				
				
				$.ajax({
				  'url': message.action,
				  'data': parameterMap,
				  'cache': true,
				  'dataType': 'jsonp',
				  'jsonpCallback': 'cb',
				  'success': function(data, textStats, XMLHttpRequest) {
					//append to autocomplete
					var html = "";
					var ul = $( "#autocomplete" );
					alert(data);
					$.each( data.businesses, function ( i,biz ) {		
						alert(biz);
						html += "<li id='selectedContact"+i+"'><img src='"+biz.image_url+"'/><h2>" +biz.name + "</h2><p id='"+biz.id+"'>"+ biz.location.display_address +"</p><p><img src='"+biz.rating_img_url_small+"'/></p></li>";
					});
					ul.html( html );
					ul.listview( "refresh" );
					ul.trigger( "updatelayout");
				  }
				});
			
			


			

		}
	});
}





    // onSuccess: Get a snapshot of the current contacts
    //
    function onContactSuccess(contacts) { 
		var html = "";
		var ul = $( "#autocomplete" );
		$.each( contacts, function ( i,cordContact ) {
			var cont = new Contact(cordContact);			
			var email = "";
			if (cordContact.emails) {
				email = cordContact.emails[0].value
			}
			html += "<li id='selectedContact"+i+"'><a ontouchend='selectContact(this)'><h2>" +cordContact.name.formatted + "</h2><p id='"+cordContact.id+"'>"+ email +"</p></a></li>";
		});
		ul.html( html );
		ul.listview( "refresh" );
		ul.trigger( "updatelayout");

			
    }  
	
	function selectContact(element) {
		// add contact to selected Div
		
		$("#selected").append($(element).parent());
		
		//clear form
		var ul = $("#autocomplete");
		ul.html("");
		ul.listview( "refresh" );
		ul.trigger( "updatelayout");
		// put focus on form
			
	}
	
    
	
	function submitContacts() {
		var data = $("#selected");
		/*
		jQuery.document(data, "contacts", $(function { 
			var ids = new Object();
			$("#contact*").each(function(index, item) {
					ids[index] = $(item).text();
				});
			return ids;
			
		})); */
		
		var msg =  $(data).html();
		window.postMessage(msg, "*");
		
		steroids.modal.hide();
	} 
	
    // onError: Failed to get the contacts
    //
    function onContactError(contactError) {
        alert('onError!');
    }