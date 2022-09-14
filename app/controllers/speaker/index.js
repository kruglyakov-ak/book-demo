import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { getOwner } from "@ember/application";

export default Controller.extend({
  dataService: service("data"),
  routing: service("-routing"),

  actions: {
    async deleteSpeaker({ id }) {
      await this.get("dataService").deleteSpeaker(id);
      const currentRouteName = this.get("routing.currentRouteName");
      const currentRouteInstance = getOwner(this).lookup(
        `route:${currentRouteName}`
      );
      currentRouteInstance.refresh();
    },
  },
});
