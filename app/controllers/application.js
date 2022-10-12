import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  session: service(),
  currentUser: service(),

  actions: {
    async logout(e) {
      e.preventDefault();

      this.get("session").invalidate();
    },
  },
});
