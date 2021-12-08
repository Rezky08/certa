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
      steps: {
        detailSection: false,
        locationSection: false,
      },
      stepComponents: {
        detailSection: React.createRef(),
        locationSection: React.createRef(),
      },
      fields: {
        title: "",
        start_date: "",
        end_date: "",
        content: "",
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
      stepRules: {
        detailSection: ["required", "accepted"],
        locationSection: ["required", "accepted"],
      },
      stepLabels: {
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

    this.stepValidator = new Validator(this);

    this.stepValidator.useFields("steps");
    this.stepValidator.useRules(this.state.stepRules);
    this.stepValidator.useLabels(this.state.stepLabels);
  }

  onFieldChange() {
    console.log(this.state.fields);
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
  setStepValue(name, value) {
    // console.log(value?.constructor?.name);
    let steps = { ...this.state.steps };
    steps[name] = value ?? this.state.steps[name];

    this.setState({ steps: steps }, this.onStepChanged);
  }

  componentDidUpdate() {}

  async changeStep(to, callback = () => {}) {
    if (to >= 0 && to <= this.state.maxStep) {
      if (this.state.step < to) {
        if (!(await this.onStepChange())) {
          return false;
        }
      }
      this.setState({ step: to ?? this.state.step }, () =>
        callback(this.state.step)
      );
    }
  }

  async onStepChange() {
    let stepKey = Object.keys(this.state.steps)[this.state.step];
    let currentStepComponent = this.state.stepComponents[stepKey]?.current;
    await currentStepComponent?.validateAll();

    this.setStepValue(
      stepKey,
      Object.keys(currentStepComponent?.state?.errors).length === 0
    );

    await this.stepValidator.validateAll();
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
        onChange={(value) => this.setStepValue("detailSection", value)}
        ref={this.state.stepComponents.detailSection}
        setFieldValue={this.setFieldValue}
        fields={this.state.fields}
      />
    );
    const sayembaraLocationSection = (
      <SayembaraCreateLocationSection
        onChange={(value) => this.setStepValue("locationSection", value)}
        ref={this.state.stepComponents.locationSection}
        setFieldValue={this.setFieldValue}
        fields={this.state.fields}
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
        {
          sayembaraCreateSteps[
            Object.keys(sayembaraCreateSteps)[this.state.step]
          ]
        }
        {/* {sayembaraLocationSection} */}
        <Snackbar
          open={this.state.alertIsOpen}
          autoHideDuration={3000}
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
