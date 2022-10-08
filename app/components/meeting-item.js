import Component from "@ember/component";

export default Component.extend({
  actions: {
    async deleteMeeting(meeting) {
      await meeting.destroyRecord();
      await this.get("store").unloadRecord(meeting);
    },
  },
});
