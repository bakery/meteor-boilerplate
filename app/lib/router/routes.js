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

FlowRouter.route('/forgot-password', {
	name: 'forgotPassword',
  action: function() {
  	BlazeLayout.render('minimalMiddleLayout', { area: 'forgotPasswordForm' });
  }
});

FlowRouter.route('/reset-password/:token', {
	name: 'forgotPassword',
  action: function(params) {
  	BlazeLayout.render('minimalMiddleLayout',
			{
				area: 'resetPasswordForm',
				data : { token : params.token }
			}
		);
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
