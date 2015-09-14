/* globals AutoForm:false, Slingshot:false, ImageCropper:false */

var fileInputSelector = 'input[name=file-upload-input]';

Template.afImageUpload_semanticUI.onCreated(function(){
  this.imageUrl = new ReactiveVar(this.data.value);
  this.cropping = new ReactiveVar(false);
  this.uploading = new ReactiveVar(false);
  this.croppingImageUrl = new ReactiveVar(null);
});

Template.afImageUpload_semanticUI.onRendered(function(){
  var that = this;
  that.autorun(function(){
    var imageData = ImageCropper.getImageData();
    if(imageData){
      that.uploading.set(true);

      var uploader = new Slingshot.Upload('image-uploads');
      uploader.send(imageData, function (error, downloadUrl) {
        that.uploading.set(false);
        if (error) {
          alert(error);
        }
        else {
          that.imageUrl.set(downloadUrl);
        }
      });
    }
  });
});

Template.afImageUpload_semanticUI.events({
  'click .upload-button' : function(e,template){
    e.stopPropagation();
    template.$(fileInputSelector).click();
  },

  'change input[name=file-upload-input]' : function(e,template){
    var file = template.$(fileInputSelector)[0].files[0];
    ImageCropper.reset();
    Template.instance().cropping.set(true);
    Template.instance().croppingImageUrl.set(URL.createObjectURL(file));
  }
});

Template.afImageUpload_semanticUI.helpers({
  imageUrl : function(){
    return Template.instance().imageUrl ?
      Template.instance().imageUrl.get() : null;
  },
  croppingImageUrl : function(){
    return Template.instance().croppingImageUrl ?
      Template.instance().croppingImageUrl.get() : null;
  },
  uploading : function(){
    return Template.instance().uploading ?
      Template.instance().uploading.get() : null;
  },
  cropping : function(){
    return Template.instance().cropping.get() &&
      !ImageCropper.isDoneCropping();
  },
  uploadButtonAtts : function(){
    return Template.instance().uploading &&
      Template.instance().uploading.get() ?
        { disabled : 'disabled' } : {};
  },
  placeholder : function(){
    return Template.currentData().atts.placeholder ||
      "http://placehold.it/200x200";
  }
});

AutoForm.addInputType('image-upload', {
  template: 'afImageUpload',
  valueOut: function () {
    return this.val();
  }
});
