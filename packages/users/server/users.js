/* globals Roles: false */

Accounts.onCreateUser(function(options, user) {
  // set up profile fields based on profile option
  // and add new user to roles (if provided)

  if (options.profile){
    user.profile = options.profile;
  }

  if (options && options.roles && options.roles.length) {
    // XX: Roles.addUsersToRoles must be called after user creation
    // http://stackoverflow.com/questions/22649600/unable-to-add-roles-to-user-with-meteor-using-roles-package
    var handle = Meteor.users.find({_id: user._id},{fields: {_id: 1}}).observe({
      added: function () {
        Roles.addUsersToRoles(user._id, options.roles);
        handle.stop();
        handle = null;
      }
    });

    // In case the document is never inserted
    Meteor.setTimeout(function() {
      if (handle) {
        handle.stop();
      }
    }, 30000);
  }

  return user;
});
