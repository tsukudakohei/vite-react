export type AlphabetQuestion = {
  id: number;
  pattern: string;
  choices: string[];
  answer: string;
  type: 'alphabet';
};

export type MathQuestion = {
  id: number;
  question: string;
  choices: {
    value: string;
    unit?: string;
  }[];
  answer: string;
  explanation: string;
  type: 'math';
};

export type PatternQuestion = {
  id: number;
  questionImage: string;
  choicesImage: string;
  choices: string[];
  answer: string;
  type: 'pattern';
};

export type Question = AlphabetQuestion | MathQuestion | PatternQuestion;