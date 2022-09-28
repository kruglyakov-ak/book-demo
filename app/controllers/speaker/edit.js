import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveSpeaker(evt, speaker) {
      evt.preventDefault();
      let speakerModel = this.get("model");

      if (evt.submitter.dataset.name === "save") {
        speakerModel.set("name", speaker.name);
        speakerModel.set("surname", speaker.surname);
        speakerModel.set("patronymic", speaker.patronymic);

        await speakerModel.save();
      }

      this.transitionToRoute("speaker.index");
    },
  },
});
