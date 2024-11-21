import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionCard } from '@/components/QuestionCard';
import { alphabetQuestions } from '@/data/alphabetQuestions';
import { mathQuestions } from '@/data/mathQuestions';
import { patternQuestions } from '@/data/patternQuestions';
import { Question } from '@/types/questions';

const allQuestions: Question[] = [...alphabetQuestions, ...mathQuestions, ...patternQuestions];
const QUESTIONS_PER_SET = 10;

const App = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(allQuestions.length).fill(''));
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (questionIndex: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentSet * QUESTIONS_PER_SET + questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNextSet = () => {
    if (currentSet < Math.floor((allQuestions.length - 1) / QUESTIONS_PER_SET)) {
      setCurrentSet(currentSet + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsCompleted(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === allQuestions[index].answer ? 1 : 0);
    }, 0);
  };

  const handlePreviousSet = () => {
    if (currentSet > 0) {
      setCurrentSet(currentSet - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isCompleted) {
    const score = calculateScore();
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle>テスト結果</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl mb-4">
              {allQuestions.length}問中 {score}問正解
            </p>
          </CardContent>
        </Card>

        {allQuestions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionIndex={index}
            selectedAnswer={answers[index]}
            onAnswerSelect={(value) => handleAnswer(index, value)}
            showResults
          />
        ))}
      </div>
    );
  }

  const currentQuestions = allQuestions.slice(
    currentSet * QUESTIONS_PER_SET,
    (currentSet + 1) * QUESTIONS_PER_SET
  );

  const isLastSet = currentSet === Math.floor((allQuestions.length - 1) / QUESTIONS_PER_SET);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">第{currentSet + 1}セット</h2>        
      </div>

      {currentQuestions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          questionIndex={currentSet * QUESTIONS_PER_SET + index}
          selectedAnswer={answers[currentSet * QUESTIONS_PER_SET + index]}
          onAnswerSelect={(value) => handleAnswer(index, value)}
        />
      ))}

      <div className="flex justify-between mt-6">
        <Button
          onClick={handlePreviousSet}
          disabled={currentSet === 0}
          variant="outline"
        >
          戻る
        </Button>
        <Button onClick={handleNextSet}>
          {isLastSet ? '完了' : '次へ'}
        </Button>
      </div>
    </div>
  );
}

export default App;