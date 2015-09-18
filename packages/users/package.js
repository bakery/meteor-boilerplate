Package.describe({
  name: 'common:users',
  version: '0.0.1',
  summary: 'Common user related jazz - login, signup, forgot password, etc',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['templating','tracker', 'reactive-var',
    'session','aldeed:autoform@5.5.0'], 'client');
  api.use([
    'aldeed:simple-schema@1.3.3',
    'accounts-password',
    'alanning:roles@1.2.13',
    'kadira:flow-router@2.4.0',
    'edgee:slingshot@0.7.1',
    'jonblum:jquery-cropper@0.11.0'
  ]);
  api.use(['cmather:handlebars-server@0.2.0'],'server');

  api.addFiles([
    'lib/routing.js',
    'collections/users.js'
  ]);

  api.addFiles([
    'lib/inputs/file-upload/image-cropper.html',
    'lib/inputs/file-upload/image-cropper.js',
    'lib/inputs/file-upload/template.html',
    'lib/inputs/file-upload/template.js',
    'schemas/signup.js',
    'schemas/login.js',
    'templates/signup.html',
    'templates/signup.js',
    'templates/login.html',
    'templates/login.js',
    'templates/forgot-password.html',
    'templates/forgot-password.js',
    'templates/reset-password.html',
    'templates/reset-password.js'
  ],'client');
  api.addFiles([
    'server/templates/emails/email.handlebars',
    'server/templates/emails/resetPassword.handlebars',
    'server/templates/emails/resetPasswordSubject.handlebars',
    'server/templates/emails/enrollAccount.handlebars',
    'server/templates/emails/enrollAccountSubject.handlebars',
    'server/users.js',
    'server/uploads.js',
    'server/accounts-config.js'
  ],'server');
  api.export(['SignupFormSchema','LoginFormSchema',
    'SecuredRoutes','AdminRoutes']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('common:users');
  api.addFiles('users-tests.js');
});
