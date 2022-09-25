import Route from "@ember/routing/route";
import EmberObject from "@ember/object";

export default Route.extend({
  model() {
    return EmberObject.create({
      title: "",
      authorName: "",
      pageCount: "",
      descriptionLink: "",
      tags: [],
      coverURL: "",
    });
  },

  setupController(controller /*, model*/) {
    this._super(...arguments);
    controller.set("uploadData", null);
  },
});
