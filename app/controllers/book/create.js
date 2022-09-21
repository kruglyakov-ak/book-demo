import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import EmberObject from "@ember/object";

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set("book", EmberObject.create());
    this.get("book").set("title", null);
    this.get("book").set("authorName", null);
    this.get("book").set("pageCount", null);
    this.get("book").set("descriptionLink", null);
    this.get("book").set("tags", null);
    this.get("book").set("coverURL", null);
  },
  dataService: service("data"),
  actions: {
    async saveBook(evt) {
      evt.preventDefault();

      if (evt.submitter.dataset.name === "save") {
        await this.get("dataService").createBook({
          title: this.get("book").get("title"),
          authorName: this.get("book").get("authorName"),
          pageCount: this.get("book").get("pageCount"),
          rate: Math.floor(Math.random() * 100),
          descriptionLink: this.get("book").get("descriptionLink"),
          // tags: this.get("book").get("tags"),
          coverURL: this.get("book").get("coverURL"),
        });
      }

      this.get("book").set("title", null);
      this.get("book").set("authorName", null);
      this.get("book").set("pageCount", null);
      this.get("book").set("descriptionLink", null);
      this.get("book").set("tags", null);
      this.get("book").set("coverURL", null);
      this.transitionToRoute("book");
    },

    resetCover() {
      this.get("book").set("coverURL", null);
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
