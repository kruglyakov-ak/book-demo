import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveReport(evt, report, id) {
      evt.preventDefault();
      let reportModel = this.get("model.report");
      const errorLogger = this.get("errorLogger");

      if (evt.submitter.dataset.name === "save") {
        try {
          await reportModel.save();
        } catch (error) {
          const err = await errorLogger.createError(error);
          await this.get("store").createRecord("error", err).save();
        }
      }

      this.transitionToRoute("meeting.edit", id);
    },

    changeSpeaker(speaker) {
      this.set("model.report.speaker", speaker ? speaker : "");
    },

    changeBook(book) {
      this.set("model.report.book", book ? book : "");
    },

    changeReview(review) {
      this.set("model.report.review", review.target.value);
    },
  },
});
