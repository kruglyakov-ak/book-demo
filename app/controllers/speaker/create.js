import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),

  actions: {
    async saveSpeaker(evt, speaker) {
      if (evt.submitter.dataset.name === "save") {
        await this.get("dataService").createSpeaker(speaker);
      }

      this.transitionToRoute("speaker.index");
    },
  },
});
