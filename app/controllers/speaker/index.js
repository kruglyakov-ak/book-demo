import Controller from "@ember/controller";

export default Controller.extend({
  search: "",

  actions: {
    async deleteSpeaker(speaker) {
      await speaker.destroyRecord();
    },

    clickOnCreateButton() {
      this.transitionToRoute("speaker.create");
    },

    clickOnEditButton(id) {
      this.transitionToRoute(`/speakers/${id}/edit`);
    },

    search(evt) {
      evt.preventDefault();
      this.set("search", this.searchSpeaker);
    },
  },
});
