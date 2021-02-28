import React, { useState } from "react";
import { default as _Checkbox } from "components/shared/Checkbox";
import { default as _Autocomplete } from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { industries, countries, productCategories, visitor_types } from "enumerators";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";

const Checkbox = ({ className = "", ...rest }) => {
  return (
    <_Checkbox
      {...rest}
      iconClassName="w-3"
      className={`w-6 h-6 rounded-md border transition border-gray-400 hover:border-gray-500 cursor-pointer select-none ${className}`}
    ></_Checkbox>
  );
};

const useStyles = makeStyles({
  input: {
    padding: "0 !important",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "black",
      opacity: 1,
      marginRight: 10,
    },
  },
  container: {
    minHeight: 36,
  },
});

const Autocomplete = ({ placeholder, ...rest }) => {
  const inputClasses = useStyles();
  return (
    <_Autocomplete
      {...rest}
      disableUnderline
      renderInput={({ InputProps, ...rest }) => (
        <TextField
          {...rest}
          placeholder={placeholder}
          InputProps={Object.assign({}, InputProps, {
            disableUnderline: true,
            classes: {
              input: inputClasses.input,
              root: `border border-gray-400 transition px-3 rounded text-sm ${inputClasses.container}`,
            },
          })}
        />
      )}
    ></_Autocomplete>
  );
};

const SearchShows = () => {
  const formik = useFormik({
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    validateOnChange: false,
    initialValues: {
      keywords: "",
      available_this_year: false,
      industry: "",
      product_categories: [],
      country: "",
      visitor_type: "",
      visitor_pass_price_min: "",
      visitor_pass_price_max: "",
      past_year_visitors_min: "",
      past_year_visitors_max: "",
      price_per_sqm_min: "",
      price_per_sqm_max: "",
      stand_size: "",
      stand_construction: "Own Stand Construction",
      coexhibiting_available: "Available",
      coexhibiting_price_min: "",
      coexhibiting_price_max: "",
      noteable_exhibitors: "",
    },
    validationSchema: Yup.object().shape({
      visitor_pass_price_min: Yup.number().typeError("is not number"),
      visitor_pass_price_min: Yup.number().typeError("is not number"),
      visitor_pass_price_max: Yup.number().typeError("is not number"),
      past_year_visitors_min: Yup.number().typeError("is not number"),
      past_year_visitors_max: Yup.number().typeError("is not number"),
      price_per_sqm_min: Yup.number().typeError("is not number"),
      price_per_sqm_max: Yup.number().typeError("is not number"),
      stand_size: Yup.number().typeError("is not number"),
      coexhibiting_price_min: Yup.number().typeError("is not number"),
      coexhibiting_price_max: Yup.number().typeError("is not number"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="text-3xl font-bold mb-5">Search For Your Next Trade Show</div>
      <div className="mb-7 text-sm">
        Find the best fitting trade shows based on your company's industry & needs
      </div>
      <div className="mb-7">
        <input
          spellCheck={false}
          name="keywords"
          value={formik.values.keywords}
          onChange={formik.handleChange}
          spellCheck={false}
          type="text"
          className="text-sm mb-7 px-4 h-9 rounded border border-gray-400 w-full focus:border-gray-500 outline-none placeholder-black-900"
          placeholder="Type something  (example - show name, industry, product category)"
        ></input>
        <div className="flex items-center">
          <Checkbox
            onClick={(prevChecked) => {
              formik.setFieldValue("available_this_year", !prevChecked);
            }}
            checked={formik.values.available_this_year}
            className="mr-3"
          ></Checkbox>
          <div className="text-sm">Only show me shows available for the rest of this year</div>
        </div>
      </div>
      <div>
        <div className="text-gray-500 mb-8 font-bold">General Show Details</div>
        <div className="flex flex-wrap">
          <div className="w-72 flex-grow pr-5 mb-8">
            <div className="font-bold mb-3 text-sm">Industry</div>
            <Autocomplete
              onBlur={() => formik.setFieldTouched("industry", true)}
              onChange={(e, val) => formik.setFieldValue("industry", val)}
              disableUnderline
              placeholder="Search Industries Covered by Show"
              options={industries}
              blurOnSelect
            />
          </div>
          <div className="w-72 flex-grow pr-5 mb-8">
            <div className="font-bold mb-3 text-sm">Product Categories</div>
            <Autocomplete
              onBlur={() => formik.setFieldTouched("product_categories", true)}
              onChange={(e, val) => formik.setFieldValue("product_categories", val)}
              filterSelectedOptions
              multiple
              classes={{ tag: "m-0.5 bg-gray-300 mr-1 py-0 text-xs h-6" }}
              options={productCategories}
              placeholder={
                formik.values.product_categories.length ? "" : "Search Product Categories Presented"
              }
            />
          </div>
          <div className="w-72 flex-grow pr-5 mb-8">
            <div className="font-bold mb-3 text-sm">Country</div>
            <Autocomplete
              onBlur={() => formik.setFieldTouched("country", true)}
              onChange={(e, val) => formik.setFieldValue("country", val)}
              options={countries}
              placeholder="Search Country Show Is Held"
              blurOnSelect
            />
          </div>
        </div>
        <div className="flex flex-wrap xl:w-3/4 w-full">
          <div className="w-52 pr-5">
            <div className="mb-3 font-bold text-sm">Past Year Visitiors</div>
            <div className="flex text-sm items-center rounded border-gray-400 border h-9">
              <div className="font-bold pl-3">Min:</div>
              <div className="flex-grow">
                <input
                  spellCheck={false}
                  name="past_year_visitors_min"
                  onChange={formik.handleChange}
                  value={formik.values.past_year_visitors_min}
                  type="text"
                  placeholder="Type Value"
                  className="bg-transparent border-0 outline-none text-center w-full px-3 placeholder-black-900"
                ></input>
              </div>
            </div>
          </div>
          <div className="w-52 pr-5 mb-8">
            <div className="mb-3 text-opacity-0 text-black-900 text-sm">Past Year Visitiors</div>
            <div className="flex text-sm items-center rounded border-gray-400 border h-9">
              <div className="font-bold pl-3">Max:</div>
              <div className="flex-grow">
                <input
                  spellCheck={false}
                  name="past_year_visitors_max"
                  onChange={formik.handleChange}
                  value={formik.values.past_year_visitors_max}
                  type="text"
                  placeholder="Type Value"
                  className="px-3 bg-transparent border-0 outline-none text-center w-full placeholder-black-900"
                ></input>
              </div>
            </div>
          </div>
          <div className="w-52 pr-5 mb-8">
            <div className="mb-3 font-bold text-sm">Visitor Types</div>
            <Autocomplete
              defaultValue="All visitor types"
              onBlur={() => formik.setFieldTouched("visitor_type", true)}
              onChange={(e, val) => formik.setFieldValue("visitor_type", val)}
              options={visitor_types}
              blurOnSelect
            />
          </div>
        </div>
        <div className="flex flex-wrap w-full mb-11">
          <div className="w-52 pr-5">
            <div className="mb-3 font-bold text-sm">Past Year Exhibitors</div>
            <div className="flex text-sm items-center rounded border-gray-400 border h-9">
              <div className="font-bold pl-3">Min:</div>
              <div className="flex-grow">
                <input
                  spellCheck={false}
                  name="past_year_exhibitors_min"
                  onChange={formik.handleChange}
                  value={formik.values.past_year_exhibitors_min}
                  type="text"
                  placeholder="Type Value"
                  className="bg-transparent border-0 outline-none text-center w-full px-3 placeholder-black-900"
                ></input>
              </div>
            </div>
          </div>
          <div className="w-52 pr-5 mb-8">
            <div className="mb-3 text-opacity-0 text-black-900 text-sm">Past Year Visitiors</div>
            <div className="flex text-sm items-center rounded border-gray-400 border h-9">
              <div className="font-bold pl-3">Max:</div>
              <div className="flex-grow">
                <input
                  spellCheck={false}
                  name="past_year_exhibitors_max"
                  onChange={formik.handleChange}
                  value={formik.values.past_year_exhibitors_max}
                  type="text"
                  placeholder="Type Value"
                  className="px-3 bg-transparent border-0 outline-none text-center w-full placeholder-black-900"
                ></input>
              </div>
            </div>
          </div>
          <div className="w-52 flex-grow pr-5">
            <div className="mb-3 font-bold text-sm">Noteable Exhibitors</div>
            <input
              spellCheck={false}
              name="noteable_exhibitors"
              onChange={formik.handleChange}
              value={formik.values.noteable_exhibitors}
              type="text"
              className="text-sm mb-7 px-4 h-9 rounded border border-gray-400 w-full focus:border-gray-500 outline-none placeholder-black-900"
              placeholder="Type name of company"
            ></input>
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-8 font-bold">Participation Cost</div>
          <div>
            <div className="mb-3 font-bold text-sm">Visitor Pass Price Range</div>
            <div className="flex flex-wrap">
              <div className="w-52 pr-5 mb-8">
                <div className="flex text-sm items-center rounded border-gray-400 border h-9">
                  <div className="font-bold pl-3">Min:</div>
                  <div className="flex-grow">
                    <input
                      spellCheck={false}
                      name="visitor_pass_price_min"
                      onChange={formik.handleChange}
                      value={formik.values.visitor_pass_price_min}
                      type="text"
                      placeholder="Type Value"
                      className="px-3 bg-transparent border-0 outline-none text-center w-full placeholder-black-900"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="w-52 pr-5 mb-8">
                <div className="flex text-sm items-center rounded border-gray-400 border h-9">
                  <div className="font-bold pl-3">Max:</div>
                  <div className="flex-grow">
                    <input
                      spellCheck={false}
                      name="visitor_pass_price_max"
                      onChange={formik.handleChange}
                      value={formik.values.visitor_pass_price_max}
                      type="text"
                      placeholder="Type Value"
                      className="px-3 bg-transparent border-0 outline-none text-center w-full placeholder-black-900"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-52 pr-5 mb-8">
              <div className="mb-3 font-bold text-sm">Stand Size</div>
              <div className="flex text-sm items-center rounded border-gray-400 border h-9">
                <div className="font-bold pl-3 whitespace-nowrap">Size (m2):</div>
                <div className="flex-grow">
                  <input
                    spellCheck={false}
                    name="stand_size"
                    onChange={formik.handleChange}
                    value={formik.values.stand_size}
                    type="text"
                    placeholder="Type Value"
                    className="px-3 bg-transparent border-0 outline-none text-center w-full placeholder-black-900"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap flex-shrink">
              <div className="w-52 pr-5">
                <div className="mb-3 font-bold text-sm">Stand Price per Sqm</div>
                <div className="flex text-sm items-center rounded border-gray-400 border h-9">
                  <div className="font-bold pl-3">Min:</div>
                  <div className="flex-grow">
                    <input
                      spellCheck={false}
                      name="price_per_sqm_min"
                      onChange={formik.handleChange}
                      value={formik.values.price_per_sqm_min}
                      type="text"
                      placeholder="Type Value"
                      className="px-3 bg-transparent border-0 outline-none text-center w-full placeholder-black-900"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="w-52 pr-5 mb-8">
                <div className="mb-3 text-black-900 text-opacity-0 text-sm">
                  Stand Price per Sqm
                </div>
                <div className="flex text-sm items-center rounded border-gray-400 border h-9">
                  <div className="font-bold pl-3">Max:</div>
                  <div className="flex-grow">
                    <input
                      spellCheck={false}
                      name="price_per_sqm_max"
                      onChange={formik.handleChange}
                      value={formik.values.price_per_sqm_max}
                      type="text"
                      placeholder="Type Value"
                      className="px-3 bg-transparent border-0 outline-none text-center w-full placeholder-black-900"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-52 pr-5 mb-8 flex-grow">
              <div className="mb-3 font-bold text-sm">Stand Construction Type</div>
              <Autocomplete
                onChange={(val) => formik.setFieldValue("stand_construction", val)}
                options={["Own Stand Construction"]}
                defaultValue="Own Stand Construction"
                blurOnSelect
              ></Autocomplete>
            </div>
          </div>
          <div className="mb-3">
            <div className="mb-3 font-bold text-sm">Co-Exhibiting Services</div>
            <div className="flex flex-wrap">
              <div className="w-52 pr-5 mb-8">
                <Autocomplete
                  disableClearable
                  options={["All", "Available", "Not Available"]}
                  onChange={(val) => formik.setFieldValue("coexhibiting_available", val)}
                  defaultValue="Available"
                ></Autocomplete>
              </div>
              <div className="w-52 pr-5 mb-8">
                <div className="flex text-sm items-center rounded border-gray-400 border h-9">
                  <div className="font-bold pl-3">Min:</div>
                  <div className="flex-grow">
                    <input
                      value={formik.values.coexhibiting_price_min}
                      onChange={formik.handleChange}
                      name="coexhibiting_price_min"
                      spellCheck={false}
                      type="text"
                      placeholder="Type Value"
                      className="px-3 bg-transparent border-0 outline-none text-center w-full placeholder-black-900"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="w-52 pr-5 mb-8">
                <div className="flex text-sm items-center rounded border-gray-400 border h-9">
                  <div className="font-bold pl-3">Max:</div>
                  <div className="flex-grow">
                    <input
                      value={formik.values.coexhibiting_price_max}
                      onChange={formik.handleChange}
                      name="coexhibiting_price_max"
                      spellCheck={false}
                      type="text"
                      placeholder="Type Value"
                      className="px-3 bg-transparent border-0 outline-none text-center w-full placeholder-black-900"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {Object.keys(formik.errors).map((x, i) => (
            <div className="mb-2 capitalize text-red" key={`form-error-${i}`}>{`${x
              .split("_")
              .join(" ")} ${formik.errors[x]}`}</div>
          ))}
          <button
            type="submit"
            className="outline-none cursor-pointer font-bold text-white w-44 text-center py-2 rounded bg-gray-600 hover:bg-gray-601 active:bg-gray-602 transition"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchShows;
