import Component from "@ember/component";

export default Component.extend({
  actions: {
    async submitForm(evt) {
      evt.preventDefault();

      this.set("isUploadingFile", true);
      const uploadData = this.get("uploadData");
      await this.onsubmit(
        evt,
        {
          id: this.get("id"),
          title: this.get("title"),
          authorName: this.get("authorName"),
          pageCount: this.get("pageCount"),
          descriptionLink: this.get("descriptionLink"),
          rate: Math.floor(Math.random() * 100),
          tags: this.get("tags"),
          coverURL: "",
        },
        uploadData
      );

      this.set("isUploadingFile", false);
    },

    changeTags(newTags) {
      this.set("tags", [...newTags]);
    },

    changeUploadData(uploadData) {
      this.set("uploadData", uploadData);
    },
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.setProperties({
      id: this.get("book.id"),
      title: this.get("book.title"),
      authorName: this.get("book.authorName"),
      pageCount: this.get("book.pageCount"),
      descriptionLink: this.get("book.descriptionLink"),
      tags: this.get("book.tags"),
      coverURL: this.get("book.coverURL"),
    });
  },
});
