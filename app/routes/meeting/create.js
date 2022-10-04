import Route from "@ember/routing/route";
import EmberObject from "@ember/object";
import { inject as service } from "@ember/service";

export default Route.extend({
  moment: service(),
  model() {
    return EmberObject.create({
      date: this.get("moment").moment(new Date()).format("YYYY-MM-DD"),
      reports: [],
    });
  },
});
