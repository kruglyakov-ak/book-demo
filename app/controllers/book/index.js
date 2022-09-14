import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),

  actions: {
    async deleteBook({ id }) {
      await this.get("dataService").deleteBook(id);
      this.send("refreshRoute");
    },
  },
});
