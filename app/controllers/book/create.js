import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),

  actions: {
    saveBook() {
      return this.get("dataService").createBook();
    },
    changeTitle(title) {
      this.set("title", title);
    },
    changeAuthorName() {},
    changePageCount() {},
    changeDescription() {},
    changeCover() {},
    resetCover() {},
  },
});
