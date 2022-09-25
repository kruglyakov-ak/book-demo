import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),
  search: "",

  actions: {
    async deleteSpeaker({ id }) {
      try {
        await this.get("dataService").deleteSpeaker(id);
        this.send("refreshRoute");
      } catch (error) {
        this.transitionToRoute("error", { error: "Connections failed" });
      }
    },

    clickOnCreateButton() {
      this.transitionToRoute("speaker.create");
    },

    clickOnEditButton(id) {
      this.transitionToRoute(`/speakers/${id}/edit`);
    },

    search(evt) {
      evt.preventDefault();
      this.set("search", this.searchSpeaker);
    },
  },
});
