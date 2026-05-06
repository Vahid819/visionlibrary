"use client";

export default function FormActions({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isSubmitting,
}) {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-white/[0.01]">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className={`px-5 py-2.5 rounded-xl border border-white/7 bg-transparent text-[#6b7fa0] hover:border-white/15 hover:text-[#f0f4f8] font-medium text-sm transition-all duration-200 ${
          currentStep === 1 ? "invisible" : ""
        }`}
      >
        ← Back
      </button>

      {/* Step indicator */}
      <span className="text-xs text-[#6b7fa0]">
        Step {currentStep} of {totalSteps}
      </span>

      {/* Next / Submit button */}
      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className={`
          px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          ${isLastStep
            ? "bg-green-400 hover:bg-green-300 text-black hover:shadow-lg hover:shadow-green-400/25 hover:-translate-y-0.5"
            : "bg-teal-400 hover:bg-teal-300 text-black hover:shadow-lg hover:shadow-teal-400/25 hover:-translate-y-0.5"
          }
        `}
      >
        {isSubmitting ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Registering...
          </>
        ) : isLastStep ? (
          "✓ Register Student"
        ) : (
          "Continue →"
        )}
      </button>
    </div>
  );
}
