import DatetimeAttributeModel from "beinformed/models/attributes/DatetimeAttributeModel";
import { setSettings } from "beinformed/constants/Settings";

describe("DatetimeAttributeModel", () => {
  describe("With date readonly format in product default format", () => {
    beforeAll(() => {
      // using product default format
      setSettings({ DATE_READONLY_FORMAT: "dd-MM-yyyy" });
    });

    it("should be able to create an empty DatetimeAttribute object", () => {
      const attribute = new DatetimeAttributeModel({}, { type: "datetime" });

      expect(attribute).toBeInstanceOf(DatetimeAttributeModel);

      expect(attribute.type).toBe("datetime");
      expect(attribute.format).toBe("yyyy-MM-dd'T'HH:mm:ss");
      expect(attribute.getInputValue()).toBe("");
      expect(attribute.inputvalue).toBe("");
      expect(attribute.readonlyvalue).toBe("");

      attribute.addConstraints();
      expect(attribute.constraintCollection).toHaveLength(1);
    });

    it("should be able to update", () => {
      const attribute = new DatetimeAttributeModel(
        {},
        {
          type: "datetime",
          format: "dd-MM-yyyy HH:mm",
        }
      );

      attribute.update("18-08-2016 13:45");
      expect(attribute.getInputValue()).toBe("18-08-2016 13:45");
      expect(attribute.getInitialInputValue("2016-08-18T13:45:23")).toBe(
        "18-08-2016 13:45"
      );

      expect(attribute.readonlyvalue).toBe("18-08-2016 13:45");

      attribute.update(null);
      expect(attribute.getInputValue()).toBe("");

      attribute.update("");
      expect(attribute.value).toBeNull();

      attribute.update("aaaa");
      expect(attribute.value).toBe("Invalid Date");
    });

    it("should be able to handle min and max date in only date format and renders in format", () => {
      const attribute = new DatetimeAttributeModel(
        {},
        {
          type: "datetime",
          format: "dd-MM-yyyy HH:mm",
          mindate: "2010-10-01T00:00:00",
          maxdate: "2010-10-31T23:59:59",
        }
      );

      attribute.update("18-08-2016 13:45");

      expect(attribute.isValid).toBe(false);
      expect(attribute.formatValue(attribute.mindate)).toBe("01-10-2010 00:00");
      expect(attribute.formatValue(attribute.maxdate)).toBe("31-10-2010 23:59");
    });
  });

  describe("With customized readonly format for dates", () => {
    beforeAll(() => {
      // readonly format in non product default format
      setSettings({ DATE_READONLY_FORMAT: "MM-dd-yyyy" });
    });

    it("should show datetime readonly value in custom date format", () => {
      const attribute = new DatetimeAttributeModel(
        {},
        {
          type: "datetime",
          format: "dd-MM-yyyy HH:mm",
        }
      );

      attribute.update("18-08-2016 13:45");
      expect(attribute.readonlyvalue).toBe("08-18-2016 13:45");
    });

    it("should show date only value according in custom date format", () => {
      const attribute = new DatetimeAttributeModel(
        { value: "2017-07-29" },
        {
          type: "date",
          format: "dd-MM-yyyy",
        }
      );

      expect(attribute.readonlyvalue).toBe("07-29-2017");
    });

    it("should show custom format with am/pm in custom date format", () => {
      const attribute = new DatetimeAttributeModel(
        { value: "2031-12-21T17:41:21" },
        { type: "datetime", format: "dd-MM-yyyy hh:mm:ss a" }
      );

      expect(attribute.readonlyvalue).toBe("12-21-2031 05:41:21 PM");
    });
  });
});
