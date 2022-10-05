import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveReport(evt, report, id) {
      if (evt.submitter.dataset.name === "save") {
        let newReport = await this.get("store").createRecord("report", report);
        await newReport.save();
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
