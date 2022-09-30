import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    clickOnCreateButton() {
      this.transitionToRoute("meeting.create");
    },

    clickOnEditButton(id) {
      this.transitionToRoute(`/meetings/${id}/edit`);
    },
  },
});
