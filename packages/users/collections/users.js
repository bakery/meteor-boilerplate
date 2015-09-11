/* globals UserProfileSchema : true */

UserProfileSchema = new SimpleSchema({});

Meteor.users.attachSchema({
  profile: {
    type: UserProfileSchema,
    optional: true
  },
  username: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    min: 2,
    max: 64
  },
  emails: {
    type: [Object]
  },
  'emails.$.address': {
    label: 'Adresse e-mail',
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean,
    defaultValue: false,
    optional: true
  },
  // XX: added by alanning:roles
  roles: {
    type: [String],
    optional: true
  },
  createdAt: {
    type: Date
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  }
});
