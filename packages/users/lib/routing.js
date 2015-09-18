/* globals SecuredRoutes: true, AdminRoutes: true, Roles: false */

// Use this route group for routes requiring users to be logged in
SecuredRoutes = FlowRouter.group({
  triggersEnter: [function() {
    if(!(Meteor.loggingIn() || Meteor.userId())){
      var route = FlowRouter.current();
      var redirectParams = {};
      if(route.route.name !== 'login'){
        redirectParams.url = route.path;
      }
      FlowRouter.go('login',{},redirectParams);
    }
  }]
});

// Use this route group for routes requiring users to be admins
AdminRoutes = SecuredRoutes.group({
  triggersEnter: [function() {
    if(!Roles.userIsInRole(Meteor.user(), ['admin'])){
      var route = FlowRouter.current();
      var redirectParams = {};
      if(route.route.name !== 'login'){
        redirectParams.url = route.path;
      }
      FlowRouter.go('login',{},redirectParams);
    }
  }]
});


if(Meteor.isClient){
  // XX: keep an eye on the login status of the user

  Accounts.onLogin(function(){
    Meteor.logoutOtherClients();
    Session.set('loggedIn', true);
    var redirect = FlowRouter.current().queryParams.url || '/';
    FlowRouter.go(redirect);
  });

  Tracker.autorun(function(){
    if(!Meteor.userId() && Session.get('loggedIn')){
      Session.set('loggedIn', false);
      FlowRouter.go(FlowRouter.path('login'));
    }
  });
}
