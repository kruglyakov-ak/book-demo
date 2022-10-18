import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveMeeting(evt, meeting) {
      evt.preventDefault();
      let meetingModel = this.get("model");
      const errorLogger = this.get("errorLogger");

      if (evt.submitter.dataset.name === "save") {
        try {
          meetingModel.set("date", meeting.date);
          meetingModel.set("reports", meeting.reports);

          await meetingModel.save();
        } catch (error) {
          const err = await errorLogger.createError(error);
          await this.get("store").createRecord("error", err).save();
        }
      }
      
      this.transitionToRoute("meeting.index");
    },

    clickOnCreateReport() {
      this.transitionToRoute("meeting.report.create");
    },
  },
});
