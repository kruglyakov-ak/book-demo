import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr("string"),
  authorName: DS.attr("string"),
  pageCount: DS.attr("number"),
  descriptionLink: DS.attr("string"),
  tags: DS.attr(),
  coverURL: DS.attr("string"),
  rate: DS.attr("number"),
});
