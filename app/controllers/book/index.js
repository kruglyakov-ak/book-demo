import Controller from "@ember/controller";
import { inject as service } from "@ember/service";


export default Controller.extend({
  dataService: service("data"),
  search: "",
  searchByTags: "",

  actions: {
    async deleteBook({ id }) {
      try {
        await this.get("dataService").deleteBook(id);
        this.send("refreshRoute");
      } catch (error) {
        this.send("error", new Error("Connection failed"));
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
