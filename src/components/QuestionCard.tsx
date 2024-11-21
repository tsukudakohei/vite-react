import { Question } from '@/types/questions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  selectedAnswer: string;
  onAnswerSelect: (value: string) => void;
  showResults?: boolean;
}

export function QuestionCard({
  question,
  questionIndex,
  selectedAnswer,
  onAnswerSelect,
  showResults = false,
}: QuestionCardProps) {
  const renderQuestionContent = () => {
    if (question.type === 'pattern') {
      return (
        <div className="space-y-4">
          <img 
            src={`/images/${question.questionImage.split('/').pop()}`} 
            alt="Pattern Question" 
            className="mx-auto max-w-full h-auto"
          />
          <img 
            src={`/images/${question.choicesImage.split('/').pop()}`} 
            alt="Pattern Choices" 
            className="mx-auto max-w-full h-auto"
          />
        </div>
      );
    }
    
    const questionText = question.type === 'alphabet' ? question.pattern : question.question;
    return (
      <span className="text-navy-600 text-xl tracking-wider font-mono">
        {questionText}
      </span>
    );
  };

  const choices = question.type === 'math' 
    ? question.choices.map(c => c.value)
    : question.choices;

  return (
    <Card className="mb-6 w-full max-w-full overflow-hidden"> 
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium mr-2">
            第{questionIndex + 1}問
          </span>
          {question.type !== 'pattern' && renderQuestionContent()}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {question.type === 'pattern' && renderQuestionContent()}
        
        {showResults && (
          <div className="flex justify-between items-center mb-4">
            <span className={`font-bold ${selectedAnswer === question.answer ? 'text-sky-500' : 'text-red-500'}`}>
              {selectedAnswer === question.answer ? '正解' : '不正解'}
            </span>
            <span>あなたの回答: {selectedAnswer || '未回答'}</span>
            <span className="font-bold">正解: {question.answer}</span>
          </div>
        )}
        {'explanation' in question && showResults && (
          <p className="mb-4 text-gray-600">{question.explanation}</p>
        )}
        <RadioGroup
          value={selectedAnswer}
          onValueChange={onAnswerSelect}
          className="flex space-x-4"
        >
          {choices.map((choice, choiceIndex) => (
            <div key={choiceIndex} className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 border flex items-center justify-center text-xl text-navy-600">
                {choice}
              </div>
              <RadioGroupItem
                value={choice}
                id={`q${question.id}-${choice}`}
                className="sr-only"
              />
              <Label
                htmlFor={`q${question.id}-${choice}`}
                className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer"
              >
                {selectedAnswer === choice && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}