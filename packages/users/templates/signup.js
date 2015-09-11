var roles;

Template.signup.onCreated(function(){
  check(this.data.roles,[String]);
  roles = this.data.roles;
});

AutoForm.hooks({
  usersSignupForm : {
    onSubmit : function(data){
      Accounts.createUser({
        username: data.email,
        email: data.email,
        password: data.password,
        roles: roles
      },this.done);
      return false;
    }
  }
});
