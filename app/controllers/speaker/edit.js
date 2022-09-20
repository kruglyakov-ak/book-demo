import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),

  actions: {
    async saveSpeaker(evt) {
      evt.preventDefault();

      if (evt.submitter.dataset.name === "save") {
        await this.get("dataService").updateSpeaker({
          name: this.model.name,
          surname: this.model.surname,
          patronymic: this.model.patronymic,
          id: this.model.id,
        });
      }

      this.transitionToRoute("speaker");
    },
  },
});
