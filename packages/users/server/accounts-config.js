var stripTags = function(str){
  check(str, String);
  return str.replace(/(<([^>]+)>)/ig,"");
};

Meteor.startup(function(){
  check(Meteor.settings.Email.from, String);
  check(Meteor.settings.Email.siteName, String);

  // XX: check to see if all the templates have been added on the server
  check(Handlebars.templates.email, Match.Where(_.isFunction));
  check(Handlebars.templates.resetPassword, Match.Where(_.isFunction));
  check(Handlebars.templates.resetPasswordSubject, Match.Where(_.isFunction));
  check(Handlebars.templates.enrollAccountSubject, Match.Where(_.isFunction));
  check(Handlebars.templates.enrollAccount, Match.Where(_.isFunction));

  var resetPasswordLink  = function(url){
    // Meteor has '#' in the password reset url by default
    // so we get rid of it
    return url.split('/#').join('');
  };
  var resetPasswordEmailContent = function(user, url){
    return Handlebars.templates.email({
      title : Handlebars.templates.resetPasswordSubject({ user : user }),
      template: Handlebars.templates.resetPassword({
        user : user,
        url: url
      })
    });
  };

  var enrollAccountEmailContent = function(user){
    return Handlebars.templates.email({
      title : Handlebars.templates.enrollAccountSubject({ user : user }),
      template: Handlebars.templates.enrollAccount({ user : user })
    });
  };

  // customize account email templates used for
  // account creation, password resets and etc
  // http://docs.meteor.com/#/full/accounts_emailtemplates
  Accounts.emailTemplates.siteName = Meteor.settings.Email.siteName;
  Accounts.emailTemplates.from = Meteor.settings.Email.from;

  Accounts.emailTemplates.resetPassword.subject =
    Handlebars.templates.resetPasswordSubject;
  Accounts.emailTemplates.resetPassword.text = function(user,url){
    var emailHTML = resetPasswordEmailContent(user,resetPasswordLink(url));
    return stripTags(emailHTML);
  };
  Accounts.emailTemplates.resetPassword.html = function(user,url){
    return resetPasswordEmailContent(user,resetPasswordLink(url));
  };

  Accounts.emailTemplates.enrollAccount.subject =
    Handlebars.templates.enrollAccountSubject;
  Accounts.emailTemplates.enrollAccount.text = function (user) {
    var emailHTML = enrollAccountEmailContent(user);
    return stripTags(emailHTML);
  };
  Accounts.emailTemplates.enrollAccount.html = function (user) {
    return enrollAccountEmailContent(user);
  };
});
