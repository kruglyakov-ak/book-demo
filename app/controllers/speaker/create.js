import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),

  actions: {
    async saveSpeaker(evt) {
      evt.preventDefault();

      if (evt.submitter.dataset.name === "save") {
        await this.get("dataService").createSpeaker({
          name: this.get("name"),
          surname: this.get("surname"),
          patronymic: this.get("patronymic"),
        });
      }

      this.set("name", null);
      this.set("surname", null);
      this.set("patronymic", null);
      this.transitionToRoute("speaker");
    },

    changeName(name) {
      this.set("name", name);
    },

    changeSurname(surname) {
      this.set("surname", surname);
    },

    changePatronymic(patronymic) {
      this.set("patronymic", patronymic);
    },
  },
});
