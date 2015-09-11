/* globals SecuredRoutes : false */

FlowRouter.route(['/','/home'], {
	name: 'home',
  action: function() {
      console.log("Yeah! We are on the home page");
      BlazeLayout.render("appLayout", {area: "home"});
  }
});

FlowRouter.route('/signup', {
	name: 'signup',
  action: function() {
  	BlazeLayout.render('minimalMiddleLayout', {
			data : { roles : ['user'] },
			area: 'signup'
		});
  }
});

FlowRouter.route('/login', {
	name: 'login',
  action: function() {
  	BlazeLayout.render('minimalMiddleLayout', { area: 'login' });
  }
});

SecuredRoutes.route('/dashboard', {
	name: 'dashboard',
  action: function() {
  	BlazeLayout.render('appLayout', { area: 'dashboard' });
  }
});

SecuredRoutes.route('/logout', {
	name: 'logout',
  action: function() {
  	Meteor.logout(function(){
			FlowRouter.go(FlowRouter.path('login'));
		});
  }
});
