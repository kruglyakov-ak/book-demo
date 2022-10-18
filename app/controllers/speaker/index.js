import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { debounce } from "@ember/runloop";

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

    search({ target }) {
      debounce(() => {
        this.set("search", target.value);
      }, 1000);
    },
  },
});
