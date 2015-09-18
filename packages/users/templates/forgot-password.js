Template.forgotPasswordForm.helpers({
  schema : function(){
    return new SimpleSchema({
      email : {
        label: 'Email address',
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    });
  }
});

AutoForm.hooks({
  forgotPasswordForm : {
    onSubmit : function (data) {
      var that = this;
      Accounts.forgotPassword({email : data.email}, function(error){
        that.done(error);
      });
      return false;
    }
  }
});
