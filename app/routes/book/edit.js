import Route from "@ember/routing/route";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  async model({ id }) {
    const errorLogger = this.get("errorLogger");
    try {
      return this.get("store").findRecord("book", id);
    } catch (error) {
      const err = await errorLogger.createError(error);
      await this.get("store").createRecord("error", err).save();
    }
  },

  setupController(controller /*, model*/) {
    this._super(...arguments);
    controller.set("uploadData", null);
  },
});
