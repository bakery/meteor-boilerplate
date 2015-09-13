/* globals SignupFormSchema: true */

SignupFormSchema = new SimpleSchema({
  email : {
    label : 'Email Address',
    type : String,
    regEx: SimpleSchema.RegEx.Email
  },
  password : {
    label : 'Password',
    type : String,
    autoform : {
      type : 'password'
    }
  },
  imageUrl : {
    label : 'Profile image',
    type : String,
    autoform : {
      type : 'image-upload'
    }
  }
});
