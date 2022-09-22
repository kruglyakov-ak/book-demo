import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),

  actions: {
    async saveSpeaker(evt, speaker) {
      if (evt.submitter.dataset.name === "save") {
        await this.get("dataService").createSpeaker(speaker);
        this.get("model").set("name", this.get("speaker.name"));
        this.get("model").set("surname", this.get("speaker.surname"));
        this.get("model").set("patronymic", this.get("speaker.patronymic"));
      }

      this.transitionToRoute("speaker.index");
    },
  },
});
