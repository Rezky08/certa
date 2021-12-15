import React from "react";
// import Validator from "laravel-reactjs-validation";
import ComboBox from "components/ComboBox";
import { TextField } from "@mui/material";
import SayembaraCreateBase from "./SayembaraCreateBase";
import { getSayembaraCategory } from "api/sayembara";
import { getCity, getDistrict, getProvince } from "api/geo";

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
      comboFields: [
        "province",
        "city",
        "district",
        "sub_district",
        "category",
        "present_type",
      ],
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
        province: [
          { id: 1, label: "DKI Jakarta" },
          { id: 2, label: "Banten" },
        ],
        city: [
          { id: 1, label: "Jakarta Selatan" },
          { id: 2, label: "Jakarta Barat" },
        ],
        district: [],
        sub_district: [],
        category: [
          {
            id: 1,
            label: "Lost Item",
          },
        ],
        present_type: [
          {
            id: 1,
            label: "Money",
          },
        ],
      },
    };
    this.state.fields = {
      ...this.state.fields,
      province_selected:
        this.state.options.province.find(
          (value) => props.fields?.province === value.id
        ) ?? "",
      city_selected:
        this.state.options.city.find(
          (value) => props.fields?.city === value.id
        ) ?? "",
      district_selected:
        this.state.options.district.find(
          (value) => props.fields?.district === value.id
        ) ?? "",
      sub_district_selected:
        this.state.options.sub_district.find(
          (value) => props.fields?.sub_district === value.id
        ) ?? "",
      category_selected:
        this.state.options.category.find(
          (value) => props.fields?.category === value.id
        ) ?? "",
      present_type_selected:
        this.state.options.present_type.find(
          (value) => props.fields?.present_type === value.id
        ) ?? "",
    };
    this.form.useRules(this.state.rules);
    this.getChainedOptions = this.getChainedOptions.bind(this);
  }

  componentDidMount() {
    getSayembaraCategory().then((result) => {
      const { data } = result;
      this.setOptionValue("category", data);
    });
    getProvince().then((result) => {
      const { data } = result;
      this.setOptionValue("province", data);
    });
  }

  getChainedOptions(fieldName = "") {
    switch (fieldName) {
      case "province":
        getCity({ province_id: this.state.fields.province }).then((result) => {
          const { data } = result;
          this.setOptionValue("city", data);
        });
        break;
      case "city":
        getDistrict({
          province_id: this.state.fields.province,
          city_id: this.state.fields.city,
        }).then((result) => {
          const { data } = result;
          this.setOptionValue("district", data);
        });
        break;

      default:
        break;
    }
  }

  setFieldSelectedValue(options = [], fieldName = "") {
    let selectedValue = options.find(
      (value) => this.state.fields[fieldName] === value.id
    );
    selectedValue = selectedValue ?? "";

    this.setFieldValue(`${fieldName}_selected`, selectedValue);
  }

  onFieldChange(fieldName) {
    super.onFieldChange(fieldName);
    if (this.state.comboFields.includes(fieldName)) {
      this.setFieldSelectedValue(this.state.options[fieldName], fieldName);
      this.getChainedOptions(fieldName);
    }
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
              getOptionLabel={(option) => option.name ?? ""}
              options={this.state.options?.province}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={(value) =>
                this.setFieldValue("province", value?.id ?? "")
              }
              helperText={this.state.errors?.province}
              error={!!this.state.errors?.province}
              value={this.state.fields.province_selected}
            />
            <ComboBox
              label="City"
              variant={this.state.formVariant}
              name="city"
              getOptionLabel={(option) => option.name ?? ""}
              options={this.state.options?.city}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={(value) => this.setFieldValue("city", value?.id ?? "")}
              helperText={this.state.errors?.city}
              error={!!this.state.errors?.city}
              value={this.state.fields.city_selected}
            />
          </div>
          <div className="cr-sayembara-create-body-section--form-split">
            <ComboBox
              label="District"
              variant={this.state.formVariant}
              name="district"
              getOptionLabel={(option) => option.name ?? ""}
              options={this.state.options?.district}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={(value) =>
                this.setFieldValue("district", value?.id ?? "")
              }
              helperText={this.state.errors?.district}
              error={!!this.state.errors?.district}
              value={this.state.fields.district_selected}
            />

            <ComboBox
              label="Sub District"
              variant={this.state.formVariant}
              name="sub_district"
              getOptionLabel={(option) => option.name ?? ""}
              options={this.state.options?.sub_district}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={(value) =>
                this.setFieldValue("sub_district", value?.id ?? "")
              }
              helperText={this.state.errors?.sub_district}
              error={!!this.state.errors?.sub_district}
              value={this.state.fields.sub_district_selected}
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
              getOptionLabel={(option) => option.name ?? ""}
              options={this.state.options?.category}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={(value) =>
                this.setFieldValue("category", value?.id ?? "")
              }
              helperText={this.state.errors?.category}
              error={!!this.state.errors?.category}
              value={this.state.fields.category_selected}
            />
          </div>
          <div className="cr-sayembara-create-body-section--form-split">
            <ComboBox
              label="Present Type"
              variant={this.state.formVariant}
              name="present_type"
              options={this.state.options?.present_type}
              onBlur={(e) => this.form.eventHandler(e)}
              onChange={(value) =>
                this.setFieldValue("present_type", value?.id ?? "")
              }
              helperText={this.state.errors?.present_type}
              error={!!this.state.errors?.present_type}
              value={this.state.fields.present_type_selected}
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
              value={this.state.fields.present_value}
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
              value={this.state.fields.max_participant}
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
              value={this.state.fields.max_winner}
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
