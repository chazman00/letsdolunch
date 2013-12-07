StackMob.init({
	publicKey: "0d9e876e-1f32-4fb8-ab2f-b66f57e6ad78",
	apiVersion: 0
});

var Event = StackMob.Model.extend({
	schemaName: 'event'
});

var Events = StackMob.Collection.extend({
	model: Event
});

var verifiedContact = StackMob.Model.extend({
	schemaName: 'verifiedcontact'
});

var verifiedContacts = StackMob.Collection.extend({
	model: verifiedContact
});

var unverifiedContact = StackMob.Model.extend({
	schemaName: 'unverifiedcontact'
});

var unverifiedContacts = StackMob.Collection.extend({
	model: unverifiedContact
});

var Location = StackMob.Model.extend({
	schemaName: 'eventlocation'
});

var EventContactPreferences = StackMob.Model.extend({
	schemaName: 'eventcontactpreferences'
});

var EventLocationFeedback = StackMob.Model.extend({
	schemaName: 'eventlocationfeedback'
});