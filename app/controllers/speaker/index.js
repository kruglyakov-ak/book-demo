import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),

  actions: {
    async deleteSpeaker({ id }) {
      await this.get("dataService").deleteSpeaker(id);
      this.send("refreshRoute");
    },
  },
});
