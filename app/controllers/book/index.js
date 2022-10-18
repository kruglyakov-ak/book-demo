import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

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

    search(evt) {
      evt.preventDefault();
      this.set("search", this.searchBooks);
    },

    searchByTags(evt) {
      evt.preventDefault();
      this.set("searchByTags", this.searchBooksByTags);
    },

    routeByTag(tag) {
      this.set("searchByTags", tag);
    },
  },
});
