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
  	BlazeLayout.render('minimalMiddleLayout', {area: 'signup'});
  }
});
