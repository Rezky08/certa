import {
  Button,
  FormHelperText,
  MobileStepper,
  TextField,
} from "@mui/material";

import DatePicker from "components/DatePicker";
import RichText from "components/RichText";
import SayembaraLayout from "components/SayembaraLayout";
import React from "react";
import Validator from "laravel-reactjs-validation";

class SayembaraCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVariant: "standard",
      step: 0,
      maxStep: 2,
      errors: {},
      fields: {
        title: "",
        start_date: "",
        end_date: "",
        content: "",
      },
    };
    this.changeStep = this.changeStep.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.form = new Validator(this);
    this.form.useRules({
      title: ["required"],
      start_date: ["required"],
      end_date: ["required"],
      content: ["required"],
    });
  }

  onFieldChange() {
    // this.form.validate();
  }

  onBlur(e) {
    console.log(this.state.errors);
  }
  setFieldValue(name, value) {
    // console.log(value?.constructor?.name);
    let fields = { ...this.state.fields };
    fields[name] = value ?? this.state.fields[name];

    this.setState({ fields: fields }, this.onFieldChange);
  }

  componentDidUpdate() {}

  changeStep(value, callback = () => {}) {
    if (value >= 0 && value <= this.state.maxStep) {
      this.setState({ step: value ?? this.state.step }, () =>
        callback(this.state.step)
      );
    }
  }

  onStepChange(currentStep) {
    // TODO : Validate before change
  }

  render() {
    const sayembaraDetailSection = (
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
            helperText={this.state.errors.title}
            error={!!this.state.errors.title}
          />

          <div className="cr-sayembara-create-body-section--form-split">
            <DatePicker
              label="Start Date"
              onChange={(value) => this.setFieldValue("start_date", value)}
              variant={this.state.formVariant}
              name="start_date"
              onBlur={(e) => this.form.eventHandler(e)}
              value={this.state.fields.start_date}
              helperText={this.state.errors.start_date}
              data-attribute-name="Start Date"
              error={!!this.state.errors.start_date}
            />
            <DatePicker
              label="End Date"
              onChange={(value) => this.setFieldValue("end_date", value)}
              variant={this.state.formVariant}
              name="end_date"
              onBlur={(e) => this.form.eventHandler(e)}
              value={this.state.fields.end_date}
              helperText={this.state.errors.end_date}
              error={!!this.state.errors.end_date}
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
                this.form.eventHandler(e, "content", "Content", () => {
                  console.log(this.state.fields);
                  console.log(this.state.errors);
                });
              }}
              error={!!this.state.errors.content}
            />
            <FormHelperText error={!!this.state.errors.content}>
              {this.state.errors.content}
            </FormHelperText>
          </div>
        </div>
      </section>
    );
    const sayembaraLocationSection = (
      <section className="cr-sayembara-create-body-section">
        <span className="cr-sayembara-create-body-section--title">
          Sayembara Detail
        </span>
        <div className="cr-sayembara-create-body-section--form">
          <TextField
            label="Title"
            placeholder="Asian Design Contest"
            variant={this.state.formVariant}
          />
          <div className="cr-sayembara-create-body-section--form-split">
            <DatePicker
              label="Start Date"
              onChange={(value) => console.log(value)}
              variant={this.state.formVariant}
            />
            <DatePicker
              label="End Date"
              onChange={(value) => console.log(value)}
              variant={this.state.formVariant}
            />
          </div>
          <div className="cr-sayembara-create-body-section--form-wrapper">
            <span className="cr-sayembara-create-body-section--form-title">
              Sayembara Content
            </span>
            <RichText />
          </div>
        </div>
      </section>
    );
    const sayembaraAttachmentSection = (
      <section className="cr-sayembara-create-body-section">
        <span className="cr-sayembara-create-body-section--title">
          Sayembara Detail
        </span>
        <div className="cr-sayembara-create-body-section--form">
          <TextField
            label="Title"
            placeholder="Asian Design Contest"
            variant={this.state.formVariant}
          />
          <div className="cr-sayembara-create-body-section--form-split">
            <DatePicker
              label="Start Date"
              onChange={(value) => console.log(value)}
              variant={this.state.formVariant}
            />
            <DatePicker
              label="End Date"
              onChange={(value) => console.log(value)}
              variant={this.state.formVariant}
            />
          </div>
          <div className="cr-sayembara-create-body-section--form-wrapper">
            <span className="cr-sayembara-create-body-section--form-title">
              Sayembara Content
            </span>
            <RichText />
          </div>
        </div>
      </section>
    );
    const sayembaraCreateSteps = [
      sayembaraDetailSection,
      sayembaraLocationSection,
      sayembaraAttachmentSection,
    ];
    const sayembaraCreateBody = (
      <SayembaraLayout.Body className="cr-sayembara-create-body">
        {sayembaraDetailSection}
      </SayembaraLayout.Body>
    );
    const SayembaraStep = (
      <MobileStepper
        variant="dots"
        steps={sayembaraCreateSteps.length}
        position="static"
        activeStep={this.state.step}
        sx={{ flexGrow: 1 }}
        nextButton={
          <Button
            size="small"
            onClick={() => this.changeStep(this.state.step + 1)}
          >
            Next
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => this.changeStep(this.state.step - 1)}
          >
            Back
          </Button>
        }
      />
    );
    return (
      <SayembaraLayout body={sayembaraCreateBody} footer={SayembaraStep} />
    );
  }
}

export default SayembaraCreate;
