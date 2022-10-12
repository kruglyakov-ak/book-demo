import Route from "@ember/routing/route";
import EmberObject from "@ember/object";
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
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
