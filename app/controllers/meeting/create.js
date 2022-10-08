import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveMeeting(evt, meeting) {
      if (evt.submitter.dataset.name === "save") {
        const newMeeting = await this.get("store").createRecord(
          "meeting",
          meeting
        );
        const uploadMeeting = await newMeeting.save();

        this.transitionToRoute(`/meetings/${uploadMeeting.get("id")}/edit`);
      }
    },

    clickOnCreateReport() {
      alert("Please save meeting!");
    }
  },
});
