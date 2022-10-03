import ApplicationSerializer from "./application";
import DS from "ember-data";

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    meeting: {
      serialize: "id",
      deserialize: false,
    },
    book: {
      serialize: "id",
      deserialize: false,
    },
    speaker: {
      serialize: "id",
      deserialize: false,
    },
  },
});
