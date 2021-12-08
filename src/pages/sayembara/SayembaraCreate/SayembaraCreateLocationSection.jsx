import React from "react";
// import Validator from "laravel-reactjs-validation";
import ComboBox from "components/ComboBox";
import { TextField } from "@mui/material";
import SayembaraCreateBase from "./SayembaraCreateBase";

class SayembaraCreateLocationSection extends SayembaraCreateBase {
  constructor(props) {
    super(props);
    this.state = {
      formVariant: props.formVariant ?? "standard",
      errors: {},
      fields: {
        province: props.fields?.province ?? "",
        city: props.fields?.city ?? "",
        district: props.fields?.district ?? "",
        sub_district: props.fields?.sub_district ?? "",
        category: props.fields?.category ?? "",
        present_type: props.fields?.present_type ?? "",
        present_value: props.fields?.present_value ?? "",
        max_participant: props.fields?.max_participant ?? "",
        max_winner: props.fields?.max_winner ?? "",
      },
      rules: {
        province: ["required"],
        city: ["required"],
        district: [],
        sub_district: [],
        category: ["required"],
        present_type: ["required"],
        present_value: ["required"],
        max_participant: ["required"],
        max_winner: ["required"],
      },
      options: {
        provinces: [
          { id: 1, label: "DKI Jakarta" },
          { id: 2, label: "Banten" },
        ],
        cities: [
          { id: 1, label: "Jakarta Selatan" },
          { id: 2, label: "Jakarta Barat" },
        ],
        districts: [],
        sub_districts: [],
        categories: [
          {
            id: 1,
            label: "Lost Item",
          },
        ],
        present_types: [
          {
            id: 1,
            label: "Money",
          },
        ],
      },
    };
    this.form.useRules(this.state.rules);
  }
  render() {
    const locationSection = (
      <section className="cr-sayembara-create-body-section">
        <span className="cr-sayembara-create-body-section--title">
          Sayembara Location
        </span>
        <div className="cr-sayembara-create-body-section--form">
          <div className="cr-sayembara-create-body-section--form-split">
            <ComboBox
              label="Province"
              variant={this.state.formVariant}
              name="province"
              options={this.state.options?.provinces}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={({ id }) => this.setFieldValue("province", id)}
              helperText={this.state.errors?.province}
              error={!!this.state.errors?.province}
            />
            <ComboBox
              label="City"
              variant={this.state.formVariant}
              name="city"
              options={this.state.options?.cities}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={({ id }) => this.setFieldValue("city", id)}
              helperText={this.state.errors?.city}
              error={!!this.state.errors?.city}
            />
          </div>
          <div className="cr-sayembara-create-body-section--form-split">
            <ComboBox
              label="District"
              variant={this.state.formVariant}
              name="district"
              options={this.state.options?.districts}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={({ id }) => this.setFieldValue("district", id)}
              helperText={this.state.errors?.district}
              error={!!this.state.errors?.district}
            />

            <ComboBox
              label="Sub District"
              variant={this.state.formVariant}
              name="sub_district"
              options={this.state.options?.sub_districts}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={({ id }) => this.setFieldValue("sub_district", id)}
              helperText={this.state.errors?.sub_district}
              error={!!this.state.errors?.sub_district}
            />
          </div>
        </div>
      </section>
    );
    const criteriaSection = (
      <section className="cr-sayembara-create-body-section">
        <span className="cr-sayembara-create-body-section--title">
          Sayembara Criteria
        </span>
        <div className="cr-sayembara-create-body-section--form">
          <div className="cr-sayembara-create-body-section--form-split">
            <ComboBox
              label="Category"
              variant={this.state.formVariant}
              name="category"
              options={this.state.options?.categories}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={({ id }) => this.setFieldValue("category", id)}
              helperText={this.state.errors?.category}
              error={!!this.state.errors?.category}
            />
          </div>
          <div className="cr-sayembara-create-body-section--form-split">
            <ComboBox
              label="Present Type"
              variant={this.state.formVariant}
              name="present_type"
              options={this.state.options?.present_types}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={({ id }) => this.setFieldValue("present_type", id)}
              helperText={this.state.errors?.present_type}
              error={!!this.state.errors?.present_type}
            />

            <TextField
              label="Present"
              variant={this.state.formVariant}
              name="present_value"
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={(e) =>
                this.setFieldValue("present_value", e.target.value)
              }
              helperText={this.state.errors?.present_value}
              error={!!this.state.errors?.present_value}
            />
          </div>
          <div className="cr-sayembara-create-body-section--form-split">
            <TextField
              type="number"
              label="Max Participant"
              variant={this.state.formVariant}
              name="max_participant"
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={(e) =>
                this.setFieldValue("max_participant", e.target.value)
              }
              helperText={this.state.errors?.max_participant}
              error={!!this.state.errors?.max_participant}
            />

            <TextField
              type="number"
              label="Max Winner"
              variant={this.state.formVariant}
              name="max_winner"
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={(e) => this.setFieldValue("max_winner", e.target.value)}
              helperText={this.state.errors?.max_winner}
              error={!!this.state.errors?.max_winner}
            />
          </div>
        </div>
      </section>
    );
    return (
      <>
        {locationSection}
        {criteriaSection}
      </>
    );
  }
}

export default SayembaraCreateLocationSection;
