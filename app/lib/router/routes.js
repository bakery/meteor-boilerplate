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
