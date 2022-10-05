import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveMeeting(evt, meeting) {
      evt.preventDefault();
      let meetingModel = this.get("model");

      if (evt.submitter.dataset.name === "save") {
        meetingModel.set("date", meeting.date);
        meetingModel.set("reports", meeting.reports);

        await meetingModel.save();
      }

      this.transitionToRoute("meeting.index");
    },
  },
});
