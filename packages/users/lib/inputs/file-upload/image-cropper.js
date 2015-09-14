/* globals ImageCropper : true */

ImageCropper = {
  reset : function(){
    this.doneCropping.set(false);
    this.imageData.set(null);
  },
  isDoneCropping : function(){
    return this.doneCropping.get();
  },
  getImageData : function(){
    return this.imageData.get();
  },
  doneCropping : new ReactiveVar(false),
  imageData : new ReactiveVar(null)
};

var base64toBlob = function(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
};

Template.imageCropper.onRendered(function(){
  this.$('img.cropping-image').cropper({
    autoCrop: false,
    aspectRatio: 1,
    strict: true,
    guides: false,
    highlight: false,
    dragCrop: false,
    cropBoxMovable: true,
    cropBoxResizable: true,
    built: function(){
      $(this).cropper('setCropBoxData', {width: 200, height: 200});
      $(this).cropper('crop');
    }
  });
});

Template.imageCropper.events({
  'click .done' : function(e,template){

    var imageData = template.$('.cropper-image-container > img')
      .cropper('getCroppedCanvas',{width: 200, height: 200}).toDataURL();
    // parts should have 3 elements:
    // - the whole string
    // - content type
    // - base64 content
    var parts = new RegExp(/data:(image\/[a-z]+);base64,(.+)$/ig)
      .exec(imageData);

    if(parts.length !== 3){
      throw 'Invalid image data';
    }

    var blob = base64toBlob(parts[2], parts[1]);
    // make a random name for this blob
    blob.name = [_.random(100, 10000), parts[1].split('/')[1] ].join('.');

    ImageCropper.imageData.set(blob);
    ImageCropper.doneCropping.set(true);
  }
});
