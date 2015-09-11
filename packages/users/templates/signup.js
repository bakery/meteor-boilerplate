AutoForm.hooks({
  usersSignupForm : {
    onSubmit : function(data){
      Accounts.createUser({
        username: data.email,
        email: data.email,
        password: data.password
      },this.done);
      return false;
    }
  }
});
