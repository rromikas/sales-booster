import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "components/shared/Dropzone";
import DateTimePicker from "react-datetime-picker";
import { participant_focus, show_types } from "enumerators";
import { default as _Autocomplete } from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { default as _Checkbox } from "components/shared/Checkbox";
import ApiUrl from "apiUrl";
import { industries, productCategories, countries } from "enumerators";
import { makeStyles } from "@material-ui/core/styles";

const Checkbox = (props) => {
  return (
    <_Checkbox
      {...props}
      className="mr-4 w-7 h-7 rounded bg-blue-100 hover:bg-blue-101 focus:bg-blue-102 flex items-center justify-center transition cursor-pointer flex-shrink-0"
    ></_Checkbox>
  );
};

const useStyles = makeStyles({
  container: {
    minHeight: 32,
  },
});

const Autocomplete = (props) => {
  const inputClasses = useStyles();
  return (
    <_Autocomplete
      {...props}
      className="py-0"
      classes={{ tag: "bg-blue-102 h-6" }}
      disableUnderline
      defaultValue={[]}
      renderInput={({ InputProps, ...rest }) => (
        <TextField
          {...rest}
          InputProps={Object.assign({}, InputProps, {
            disableUnderline: true,
            classes: {
              root: `${inputClasses.container} bg-blue-100 px-3 rounded`,
              input: "p-0",
            },
          })}
        />
      )}
    ></_Autocomplete>
  );
};

const ShowForm = () => {
  const formik = useFormik({
    onSubmit: async (values) => {
      const request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
          alert(request.responseText);
        }
      };
      const formData = new FormData();
      const data = {};
      const valuesKeys = Object.keys(values);

      valuesKeys.forEach((key) => {
        if (!["additional_creatives", "logo", "pricing_documents"].includes(key)) {
          data[key] = values[key];
        } else {
          values[key].forEach((file) => {
            formData.append(`files.${key}`, file, file.name);
          });
        }
      });

      formData.append("data", JSON.stringify(data));

      request.open("POST", `${ApiUrl}/shows`);

      request.send(formData);
    },
    initialValues: {
      name: "",
      type: "",
      country: "",
      city: "",
      start_date: new Date(),
      end_date: new Date(),
      participant_focus: "",
      industry_focus: [],
      product_categories: [],
      logo: [],
      description: "",
      additional_creatives: [],
      coexhibiting_available: false,
      stand_type: "",
      pricing_documents: [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(50, "Too long").required("Required"),
      country: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      start_date: Yup.date()
        .required("Required")
        .test({ test: (val) => val.getTime() > Date.now(), message: "Date is in the past" }),
      end_date: Yup.date()
        .required("Required")
        .test({ test: (val) => val.getTime() > Date.now(), message: "Date is in the past" })
        .when("start_date", (start_date, schema) => {
          return schema.test({
            test: (end_date) => start_date.getTime() < end_date.getTime(),
            message: "End is before start",
          });
        }),
      type: Yup.string().required("Required"),
      participant_focus: Yup.string().required("Required"),
      industry_focus: Yup.array().test({
        message: "Required",
        test: (arr) => arr.length !== 0,
      }),
      product_categories: Yup.array().test({
        message: "Required",
        test: (arr) => arr.length !== 0,
      }),
      logo: Yup.array().test({
        message: "Required",
        test: (arr) => arr.length !== 0,
      }),
      description: Yup.string().max(1000, "Too long").required("Required"),
      additional_creatives: Yup.array().test({
        message: "Required",
        test: (arr) => arr.length !== 0,
      }),
      coexhibiting_available: Yup.bool().required(),
      stand_types: "",
      pricing_documents: Yup.array().test({
        message: "Required",
        test: (arr) => arr.length !== 0,
      }),
    }),
  });

  console.log("formik values", formik.values, formik.errors);

  return (
    <div className="font-bold max-h-full h-full text-sm">
      <div className="text-3xl mb-12">Add A Show</div>
      <form onSubmit={formik.handleSubmit} className="text-black-400">
        <div className="text-blue-400 mb-8 text-base">Show Details</div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm">
            <div>Name Of Show*</div>
            {formik.errors.name && formik.touched.name ? (
              <div className="text-red">{formik.errors.name}</div>
            ) : null}
          </div>

          <input
            className="bg-blue-100 rounded focus:outline-none px-3 py-1.5 w-full"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
        </div>
        <div className="flex mb-8">
          <div className="w-1/2 pr-2">
            <div className="flex items-center justify-between mb-3 text-sm">
              <div>Country*</div>
              {formik.errors.country && formik.touched.country ? (
                <div className="text-red">{formik.errors.country}</div>
              ) : null}
            </div>
            <Autocomplete
              onBlur={() => formik.setFieldTouched("country", true)}
              onChange={(e, val) => (val ? formik.setFieldValue("country", val) : null)}
              filterSelectedOptions
              options={countries}
            />
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-between mb-3 text-sm">
              <div>City*</div>
              {formik.errors.city && formik.touched.city ? (
                <div className="text-red">{formik.errors.city}</div>
              ) : null}
            </div>
            <input
              className="bg-blue-100 rounded focus:outline-none px-3 py-1.5 w-full"
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
          </div>
        </div>
        <div className="flex mb-8">
          <div className="w-1/2 pr-2">
            <div className="flex items-center justify-between mb-3 text-sm">
              <div>Start Date*</div>
              {formik.errors.start_date && formik.submitCount > 0 ? (
                <div className="text-red">{formik.errors.start_date}</div>
              ) : null}
            </div>
            <DateTimePicker
              calendarClassName="border-0"
              className="bg-blue-100 rounded focus:outline-none px-3 py-1.5 w-full border-0 font-normal"
              calendarIcon={null}
              clearIcon={null}
              name="start_date"
              onChange={(val) => {
                formik.setFieldValue("start_date", val);
              }}
              value={formik.values.start_date}
            />
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-between mb-3 text-sm">
              <div>End Date*</div>
              {formik.errors.end_date && formik.submitCount > 0 ? (
                <div className="text-red">{formik.errors.end_date}</div>
              ) : null}
            </div>
            <DateTimePicker
              calendarClassName="border-0"
              className="bg-blue-100 rounded focus:outline-none px-3 py-1.5 w-full border-0 font-normal"
              calendarIcon={null}
              clearIcon={null}
              name="start_date"
              onChange={(val) => {
                formik.setFieldValue("end_date", val);
              }}
              value={formik.values.end_date}
            />
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm">
            <div>Show Type*</div>
            {formik.errors.type && formik.touched.type ? (
              <div className="text-red">{formik.errors.type}</div>
            ) : null}
          </div>
          <div className="flex">
            {show_types.map((x, i) => (
              <div key={`show-type-${i}`} className="flex items-center w-1/3">
                <Checkbox
                  onClick={() => {
                    formik.setFieldValue("type", x);
                  }}
                  checked={formik.values.type === x}
                ></Checkbox>
                <div>{x}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm">
            <div>Participant Focus*</div>
            {formik.errors.participant_focus && formik.submitCount > 0 ? (
              <div className="text-red">{formik.errors.participant_focus}</div>
            ) : null}
          </div>
          <div className="flex">
            {participant_focus.map((x, i) => (
              <div key={`participant-focus-${i}`} className="flex items-center w-1/3">
                <Checkbox
                  onClick={(wasChecked) => {
                    formik.setFieldValue("participant_focus", x);
                  }}
                  checked={formik.values.participant_focus === x}
                ></Checkbox>
                <div>{x}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm">
            <div>Industry Focus*</div>
            {formik.errors.industry_focus && formik.touched.industry_focus ? (
              <div className="text-red">{formik.errors.industry_focus}</div>
            ) : null}
          </div>
          <div>
            <Autocomplete
              onBlur={() => formik.setFieldTouched("industry_focus", true)}
              onChange={(e, val) => formik.setFieldValue("industry_focus", val)}
              multiple
              filterSelectedOptions
              options={industries}
            />
          </div>
        </div>
        <div className="mb-16">
          <div className="flex items-center justify-between mb-3 text-sm">
            <div>Product Categories*</div>
            {formik.errors.product_categories && formik.touched.product_categories ? (
              <div className="text-red">{formik.errors.product_categories}</div>
            ) : null}
          </div>
          <div>
            <Autocomplete
              onBlur={() => formik.setFieldTouched("product_categories", true)}
              onChange={(e, val) => formik.setFieldValue("product_categories", val)}
              multiple
              filterSelectedOptions
              classes={{ tag: "bg-blue-102 p-0 h-6" }}
              options={productCategories}
            />
          </div>
        </div>
        <div className="text-blue-400 mb-8 text-base">Show Copy & Creatives</div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm max-w-xl">
            <div>Show Logo*</div>
            {formik.errors.logo && formik.submitCount > 0 ? (
              <div className="text-red">{formik.errors.logo}</div>
            ) : null}
          </div>
          <div className="max-w-xl">
            <Dropzone
              text="Upload a .png or .jpg document"
              onFiles={(files) => formik.setFieldValue("logo", [files[0]])}
              files={formik.values.logo}
              accept=".jpg,.png"
            ></Dropzone>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm">
            <div>Show Description*</div>
            {formik.errors.description && formik.touched.description ? (
              <div className="text-red">{formik.errors.description}</div>
            ) : null}
          </div>
          <textarea
            onBlur={formik.handleBlur}
            name="description"
            onChange={formik.handleChange}
            spellCheck={false}
            className="border-0 bg-blue-100 rounded-xl h-28 w-full focus:outline-none py-3 px-4"
          ></textarea>
        </div>
        <div className="mb-16">
          <div className="flex items-center justify-between mb-3 text-sm max-w-xl">
            <div>Additional copies & creatives*</div>
            {formik.errors.additional_creatives && formik.submitCount > 0 ? (
              <div className="text-red">{formik.errors.additional_creatives}</div>
            ) : null}
          </div>
          <div className="max-w-xl">
            <Dropzone
              text="Upload a .png, .jpg, .pdf documents"
              onFiles={(files) => formik.setFieldValue("additional_creatives", files)}
              files={formik.values.additional_creatives}
              accept=".jpg,.png,.pdf"
            ></Dropzone>
          </div>
        </div>
        <div className="text-blue-400 mb-8 text-base">Show Pricing & Cost Details</div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm">
            <div>Co-exhibiting availability*</div>
            {formik.errors.coexhibiting_available && formik.submitCount > 0 ? (
              <div className="text-red">{formik.errors.coexhibiting_available}</div>
            ) : null}
          </div>
          <div className="max-w-xl flex">
            <div className="flex items-center w-1/2 pr-2">
              <Checkbox
                onClick={(wasChecked) => {
                  formik.setFieldValue("coexhibiting_available", true);
                }}
                checked={formik.values.coexhibiting_available}
              ></Checkbox>
              <div>Yes</div>
            </div>
            <div className="flex items-center w-1/2 pl-2">
              <Checkbox
                onClick={() => {
                  formik.setFieldValue("coexhibiting_available", false);
                }}
                checked={!formik.values.coexhibiting_available}
              ></Checkbox>
              <div>No</div>
            </div>
          </div>
        </div>{" "}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm">
            <div>Stand type*</div>
            {formik.errors.stand_type && formik.submitCount > 0 ? (
              <div className="text-red">{formik.errors.stand_type}</div>
            ) : null}
          </div>
          <div className="max-w-xl flex">
            <div className="flex items-center w-1/2 pr-2">
              <Checkbox
                onClick={() => {
                  formik.setFieldValue("stand_type", "Modular By Organizer");
                }}
                checked={formik.values.stand_type === "Modular By Organizer"}
              ></Checkbox>
              <div>Modular By Organizer</div>
            </div>
            <div className="flex items-center w-1/2 pl-2">
              <Checkbox
                onClick={() => {
                  formik.setFieldValue("stand_type", "External");
                  formik.setFieldTouched("stand_type", true);
                }}
                checked={formik.values.stand_type === "External"}
              ></Checkbox>
              <div>External</div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-sm max-w-xl">
            <div>Pricing Documents For Participants*</div>
            {formik.errors.pricing_documents && formik.submitCount > 0 ? (
              <div className="text-red">{formik.errors.pricing_documents}</div>
            ) : null}
          </div>
          <div className="max-w-xl">
            <Dropzone
              accept=".pdf,.xml"
              files={formik.values.pricing_documents}
              text="Upload a .pdf or .xml document"
              onFiles={(files) => formik.setFieldValue("pricing_documents", files)}
            ></Dropzone>
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <div
              className={`text-red mb-3 ${
                formik.errors && formik.submitCount > 0 ? "text-opacity-100" : "text-opacity-0"
              }`}
            >
              Form has missing fields
            </div>
            <button
              type="submit"
              className="font-bold bg-blue-400 rounded-xl px-16 py-2 text-white cursor-pointer outline-none hover:bg-blue-401 active:bg-blue-402 transition select-none"
            >
              Add Show
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShowForm;
