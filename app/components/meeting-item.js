import Component from "@ember/component";

export default Component.extend({
  actions: {
    async deleteMeeting(book) {
      await book.destroyRecord();
    },
  },
});
