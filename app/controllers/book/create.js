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
        rate: 25,
        descriptionLink: this.get("descriptionLink"),
        // tags: this.get("tags"),
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

    backToBoks() {
      this.transitionToRoute("book");
    },

    // changeTags(tags) {
    //   this.set(
    //     "tags",
    //     tags.split(",").map((tag) => tag.trim())
    //   );

    // },
    // selectTag(tag) {
    //   if (this.get("tags")) {
    //     this.set("tags", [...this.get("tags"), tag]);
    //     console.log(this.get("tags"));
    //   } else {
    //     this.set("tags", [tag]);
    //     console.log(this.get("tags"));
    //   }
    // },
  },
});
