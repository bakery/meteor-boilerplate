Template.resetPasswordForm.onCreated(function(){
  check(this.data, {
    token : String
  });
});

Template.resetPasswordForm.helpers({
  schema : function(){
    return new SimpleSchema({
      password : {
        label: 'New password',
        type: String
      },
      passwordAgain : {
        label: 'Password one more time',
        type: String,
        custom: function () {
          if (this.value !== this.field('password').value) {
            return 'passwordMismatch';
          }
        }
      },
      token : {
        type: String
      }
    });
  }
});

AutoForm.hooks({
  resetPasswordForm : {
    onSubmit : function (data) {
      var that = this;
      Accounts.resetPassword(data.token, data.password, function(error){
        that.done(error);
      });
      return false;
    },

    onSuccess : function(){
      FlowRouter.go('login');
    }
  }
});
