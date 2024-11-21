import { useEffect } from 'react';

interface TimerProps {
  timeLeft: number;
  onTimeUp: () => void;
}

export function Timer({ timeLeft, onTimeUp }: TimerProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft <= 1) {
        clearInterval(timer);
        onTimeUp();
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="text-right text-lg font-semibold">
      残り時間: {timeLeft}分
    </div>
  );
}