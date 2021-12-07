import React from "react";
import Validator from "laravel-reactjs-validation";
import ComboBox from "components/ComboBox";

class SayembaraCreateLocationSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVariant: props.formVariant ?? "standard",
      errors: {},
      fields: {
        province: "",
        city: "",
        district: "",
        sub_district: "",
        category: "",
        present_type: "",
        present_value: "",
        max_participant: "",
        max_winner: "",
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
        criterias: [],
        present_types: [],
      },
    };
    this.setFieldValue = this.setFieldValue.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);

    this.form = new Validator(this);
    this.form.useRules(this.state.rules);
  }
  setFieldValue(name, value) {
    // console.log(value?.constructor?.name);
    let fields = { ...this.state.fields };
    fields[name] = value ?? this.state.fields[name];

    this.setState({ fields: fields }, this.onFieldChange);
  }

  onFieldChange() {
    console.log(this.state.fields);
    this.props.onChange(Object.keys(this.state.errors).length === 0);
  }

  render() {
    return (
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
  }
}

SayembaraCreateLocationSection.defaultProps = {
  onChange: () => {},
};

export default SayembaraCreateLocationSection;
