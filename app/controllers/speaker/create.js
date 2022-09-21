import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import EmberObject from "@ember/object";

export default Controller.extend({
  dataService: service("data"),
  init() {
    this._super(...arguments);
    this.set("speaker", EmberObject.create());
    this.get("speaker").set("name", null);
    this.get("speaker").set("surname", null);
    this.get("speaker").set("patronymic", null);
  },
  actions: {
    async saveSpeaker(evt) {
      evt.preventDefault();

      if (evt.submitter.dataset.name === "save") {
        await this.get("dataService").createSpeaker({
          name: this.get("speaker").get("name"),
          surname: this.get("speaker").get("surname"),
          patronymic: this.get("speaker").get("patronymic"),
        });
      }

      this.get("speaker").set("name", null);
      this.get("speaker").set("surname", null);
      this.get("speaker").set("patronymic", null);
      this.transitionToRoute("speaker");
    },

  },
});
