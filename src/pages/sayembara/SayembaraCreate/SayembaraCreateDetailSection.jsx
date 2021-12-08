import React from "react";
import { FormHelperText, TextField } from "@mui/material";

import DatePicker from "components/DatePicker";
import RichText from "components/RichText";
// import Validator from "laravel-reactjs-validation";
import SayembaraCreateBase from "./SayembaraCreateBase";

class SayembaraCreateDetailSection extends SayembaraCreateBase {
  constructor(props) {
    super(props);
    this.state = {
      formVariant: props.formVariant ?? "standard",
      errors: {},
      fields: {
        title: props.fields?.title ?? "",
        start_date: props.fields?.start_date ?? "",
        end_date: props.fields?.end_date ?? "",
        content: props.fields?.content ?? "",
      },
    };

    this.form.useRules({
      title: ["required"],
      start_date: ["required", "before_or_equal:end_date"],
      end_date: ["required", "after_or_equal:start_date"],
      content: ["required"],
    });
  }
  render() {
    return (
      <section className="cr-sayembara-create-body-section">
        <span className="cr-sayembara-create-body-section--title">
          Sayembara Detail
        </span>
        <div className="cr-sayembara-create-body-section--form">
          <TextField
            label="Title"
            placeholder="Asian Design Contest"
            variant={this.state.formVariant}
            name="title"
            onBlur={(e) => this.form.eventHandler(e)}
            onChange={(e) => this.setFieldValue("title", e.target.value)}
            value={this.state.fields.title}
            helperText={this.state.errors?.title}
            error={!!this.state.errors?.title}
          />

          <div className="cr-sayembara-create-body-section--form-split">
            <DatePicker
              label="Start Date"
              onChange={(value) => this.setFieldValue("start_date", value)}
              variant={this.state.formVariant}
              name="start_date"
              onBlur={(e) => {
                this.form.eventHandler(e);
                this.form.eventHandler(e, "end_date");
              }}
              value={this.state.fields.start_date}
              helperText={this.state.errors?.start_date}
              data-attribute-name="Start Date"
              error={!!this.state.errors?.start_date}
            />
            <DatePicker
              label="End Date"
              onChange={(value) => this.setFieldValue("end_date", value)}
              variant={this.state.formVariant}
              name="end_date"
              onBlur={(e) => {
                this.form.eventHandler(e);
                this.form.eventHandler(e, "start_date");
              }}
              value={this.state.fields.end_date}
              helperText={this.state.errors?.end_date}
              error={!!this.state.errors?.end_date}
            />
          </div>
          <div className="cr-sayembara-create-body-section--form-wrapper">
            <span className="cr-sayembara-create-body-section--form-title">
              Sayembara Content
            </span>
            <RichText
              onChange={({ html, plain }) =>
                this.setFieldValue("content", plain.length > 0 ? html : "")
              }
              onBlur={(e) => {
                this.form.eventHandler(e, "content", "Content");
              }}
              error={!!this.state.errors?.content}
              value={this.state.fields.content}
            />
            <FormHelperText error={!!this.state.errors?.content}>
              {this.state.errors?.content}
            </FormHelperText>
          </div>
        </div>
      </section>
    );
  }
}

export default SayembaraCreateDetailSection;
