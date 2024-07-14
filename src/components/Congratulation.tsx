import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

interface Props{
    flips: number;
    reShuffle(): void;
}


function Congratulation(props: Props) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Show confetti for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-600 animate-bounce">Congratulations!</h1>
        <p className="text-xl my-4">You took {props.flips} to complete !</p>
        <button onClick={props.reShuffle} className="w-auto mx-auto px-5 py-2 bg-red-300 rounded-lg">New Game</button>
      </div>
    </div>
  );
};

export default Congratulation;
