import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { refreshCurrentRoute } from "../../utils/common";

export default Controller.extend({
  dataService: service("data"),
  routing: service("-routing"),

  actions: {
    async deleteSpeaker({ id }) {
      await this.get("dataService").deleteSpeaker(id);
      refreshCurrentRoute(this);
    },
  },
});
