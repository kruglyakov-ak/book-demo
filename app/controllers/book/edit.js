import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),

  actions: {
    async saveBook(evt) {
      evt.preventDefault();

      if (evt.submitter.dataset.name === "save") {
        await this.get("dataService").updateBook({
          title: this.model.title,
          authorName: this.model.authorName,
          pageCount: this.model.pageCount,
          rate: Math.floor(Math.random() * 100),
          descriptionLink: this.model.descriptionLink,
          // tags: this.get("tags"),
          coverURL: this.model.coverURL,
          id: this.model.id,
        });
      }

      this.transitionToRoute("book");
    },

    resetCover() {
      this.set("coverURL", null);
    },
  },
});
