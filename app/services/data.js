import Service from "@ember/service";
import ENV from "book-demo/config/environment";
import { inject as service } from "@ember/service";

export default Service.extend({
  session: service(),

  uploadBookData(savedBook, uploadData) {
    return new Promise(async (resolve, reject) => {

      if (!uploadData) {
        resolve();
      }
      uploadData.url = `${ENV.fileUploadURL}`;
      uploadData
        .submit()
        .done(async (result) => {
          try {
            const dataToUpload = {
              entityName: "books",
              id: savedBook.id,
              fileName: result.filename,
            };

            await fetch(`${ENV.backendURL}/books/${dataToUpload.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.session.data.authenticated.token}`
              },
              body: JSON.stringify({coverURL: `uploads/${dataToUpload.fileName}`}),
            });

            // eslint-disable-next-line no-console
            console.log("Ok");
            resolve();
          } catch (e) {
            reject(e);
          }
        })
        .fail((jqXhr, textStatus, errorThrown) => {
          reject(errorThrown);
        });
    });
  },
});
