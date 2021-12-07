import {
  Alert,
  Button,
  MobileStepper,
  Snackbar,
  TextField,
} from "@mui/material";

import DatePicker from "components/DatePicker";
import RichText from "components/RichText";
import SayembaraLayout from "components/SayembaraLayout";
import React from "react";
import Validator from "laravel-reactjs-validation";
import SayembaraCreateDetailSection from "./SayembaraCreate/SayembaraCreateDetailSection";
import SayembaraCreateLocationSection from "./SayembaraCreate/SayembaraCreateLocationSection";

class SayembaraCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVariant: "standard",
      step: 0,
      maxStep: 2,
      errors: {},
      fields: {
        detailSection: false,
        locationSection: false,
      },
      rules: {
        detailSection: ["required", "accepted"],
        locationSection: ["required", "accepted"],
      },
      labels: {
        detailSection: { fieldLabel: "Sayembara Detail" },
        locationSection: { fieldLabel: "Sayembara Location" },
      },
      alertIsOpen: false,
      errorDisplay: "",
    };
    this.changeStep = this.changeStep.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onStepChange = this.onStepChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.form = new Validator(this);
    this.form.useRules(this.state.rules);
    this.form.useLabels(this.state.labels);
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

  async changeStep(to, callback = () => {}) {
    if (to >= 0 && to <= this.state.maxStep && (await this.onStepChange())) {
      this.setState({ step: to ?? this.state.step }, () =>
        callback(this.state.step)
      );
    }
  }

  async onStepChange() {
    await this.form.validateAll();
    let stepKey = Object.keys(this.state.fields)[this.state.step];
    let errorMessage = this.state.errors[stepKey];
    let currentStepIsValid = !errorMessage;
    if (!currentStepIsValid) {
      this.setState({ alertIsOpen: true, errorDisplay: errorMessage });
    }
    return currentStepIsValid;
  }

  render() {
    const sayembaraDetailSection = (
      <SayembaraCreateDetailSection
        onChange={(value) => this.setFieldValue("detailSection", value)}
      />
    );
    const sayembaraLocationSection = (
      <SayembaraCreateLocationSection
        onChange={(value) => this.setFieldValue("locationSection", value)}
      />
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
    const sayembaraCreateSteps = {
      detailSection: sayembaraDetailSection,
      locationSection: sayembaraLocationSection,
      attachmentSection: sayembaraAttachmentSection,
    };
    const sayembaraCreateBody = (
      <SayembaraLayout.Body className="cr-sayembara-create-body">
        {/* {
          sayembaraCreateSteps[
            Object.keys(sayembaraCreateSteps)[this.state.step]
          ]
        } */}
        {sayembaraLocationSection}
        <Snackbar
          open={this.state.alertIsOpen}
          autoHideDuration={6000}
          onClose={() => this.setState({ alertIsOpen: false })}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {this.state.errorDisplay}
          </Alert>
        </Snackbar>
      </SayembaraLayout.Body>
    );
    const SayembaraStep = (
      <MobileStepper
        variant="dots"
        steps={Object.keys(sayembaraCreateSteps).length}
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
