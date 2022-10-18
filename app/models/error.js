import DS from "ember-data";

export default DS.Model.extend({
  date: DS.attr("date"),
  userIP: DS.attr("string"),
  pageURL: DS.attr("string"),
  message: DS.attr("string"),
});
