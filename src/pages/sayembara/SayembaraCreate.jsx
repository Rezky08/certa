import { Alert, Button, MobileStepper, Snackbar } from "@mui/material";

import SayembaraLayout from "components/SayembaraLayout";
import React from "react";
import Validator from "laravel-reactjs-validation";
import SayembaraCreateDetailSection from "./SayembaraCreate/SayembaraCreateDetailSection";
import SayembaraCreateLocationSection from "./SayembaraCreate/SayembaraCreateLocationSection";
import SayembaraCreateAttachmentSection from "./SayembaraCreate/SayembaraCreateAttachmentSection";
import { createNewSayembara } from "api/sayembara";

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
        attachmentSection: false,
      },
      stepComponents: {
        detailSection: React.createRef(),
        locationSection: React.createRef(),
        attachmentSection: React.createRef(),
      },
      fields: {
        title: null,
        start_date: null,
        end_date: null,
        content: null,
        province: null,
        city: null,
        district: null,
        sub_district: null,
        category: null,
        present_type: null,
        present_value: null,
        max_participant: null,
        max_winner: null,
        attachments: [],
      },
      stepRules: {
        detailSection: ["required", "accepted"],
        locationSection: ["required", "accepted"],
        attachmentSection: ["required", "accepted"],
      },
      stepLabels: {
        detailSection: { fieldLabel: "Sayembara Detail" },
        locationSection: { fieldLabel: "Sayembara Location" },
        attachmentSection: { fieldLabel: "Sayembara Attachment" },
      },
      alertIsOpen: false,
      errorDisplay: "",
    };
    this.changeStep = this.changeStep.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onStepChange = this.onStepChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.stepValidator = new Validator(this);

    this.stepValidator.useFields("steps");
    this.stepValidator.useRules(this.state.stepRules);
    this.stepValidator.useLabels(this.state.stepLabels);
  }

  onSubmit() {
    this.onStepChange().then(() => {
      if (Object.keys(this.state.errors).length === 0) {
        createNewSayembara(this.state.fields);
      }
    });
  }

  onFieldChange() {}

  onBlur(e) {
    console.log(this.state.errors);
  }
  setFieldValue(name, value) {
    if (!Object.keys(this.state.fields).includes(name)) {
      return false;
    }
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
      <SayembaraCreateAttachmentSection
        onChange={(value) => this.setStepValue("attachmentSection", value)}
        ref={this.state.stepComponents.attachmentSection}
        setFieldValue={this.setFieldValue}
        fields={this.state.fields}
      />
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
      <section className="cr-sayembara-create-footer">
        {this.state.step === Object.keys(sayembaraCreateSteps).length - 1 ? (
          <Button
            variant="contained"
            fullWidth
            onClick={this.onSubmit}
            className="cr-button"
          >
            Submit
          </Button>
        ) : null}
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
      </section>
    );
    return (
      <SayembaraLayout body={sayembaraCreateBody} footer={SayembaraStep} />
    );
  }
}

export default SayembaraCreate;
