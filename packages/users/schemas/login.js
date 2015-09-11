/* globals LoginFormSchema: true */

LoginFormSchema = new SimpleSchema({
  email : {
    label : 'Email Address',
    type : String,
    regEx: SimpleSchema.RegEx.Email
  },
  password : {
    label : 'Password',
    type : String
  }
});
