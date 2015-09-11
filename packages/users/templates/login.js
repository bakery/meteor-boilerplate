AutoForm.hooks({
  usersLoginForm : {
    onSubmit : function(data){
      Meteor.loginWithPassword(data.email, data.password, this.done);
      return false;
    }
  }
});
