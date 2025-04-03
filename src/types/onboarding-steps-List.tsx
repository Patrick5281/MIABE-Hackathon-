export interface BaseComponentProps {
    next: () => void;
    prev: () => void;
    isFirstStep: () => boolean;
    isFinalStep: () => boolean;
    stepsList: onboardingStepsListInterface[];
    getCurrentStep: () => onboardingStepsListInterface | undefined;
  }
  
  export interface onboardingStepsListInterface {
    id: number;
    label: string;
    component: {
      step: React.ComponentType<BaseComponentProps>;
    };
  }

export interface UserPreferences {
  fullName: string;
  destination: string;
  budget: string;
  housingType: string;
  amenities: {
    internet: boolean;
    airConditioning: boolean;
    pool: boolean;
    kitchen: boolean;
    office: boolean;
    fan: boolean;
    mixer: boolean;
    receptionRoom: boolean;
  };
}

export interface QuestionnaireFormFields extends UserPreferences {}