import Controller from '@ember/controller';
import { inject as service } from "@ember/service";
import { refreshCurrentRoute } from "../../utils/common";

export default Controller.extend({
  dataService: service("data"),
  routing: service("-routing"),

  actions: {
    async deleteBook({ id }) {
      await this.get("dataService").deleteBook(id);
      refreshCurrentRoute(this);
    },
  },
});
