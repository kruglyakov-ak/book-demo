import DS from "ember-data";

export default DS.Model.extend({
  email: DS.attr("string"),
  password: DS.attr(),

  books: DS.hasMany('book'),
  speakers: DS.hasMany('speaker'),
  meetings: DS.hasMany('meeting'),
});
