import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveMeeting(evt, meeting) {
      const errorLogger = this.get("errorLogger");

      if (evt.submitter.dataset.name === "save") {
        try {
          const newMeeting = await this.get("store").createRecord(
            "meeting",
            meeting
          );
          const uploadMeeting = await newMeeting.save();

          this.transitionToRoute(`/meetings/${uploadMeeting.get("id")}/edit`);
        } catch (error) {
          const err = await errorLogger.createError(error);
          await this.get("store").createRecord("error", err).save();
        }
      }
    },

    clickOnCreateReport() {
      alert("Please save meeting!");
    },
  },
});
