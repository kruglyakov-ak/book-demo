import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveSpeaker(evt, speaker) {
      if (evt.submitter.dataset.name === "save") {
        let newSpeaker = await this.get("store").createRecord("speaker", speaker);
        newSpeaker.serialize();
        await newSpeaker.save();
      }

      this.transitionToRoute("speaker.index");
    },
  },
});
