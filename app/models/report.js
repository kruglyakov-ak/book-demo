import DS from "ember-data";

export default DS.Model.extend({
  rate: DS.attr("number"),
  URLPresentation: DS.attr("string"),
  URLVideo: DS.attr("string"),
  review: DS.attr("string"),

  book: DS.belongsTo("book"),
  speaker: DS.belongsTo("speaker"),
  meeting: DS.belongsTo("meeting"),
});
