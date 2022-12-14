import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  currentUser: service(),

  actions: {
    async submitForm(evt) {
      evt.preventDefault();
      const errorLogger = this.get("errorLogger");
      
      try {
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
            coverURL: this.get("coverURL"),
            user: this.get("currentUser.user"),
          },
          uploadData
        );

        this.set("isUploadingFile", false);
      } catch (error) {
        const err = await errorLogger.createError(error);
        await this.get("store").createRecord("error", err).save();
      }
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
