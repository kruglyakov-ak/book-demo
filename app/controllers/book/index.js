import Controller from "@ember/controller";

export default Controller.extend({
  search: "",
  searchByTags: "",

  actions: {
    async deleteBook(book) {
      await book.destroyRecord();
      await this.get("store").unloadRecord(book);
    },

    clickOnCreateButton() {
      this.transitionToRoute("book.create");
    },

    clickOnEditButton(id) {
      this.transitionToRoute(`/books/${id}/edit`);
    },

    search(evt) {
      evt.preventDefault();
      this.set("search", this.searchBooks)
    },

    searchByTags(evt) {
      evt.preventDefault();
      this.set("searchByTags", this.searchBooksByTags)
    },

    routeByTag(tag) {
      this.set("searchByTags", tag)
    }
  },
});
