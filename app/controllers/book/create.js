import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),
  actions: {
    async saveBook(evt) {
      evt.preventDefault();
      await this.get("dataService").createBook({
        title: this.get("title"),
        authorName: this.get("authorName"),
        pageCount: this.get("pageCount"),
        tags: this.get("tags"),
        rate: 25,
        descriptionLink: this.get("descriptionLink"),
        coverURL: this.get("coverURL"),
      });
      this.transitionToRoute("book");
    },
    changeTitle(title) {
      this.set("title", title);
    },
    changeAuthorName(authorName) {
      this.set("authorName", authorName);
    },
    changePageCount(pageCount) {
      this.set("pageCount", pageCount);
    },
    changeDescription(descriptionLink) {
      this.set("descriptionLink", descriptionLink);
    },
    changeCover(coverURL) {
      this.set("coverURL", coverURL);
    },
    resetCover() {
      this.set("coverURL", null);
    },
    changeTags(tags) {
      this.set(
        "tags",
        tags.split(",").map((tag) => tag.trim())
      );
    },
    backToBoks() {
      this.transitionToRoute("book");
    },
  },
});
