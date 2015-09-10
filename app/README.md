# meteor-boilerplate

A starting point for MeteorJS applications. Includes Flow Router, Bootstrap 3, Font Awesome, LESS and more.

* [Included Packages](#included-packages)
* [Installation](#installation)
* [File Structure](#file-structure)
* [Bootstrap and Less](#bootstrap-and-less)
* [SEO](#seo)
* [Favicons and Touch Icons](#favicons-and-touch-icons)
* [Seed Data](#seed-data)

## <a name="included-packages"></a> Included Packages

* Collections:
  * [matb33:collection-hooks](https://github.com/matb33/meteor-collection-hooks)
  * [reywood:publish-composite](https://github.com/englue/meteor-publish-composite)
* Router:
  * [kadira:flow-router](https://github.com/kadirahq/flow-router)
  * [kadira:blaze-layout](https://github.com/kadirahq/blaze-layout)
  * [zimme:active-route](https://github.com/zimme/meteor-active-route)
  * [yasinuslu:blaze-meta](https://github.com/yasinuslu/blaze-meta)
* Authentication
  * [alanning:roles](https://github.com/alanning/meteor-roles)
* Seed Data
  * [dburles:factory](https://github.com/percolatestudio/meteor-factory)
  * [anti:fake](https://github.com/anticoders/meteor-fake/)
* Misc:
  * [Moment.js](http://momentjs.com/)
  * [Underscore.js](http://underscorejs.org/)
  * [Underscore.string](http://epeli.github.io/underscore.string/)
  * [cunneen:mailgun](https://github.com/cunneen/meteor-mailgun)

## <a name="installation"></a> Installation

1. Clone this repo to `<yourapp>`

  `git clone https://github.com/michaltakac/meteor-boilerplate.git <yourapp>`

2. Switch to `flow-router` branch

  `cd <yourapp> && git checkout flow-router`

3. Remove `.git`

  `rm -rf .git`

4. Start coding!

## <a name="file-structure"></a> File Structure

We have a common file structure we use across all of our Meteor apps. Client-only files are stored in the `client` directory, server-only files are stored in the `server` directory, and shared files are stored in the `both` directory. Because we use Flow Router here, route-specific files are stored inside `lib/router` directory. The `private` and `public` directories are for either private or public assets.

## <a name="seo"></a> SEO

Page titles, meta descriptions and Facebook and Twitter meta tags are handled by the [yasinuslu:blaze-meta](https://github.com/yasinuslu/blaze-meta) package. Global settings are configured in `both/router/meta.js`.

* Note: the `spiderable` package will need to be installed and configured on your server in order for bots to read your meta tags.

## <a name="favicons-and-touch-icons"></a> Favicons and Touch Icons

Upload your image to http://realfavicongenerator.net/ and place the resulting images in `public/images/favicons`

## Seed Data

You can use the [dburles:factory](https://github.com/percolatestudio/meteor-factory) and [anti:fake](https://github.com/anticoders/meteor-fake/) packages to generate fake collection data for testing your UI. See `server/seeds.js` for an example:

```javascript
Meteor.startup(function() {

  Factory.define('item', Items, {
    name: function() { return Fake.sentence(); },
    rating: function() { return _.random(1, 5); }
  });

  if (Items.find({}).count() === 0) {

    _(10).times(function(n) {
      Factory.create('item');
    });

  }

});

```
