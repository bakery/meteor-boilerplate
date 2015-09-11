/* globals SecuredRoutes: true, AdminRoutes: true, Roles: false */

// Use this route group for routes requiring users to be logged in
SecuredRoutes = FlowRouter.group({
  triggersEnter: [function() {
    if(!(Meteor.loggingIn() || Meteor.userId())){
      var route = FlowRouter.current();
      if(route.route.name !== 'login'){
        Session.set('redirectAfterLogin', route.path);
      }
      FlowRouter.go('login');
    }
  }]
});

// Use this route group for routes requiring users to be admins
AdminRoutes = SecuredRoutes.group({
  triggersEnter: [function() {
    if(!Roles.userIsInRole(Meteor.user(), ['admin'])){
      FlowRouter.go(FlowRouter.path('home'));
    }
  }]
});


if(Meteor.isClient){
  // XX: keep an eye on the login status of the user
  
  Accounts.onLogin(function(){
    Meteor.logoutOtherClients();
    Session.set('loggedIn', true);
    var redirect = Session.get('redirectAfterLogin') || 'dashboard';
    if(redirect && redirect !== 'login'){
      FlowRouter.go(redirect);
    }
  });

  Tracker.autorun(function(){
    if(!Meteor.userId() && Session.get('loggedIn')){
      var route = FlowRouter.current();
      Session.set('loggedIn', false);
      Session.set('redirectAfterLogin', route.path);
      FlowRouter.go(FlowRouter.path('login'));
    }
  });
}
