// Current GeoLocation - is a Cordova position object
var curPosition;
// The list returned from the phone of cordova contacts
var cordovaContacts = new Array();
// The list returned from the phone of cordova contacts
var yelpResults = new Array();
// Reference to the event being created.
var ldlEvent;
// The list of contacts for the event.
var ldlContacts = new Array();
// The list of locations for the event.
var ldlLocations = new Array();

function cordContact(cordovaContact) {
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
	// this.User = User;

}

function scheduleEvent() {
	// Create new persisted event and add the date/time values as well as the
	// stored contacts and locations.
	var evtdate = document.getElementById('startdate').valueAsDate;
	var evtstarttime = document.getElementById('starttime').valueAsDate;
	var evtendtime = document.getElementById('endtime').valueAsDate;
	var timeoffset = (new Date()).getTimezoneOffset() / 60;
	evtstarttime.setUTCFullYear(evtdate.getUTCFullYear());
	evtstarttime.setUTCMonth(evtdate.getUTCMonth());
	evtstarttime.setUTCDate(evtdate.getUTCDate());
	evtstarttime.setUTCHours(evtstarttime.getUTCHours() + timeoffset);
	evtendtime.setUTCFullYear(evtdate.getUTCFullYear());
	evtendtime.setUTCMonth(evtdate.getUTCMonth());
	evtendtime.setUTCDate(evtdate.getUTCDate());
	evtendtime.setUTCHours(evtendtime.getUTCHours() + timeoffset);
	
	var sessionContacts;
	if (window.localStorage.getItem('sessionContacts'))
	{
		sessionContacts = JSON.parse(window.localStorage.getItem('sessionContacts'));
	}
	else
	{
		return false;
	}
		
	ldlEvent = new Event({
		name : ('Lunch - ' + evtstarttime.toLocaleDateString() + evtstarttime.toLocaleTimeString()),
		type : 'Lunch',
		startdatetime : evtstarttime.getTime(),
		enddatetime : evtendtime.getTime(),
		sm_owner : 'RichTest'
	});

	ldlEvent.create({
		success: function(model, result, options) { 
			model.addRelationship('unverifiedcontacts', sessionContacts, {
				  success: function(model, result, options) {
					  alert('Contacts Added');
				  },
				  error: function(model, result, options) { alert('Contacts failed.' + JSON.stringify(model) + JSON.stringify(result)); }
			});
			//window.location = "index.html";
		},
		error: function(model, result, options) { alert('Event Creation Failed.' + JSON.stringify(model) + JSON.stringify(result)); }
	});
}

function showModal(modal) {
	var webView = new steroids.views.WebView(modal);
	steroids.modal.show(webView);

}

function onDeviceReady() {
	$("#autocomplete")
			.on(
					"listviewbeforefilter",
					function(qq, data) {
						var $ul = $(this), $input = $(data.input), value = $input
								.val(), html = "";

						$ul.html("");
						if (value && value.length > 2) {
							var options = new ContactFindOptions();
							options.filter = value;
							options.multiple = true;
							var fields = [ "displayName", "name", "nickname", "emails" ];
							navigator.contacts.find(fields, onContactSuccess,
									onContactError, options);
						}
					});
}

var onGeoSuccess = function(position) {
	curPosition = position;
	/*
	 * alert('Latitude: ' + curPosition.coords.latitude + '\n' + 'Longitude: ' +
	 * curPosition.coords.longitude + '\n' + 'Altitude: ' +
	 * curPosition.coords.altitude + '\n' + 'Accuracy: ' +
	 * curPosition.coords.accuracy + '\n' + 'Altitude Accuracy: ' +
	 * curPosition.coords.altitudeAccuracy + '\n' + 'Heading: ' +
	 * curPosition.coords.heading + '\n' + 'Speed: ' + curPosition.coords.speed +
	 * '\n' + 'Timestamp: ' + curPosition.timestamp + '\n');
	 */

};

// onError Callback receives a PositionError object
//
function onError(error) {
	alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function onLocationReady() {

	// find all contacts with 'Bob' in any name field
	$("#autocomplete")
			.on(
					"listviewbeforefilter",
					function(qq, data) {
						var $ul = $(this), $input = $(data.input), value = $input
								.val(), html = "";

						$ul.html("");
						if (value && value.length > 3) {

							console.log(value);
							var auth = {
								//
								// Update with your auth tokens.
								//
								consumerKey : "1IDwCJjlchLFMxmk1lrlJw",
								consumerSecret : "GiezZNt4Pk3fXC9TLazOBccKgx4",
								accessToken : "-OMQ-TPMIKhm_tXzQDFz6kUlfLAqPpT0",
								// This example is a proof of concept, for how
								// to use the Yelp v2 API with javascript.
								// You wouldn't actually want to expose your
								// access token secret like this in a real
								// application.
								accessTokenSecret : "wBcuHj-Hd-0OG9Qn76BGHT3cQfk",
								serviceProvider : {
									signatureMethod : "HMAC-SHA1"
								}
							};

							var accessor = {
								consumerSecret : auth.consumerSecret,
								tokenSecret : auth.accessTokenSecret
							};
							// alert(curPosition.coords.latitude);
							// alert(curPosition.coords.longitude);
							var lat = curPosition.coords.latitude.toString()
									.substring(0, 9);
							var lon = curPosition.coords.longitude.toString()
									.substring(0, 10);
							// alert("lat: "+lat+"\n long: "+lon);
							var ll = lat + "," + lon + ","
									+ curPosition.coords.accuracy;
							// alert(ll);
							parameters = [];
							parameters.push([ 'term', value.trim() ]);
							parameters.push([ 'll', ll ]);
							parameters.push([ 'callback', 'cb' ]);
							parameters.push([ 'oauth_consumer_key',
									auth.consumerKey ]);
							parameters.push([ 'oauth_consumer_secret',
									auth.consumerSecret ]);
							parameters
									.push([ 'oauth_token', auth.accessToken ]);
							parameters.push([ 'oauth_signature_method',
									'HMAC-SHA1' ]);

							var message = {
								'action' : 'http://api.yelp.com/v2/search',
								'method' : 'GET',
								'parameters' : parameters
							};
							// alert(parameters);
							OAuth.setTimestampAndNonce(message);
							OAuth.SignatureMethod.sign(message, accessor);

							var parameterMap = OAuth
									.getParameterMap(message.parameters);
							parameterMap.oauth_signature = OAuth
									.percentEncode(parameterMap.oauth_signature);
							console.log(parameterMap);

							$
									.ajax({
										'url' : message.action,
										'data' : parameterMap,
										'cache' : true,
										'dataType' : 'jsonp',
										'jsonpCallback' : 'cb',
										'success' : function(data, textStats,
												XMLHttpRequest) {
											// append to autocomplete
											var html = "";
											var ul = $("#autocomplete");

											if (data.businesses) {
												yelpResults = data.businesses;
											}
											$
													.each(
															data.businesses,
															function(i, biz) {
																var addr = (biz.location && biz.location.display_address) ? biz.location.display_address
																		: "";

																html += "<li id='selectedLoc"
																		+ i
																		+ "'><a id='"
																		+ i
																		+ "' ontouchend='selectLocation(this)'><img src='"
																		+ biz.image_url
																		+ "'/><h2>"
																		+ biz.name
																		+ "</h2><p id='"
																		+ biz.id
																		+ "'>"
																		+ addr
																		+ "</p><p><img src='"
																		+ biz.rating_img_url_small
																		+ "'/></p></a></li>";

															});
											ul.html(html);
											ul.listview("refresh");
											ul.trigger("updatelayout");
										},
										'error' : function(XMLHttpRequest,
												textStats, errorThrown) {
											console
													.log("error: "
															+ errorThrown);
										}
									});

						}
					});
}

function today() {
	return new Date().toJSON().slice(0, 10);
}

function selectLocation(element) {
	var ID = element.id;
	// add contact to selected Div
	var ldlLocation = createLocation(yelpResults[ID]);
	ldlLocations.push(ldlLocation);
	$("#selected").append($(element).parent());

	// clear form
	var ul = $("#autocomplete");
	ul.html("");
	ul.listview("refresh");
	ul.trigger("updatelayout");
	// put focus on form

}

function submitLocations() {
	var msg = {
		locations : JSON.stringify(ldlLocations)
	};
	window.postMessage(msg, "*");

	steroids.modal.hide();
}

function createLocation(yelpLocation) {
	var address = (yelpLocation.location) ? yelpLocation.location.display_address
			: "";
	var yelpID = yelpLocation.id;
	var businessName = yelpLocation.name;
	var imageurl = yelpLocation.image_url;
	var phone = yelpLocation.display_phone;
	var distance = yelpLocation.distance;
	var url = yelpLocation.url;
	var newLocation = new Location({
		yelpID : yelpID,
		name : businessName,
		url : url,
		address : address,
		distance : distance,
		photo : imageurl
	});
	return newLocation;
}

// ## CONTACTS ##
// onSuccess: Get a snapshot of the current contacts
//
function onContactSuccess(contacts) {
	cordovaContacts = contacts;
	var html = "";
	var ul = $("#autocomplete");
	$.each(contacts, function(i, cordContact) {
		var email = "";
		if (cordContact.emails) {
			email = cordContact.emails[0].value;
		}
		html += "<li ><a id='" + i + "' ontouchend='selectContact(this)'><h2>"
				+ cordContact.name.formatted + "</h2><p id='" + cordContact.id
				+ "'>" + email + "</p></a></li>";
	});
	ul.html(html);
	ul.listview("refresh");
	ul.trigger("updatelayout");

}

function selectContact(element) {
	var ID = element.id;
	// Test for session contacts in the session storage and manage our collection.
	var sessionContacts;
	if (window.localStorage.getItem('sessionContacts'))
	{
		sessionContacts = JSON.parse(window.localStorage.getItem('sessionContacts'));
	}
	else
	{
		sessionContacts = new Array();
	}
	sessionContacts.push(createContact(cordovaContacts[ID]));
	window.localStorage.setItem('sessionContacts', JSON.stringify(sessionContacts));
	
	// add contact to selected Div
	$("#selected").append($(element).parent());

	// clear form
	var ul = $("#autocomplete");
	ul.html("");
	ul.listview("refresh");
	ul.trigger("updatelayout");
	// put focus on form

}

// Creates an LDL unverified Contact based on the cordova Contact.
function createContact(cordovaContact) {
	var name = (cordovaContact.name) ? cordovaContact.name.formatted : "";
	var sal = (cordovaContact.name) ? cordovaContact.name.honorificPrefix : "";
	var first = (cordovaContact.name) ? cordovaContact.name.givenName : "";
	var last = (cordovaContact.name) ? cordovaContact.name.familyName : "";
	var email = (cordovaContact.emails) ? cordovaContact.emails[0].value : "";
	//var address = (cordovaContact.addresses) ? cordovaContact.addresses[0].formatted : "";
	var im = (cordovaContact.ims) ? cordovaContact.ims[0].value : "";
	var photo = (cordovaContact.photos) ? cordovaContact.photos[0].value : "";
	
	var newContact = new unverifiedContact({
		phoneid : cordovaContact.id,
		name : name,
		salutation : sal,
		firstname : first,
		lastname : last,
		email : [ email ],
		im : [ im ]
	});
	
	return newContact;
}

function submitContacts() {
	var msg = { contacts: 'true' };
	window.postMessage(msg, "*");
	steroids.modal.hide();
}

// onError: Failed to get the contacts
//
function onContactError(contactError) {
	console.log('onContactError! ' + contactError);
}