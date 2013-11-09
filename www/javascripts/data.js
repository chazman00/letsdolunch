var Event = StackMob.Model.extend({
	schemaName: 'event'
});

var Events = StackMob.Collection.extend({
	model: Event
});

var Contact = StackMob.Model.extend({
	schemaName: 'contact'
});

var Contacts = StackMob.Collection.extend({
	model: Contact
});

var Location = StackMob.Model.extend({
	schemaName: 'location'
});

var EventContactPreferences = StackMob.Model.extend({
	schemaName: 'eventcontactpreferences'
});

var EventLocationFeedback = StackMob.Model.extend({
	schemaName: 'eventlocationfeedback'
});