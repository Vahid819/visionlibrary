"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ProgressBar from "./ProgressBar";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2SeatAndPlan from "./Step2SeatAndPlan";
import Step3Review from "./Step3Review";
import SuccessScreen from "./SuccessScreen";
import FormActions from "./FormActions";

const TOTAL_STEPS = 3;

const INITIAL_FORM = {
  // Personal
  photoPreview: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  dob: "",
  gender: "",
  address: "",
  emergencyName: "",
  emergencyPhone: "",
  // Seat & Plan
  seat: null,
  plan: "",
  joinDate: new Date().toISOString().split("T")[0],
  paymentStatus: "Pending",
  shift: "",
  idType: "",
  idNumber: "",
  notes: "",
};

export default function AddStudentForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generic field change handler
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validation per step
  const validateStep = (stepNum) => {
    const newErrors = {};

    if (stepNum === 1) {
      if (!form.firstName.trim()) newErrors.firstName = "First name is required";
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!form.phone.trim() || form.phone.trim().length < 10)
        newErrors.phone = "Valid phone number required";
    }

    if (stepNum === 2) {
      if (!form.seat) newErrors.seat = "Please select a seat";
      if (!form.plan) newErrors.plan = "Please select a plan";
      if (!form.joinDate) newErrors.joinDate = "Join date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(step)) return;

    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      return;
    }

    // Submit on last step
    await handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          dob: form.dob,
          gender: form.gender,
          address: form.address,
          emergencyName: form.emergencyName,
          emergencyPhone: form.emergencyPhone,
          seat: form.seat,
          plan: form.plan,
          joinDate: form.joinDate,
          paymentStatus: form.paymentStatus,
          shift: form.shift,
          idType: form.idType,
          idNumber: form.idNumber,
          notes: form.notes,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to register student");
      }

      setIsSuccess(true);
      toast.success("Student registered successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddAnother = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setStep(1);
    setIsSuccess(false);
  };

  // Step subtitles
  const subtitles = [
    "Fill in student details to register them in Vision Library",
    "Assign a seat and choose a membership plan",
    "Review all information before submitting",
  ];

  return (
    <div className="min-h-screen bg-[#020917] text-[#f0f4f8] p-6 md:p-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[760px] mx-auto">

        {/* Page header */}
        <div className="mb-7">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1.5 text-xs text-[#6b7fa0] hover:text-teal-400 transition-colors mb-5 border-none bg-transparent cursor-pointer font-['DM_Sans']"
          >
            ← Back to dashboard
          </button>

          <div className="flex items-center justify-between mb-1">
            <h1
              className="text-2xl font-black tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Add <span className="text-teal-400">Student</span>
            </h1>
            {/* Step dots */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    s === step
                      ? "w-7 bg-teal-400"
                      : s < step
                      ? "w-7 bg-teal-400/40"
                      : "w-4 bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-[#6b7fa0] font-light">
            {isSuccess ? "Student registered successfully" : subtitles[step - 1]}
          </p>
        </div>

        {/* Progress bar */}
        {!isSuccess && <ProgressBar currentStep={step} />}

        {/* Main form card */}
        <div className="bg-[#060f1e] border border-white/[0.06] rounded-2xl overflow-hidden">
          {isSuccess ? (
            <SuccessScreen form={form} onAddAnother={handleAddAnother} />
          ) : (
            <>
              {step === 1 && (
                <Step1PersonalInfo
                  form={form}
                  errors={errors}
                  onChange={handleChange}
                  onPhotoChange={(url) => handleChange("photoPreview", url)}
                />
              )}
              {step === 2 && (
                <Step2SeatAndPlan
                  form={form}
                  errors={errors}
                  onChange={handleChange}
                />
              )}
              {step === 3 && <Step3Review form={form} />}

              <FormActions
                currentStep={step}
                totalSteps={TOTAL_STEPS}
                onBack={handleBack}
                onNext={handleNext}
                isSubmitting={isSubmitting}
              />
            </>
          )}
        </div>

      </div>
    </div>
  );
}
