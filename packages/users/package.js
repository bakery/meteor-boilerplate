Package.describe({
  name: 'common:users',
  version: '0.0.1',
  summary: 'Common user related jazz - login, signup, forgot password, etc',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['templating','aldeed:autoform@5.5.0'], 'client');
  api.use(['aldeed:simple-schema@1.3.3',
    'accounts-password','alanning:roles@1.2.13']);
  api.addFiles([
    'schemas/signup.js',
    'templates/signup.html',
    'templates/signup.js'
  ],'client');
  api.addFiles(['server/users.js'],'server');
  api.export(['SignupFormSchema']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('common:users');
  api.addFiles('users-tests.js');
});
