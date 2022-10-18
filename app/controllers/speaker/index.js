import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  search: "",
  session: service(),

  actions: {
    async deleteSpeaker(speaker) {
      const errorLogger = this.get("errorLogger");
      try {
        await speaker.destroyRecord();
        await this.get("store").unloadRecord(speaker);
      } catch (error) {
        const err = await errorLogger.createError(error);
        await this.get("store").createRecord("error", err).save();
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
