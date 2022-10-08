import Service from "@ember/service";
import ENV from "book-demo/config/environment";

export default Service.extend({
  uploadBookData(savedBook, uploadData) {
    return new Promise(async (resolve, reject) => {

      if (!uploadData) {
        resolve();
      }

      uploadData.url = `${ENV.fileUploadURL}`;
      uploadData.url = `${ENV.fileUploadURL}`;
      // uploadData.headers = getOwner(this).lookup('adapter:application').get('headers');
      uploadData
        .submit()
        .done(async (result /*, textStatus, jqXhr*/) => {
          try {
            const dataToUpload = {
              entityName: "books",
              id: savedBook.id,
              fileName: result.filename,
            };

            await fetch(`${ENV.backendURL}/saveURL`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataToUpload),
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
