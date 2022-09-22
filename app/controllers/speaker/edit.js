import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),

  actions: {
    async saveSpeaker(evt, speaker) {
      evt.preventDefault();

      if (evt.submitter.dataset.name === "save") {
        await this.get("dataService").updateSpeaker(speaker);
      }

      this.transitionToRoute("speaker.index");
    },
  },
});
