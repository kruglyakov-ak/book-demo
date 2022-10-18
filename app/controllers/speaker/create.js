import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveSpeaker(evt, speaker) {
      const errorLogger = this.get("errorLogger");

      if (evt.submitter.dataset.name === "save") {
        try {
          let newSpeaker = await this.get("store").createRecord(
            "speaker",
            speaker
          );
          await newSpeaker.save();
        } catch (error) {
          const err = await errorLogger.createError(error);
          await this.get("store").createRecord("error", err).save();
        }
      }

      this.transitionToRoute("speaker.index");
    },
  },
});
