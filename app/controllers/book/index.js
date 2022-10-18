import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { debounce } from "@ember/runloop";

export default Controller.extend({
  session: service(),
  search: "",
  searchByTags: "",

  actions: {
    async deleteBook(book) {
      const errorLogger = this.get("errorLogger");

      try {
        await book.destroyRecord();
        await this.get("store").unloadRecord(book);
      } catch (error) {
        const err = await errorLogger.createError(error);
        await this.get("store").createRecord("error", err).save();
      }
    },

    clickOnCreateButton() {
      this.transitionToRoute("book.create");
    },

    clickOnEditButton(id) {
      this.transitionToRoute(`/books/${id}/edit`);
    },

    search({ target }) {
      debounce(() => {
        this.set("search", target.value);
      }, 1000);
    },

    searchByTags({ target }) {
      debounce(() => {
        this.set("searchByTags", target.value);
      }, 1000);
    },

    routeByTag(tag) {
      this.set("searchByTags", tag);
    },
  },
});
