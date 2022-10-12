import Route from "@ember/routing/route";
import EmberObject from "@ember/object";
import { inject as service } from "@ember/service";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  moment: service(),
  model() {
    return EmberObject.create({
      date: this.get("moment").moment(new Date()).format("YYYY-MM-DD"),
      reports: [],
    });
  },
});
