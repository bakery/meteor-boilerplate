/* globals Slingshot: false */

var slugify = function(text){
  // XX: slightly modifed slugify that keeps '.' intact
  // (to preserve file extensions)
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-\.]+/g, '')     // Remove all non-word chars (!!allow '.')
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

Meteor.startup(function(){
  Slingshot.createDirective('image-uploads', Slingshot.S3Storage, {
    bucket: Meteor.settings.AWSBucket,
    acl: 'public-read',
    maxSize: 2 * 1024 * 1024, // 2 MB max

    allowedFileTypes: ['image/png', 'image/jpeg'],

    authorize: function () {
      return true;
    },

    key: function (file) {
      return [_.random(100, 10000),
        slugify(file.name)].join('-');
    }
  });
});
