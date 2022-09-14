import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { refreshCurrentRoute } from "../../utils/common";

export default Controller.extend({
  dataService: service("data"),
  routing: service("-routing"),

  actions: {
    async deleteSpeaker({ id }) {
      // eslint-disable-next-line no-console
      console.log(this);
      await this.get("dataService").deleteSpeaker(id);
      refreshCurrentRoute(this);
    },
  },
});
