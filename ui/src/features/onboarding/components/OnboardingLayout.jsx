// Shared layout for all onboarding steps.
// Props:
//   currentStep — 0-indexed step number (0=Welcome, 1=Link, 2=Scan, 3=Genres)
//   children    — the main content rendered in the centre

const STEPS = ['Welcome', 'Link', 'Scan', 'Genres'];

export default function OnboardingLayout({ currentStep, stepLabel, children }) {
  return (
    <div
      className="iris-glow h-full flex relative overflow-hidden"
      style={{ backgroundColor: '#0a0a14' }}
    >
      {/* Left step tracker */}
      <div className="relative z-10 flex flex-col justify-center gap-6 pl-16 pr-8">
        {STEPS.map((step, i) => {
          const isActive   = i === currentStep;
          const isComplete = i < currentStep;

          return (
            <div key={step} className="flex items-center gap-3">
              {/* Connector line above (except first) */}
              <div className="relative flex flex-col items-center">
                {i > 0 && (
                  <div
                    className="absolute -top-6 w-px h-6"
                    style={{ backgroundColor: isComplete || isActive ? 'var(--color-primary)' : '#2a2a40' }}
                  />
                )}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300"
                  style={
                    isActive
                      ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: '#fff' }
                      : isComplete
                        ? { backgroundColor: 'transparent', borderColor: 'var(--color-primary)', color: 'var(--color-primary-light)' }
                        : { backgroundColor: 'transparent', borderColor: '#2a2a40', color: '#52525b' }
                  }
                >
                  {i + 1}
                </div>
              </div>
              {/* Only show label for the active step */}
              {isActive && (
                <span className="text-sm font-medium text-white">
                  {isActive && stepLabel ? stepLabel : step}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8">
        {children}
      </div>
    </div>
  );
}
