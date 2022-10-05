import ApplicationSerializer from "./application";
import DS from "ember-data";

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    meeting: {
      serialize: "id",
      deserialize: "records",
    },
    book: {
      serialize: "id",
      deserialize: "records",
    },
    speaker: {
      serialize: "id",
      deserialize: "records",
    },
  },
});
