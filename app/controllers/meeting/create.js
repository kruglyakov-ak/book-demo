import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveMeeting(evt, meeting) {
      if (evt.submitter.dataset.name === "save") {
        let newMeeting = await this.get("store").createRecord(
          "meeting",
          meeting
        );
        await newMeeting.save();
      }

      this.transitionToRoute("meeting.index");
    },
  },
});
