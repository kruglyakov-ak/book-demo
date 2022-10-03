import ApplicationSerializer from "./application";
import DS from "ember-data";

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    reports: {
      serialize: false,
      deserialize: "records",
    },
  },
});
