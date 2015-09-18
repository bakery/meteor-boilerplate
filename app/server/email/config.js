Meteor.startup(function() {
  check(Meteor.settings.MAILGUN, {
    username : String,
    password : String
  });

  Meteor.Mailgun.config({
    username: Meteor.settings.MAILGUN.username,
    password: Meteor.settings.MAILGUN.password
  });
});
