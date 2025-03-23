export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Quiz: undefined;
  QuizResults: {
    smokingHabits: {
      cigarettesPerDay: number;
      yearsSmoked: number;
      costPerPack: number;
      mainTriggers: string[];
    };
  };
  Breathing: undefined;
  Community: undefined;
  Profile: undefined;
};
