import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveBook(evt, book) {
      evt.preventDefault();
      let bookModel = this.get("model");

      if (evt.submitter.dataset.name === "save") {
        bookModel.set("title", book.title);
        bookModel.set("authorName", book.authorName);
        bookModel.set("pageCount", book.pageCount);
        bookModel.set("descriptionLink", book.descriptionLink);
        bookModel.set("rate", Math.floor(Math.random() * 5));
        bookModel.set("tags", book.tags);
        bookModel.set("coverURL", book.coverURL);

        await bookModel.save();
      }

      this.transitionToRoute("book.index");
    },
  },
});
