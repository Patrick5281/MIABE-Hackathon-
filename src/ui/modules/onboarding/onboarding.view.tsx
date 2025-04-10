import { BaseComponentProps } from "@/types/onboarding-steps-List";

export const OnboardingView = ({
    getCurrentStep,
    next,
    prev,
    isFirstStep,
    isFinalStep,
    stepsList,
}: BaseComponentProps) => {
    const currentStep = getCurrentStep;
    
    if (currentStep?.component) {
        const Component = currentStep.component.step;
        
        return (
            <div>
                {Component && (
                    <Component
                        getCurrentStep={currentStep}
                        next={next}
                        prev={prev}
                        isFirstStep={isFirstStep}
                        isFinalStep={isFinalStep}
                        stepsList={stepsList}
                    />
                )}
            </div>
        );
    }
    
    return null;
};