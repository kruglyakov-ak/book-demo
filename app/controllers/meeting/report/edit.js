import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveReport(evt, report, id) {
      evt.preventDefault();
      let reportModel = this.get("model.report");
      if (evt.submitter.dataset.name === "save") {
        await reportModel.save();
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
