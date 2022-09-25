import Service from "@ember/service";
import ENV from "book-demo/config/environment";

export default Service.extend({
  async getBooks(search, searchByTags) {
    const queryParam = search || searchByTags ? "?" : "";
    const querySearch = search ? `q=${search}` : "";
    const querySearchByTags = searchByTags ? `tags_like=${searchByTags}` : "";
    const response = await fetch(
      `${ENV.backendURL}/books${queryParam}${querySearch}${
        querySearchByTags ? "&" : ""
      }${querySearchByTags}`
    );
    return await response.json();
  },

  async getBook(id) {
    const response = await fetch(`${ENV.backendURL}/books/${id}`);
    return await response.json();
  },

  async getSpeaker(id) {
    const response = await fetch(`${ENV.backendURL}/speakers/${id}`);
    return await response.json();
  },

  async getSpeakers(search) {
    let queryParams = "";
    if (search) {
      queryParams = `?q=${search}`;
    }
    const response = await fetch(`${ENV.backendURL}/speakers${queryParams}`);
    return await response.json();
  },

  async deleteBook(id) {
    return await fetch(`${ENV.backendURL}/books/${id}`, { method: "DELETE" });
  },

  async deleteSpeaker(id) {
    return await fetch(`${ENV.backendURL}/speakers/${id}`, {
      method: "DELETE",
    });
  },

  async createBook(book, uploadData) {
    return new Promise(async (resolve, reject) => {
      try {
        const savedBookPromise = await fetch(`${ENV.backendURL}/books`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        });

        const savedBook = await savedBookPromise.json();

        if (!uploadData) {
          resolve();
        }

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
      } catch (e) {
        reject(e);
      }
    });
  },

  async updateBook(book) {
    return await fetch(`${ENV.backendURL}/books/${book.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
  },

  async createSpeaker(speaker) {
    return await fetch(`${ENV.backendURL}/speakers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(speaker),
    });
  },

  async updateSpeaker(speaker) {
    return await fetch(`${ENV.backendURL}/speakers/${speaker.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(speaker),
    });
  },
});
