/* globals AutoForm:false, Slingshot:false */

var fileInputSelector = 'input[name=file-upload-input]';

Template.afImageUpload.onCreated(function(){
  this.imageUrl = new ReactiveVar(this.data.value);
  this.uploading = new ReactiveVar(false);
});

Template.afImageUpload.onRendered(function(){
  var that = this;
  this.autorun(function(){
    if(that.imageUrl){
      that.imageUrl.get();
      that.$('input[type=hidden]').trigger('change');
    }
  });
});

Template.afImageUpload.events({
  'click .upload-button' : function(e,template){
    template.$(fileInputSelector).click();
  },

  'change input[name=file-upload-input]' : function(e,template){
    var uploader = new Slingshot.Upload('image-uploads');
    var file = template.$(fileInputSelector)[0].files[0];

    template.uploading.set(true);

    uploader.send(file, function (error, downloadUrl) {
      template.uploading.set(false);
      if (error) {
        alert(error);
      }
      else {
        template.imageUrl.set(downloadUrl);
      }
    });
  }
});

Template.afImageUpload.helpers({
  imageUrl : function(){
    return Template.instance().imageUrl ?
    Template.instance().imageUrl.get() : null;
  },
  uploading : function(){
    return Template.instance().uploading ?
      Template.instance().uploading.get() : null;
  },
  uploadButtonAtts : function(){
    return Template.instance().uploading &&
      Template.instance().uploading.get() ?
        { disabled : 'disabled' } : {};
  },
  placeholder : function(){
    return Template.currentData().atts.placeholder ||
      "http://placehold.it/270x130";
  }
});

AutoForm.addInputType('image-upload', {
  template: 'afImageUpload',
  valueOut: function () {
    return this.val();
  }
});
