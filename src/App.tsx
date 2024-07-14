import { useEffect, useState } from "react";
import Card from "./components/Card";
import Congratulation from "./components/Congratulation";


interface Card{
  id: number;
  unique: number;
  cardDetail: string;
  matched: boolean;
}


function App() {
  const[cards, setCards] = useState<Card[]>([]);
  const[flips, setFlips] = useState<number>(0);
  const[choiceOne, setChoiceOne] = useState<Card | null>(null);
  const[choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const[matched, setMatched] = useState<number>(0);

  function generateMathQuestions() {
    const questions = [];
    const answers = [];
    const operations = ['+', '-', 'x']; // Operations to choose from: addition, subtraction, multiplication
    const usedAnswers = new Set();

    for (let i = 1; i <= 8; i++) {
        let num1: number;
        let num2: number;
        let operation: string;
        let question: string = "";
        let answer: string = "";
        
        do {
            num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
            num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
            operation = operations[Math.floor(Math.random() * operations.length)]; // Random operation

            switch (operation) {
                case '+':
                    question = `${num1} + ${num2}`;
                    answer = (num1 + num2).toString();
                    break;
                case '-':
                    question = `${num1} - ${num2}`;
                    answer = (num1 - num2).toString();
                    break;
                case 'x':
                    question = `${num1} x ${num2}`;
                    answer = (num1 * num2).toString();
                    break;
                default:
                    break;
            }
        } while (usedAnswers.has(answer));

        usedAnswers.add(answer);
        questions.push({ id: i, cardDetail: question });
        answers.push({ id: i, cardDetail: answer});
    }

    return [...questions, ...answers];
}


  const shuffleArray = () => {
    console.log('shuffle');
    const array = generateMathQuestions();
    const shuffle = array.sort(() => Math.random() - 0.5)
                          .map((v) => ({...v, unique: Math.random(), matched: false}));

    setCards(shuffle);
    setFlips(0);
    setMatched(0);
  };

  useEffect(() => {
    shuffleArray();
  },[])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.id === choiceTwo.id && choiceOne.unique != choiceTwo.unique) {
        setCards(prevCard => {
          return prevCard.map((card) => {
            if(card.id === choiceOne.id){
              setMatched(curr => curr += 1);
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn()
        },500);
      }
      
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setFlips(prevFlips => prevFlips + 1);
  };

  const handleCardClick = (selectedCard: Card) => {
    choiceOne ? setChoiceTwo(selectedCard) : setChoiceOne(selectedCard);

  };

  return (
    <>
      <nav className="flex justify-center bg-slate-300 py-5">
          <h2 className="text-2xl">Math Memory</h2>
      </nav>
      <div className=" flex flex-col items-center justify-center space-y-5 my-4">
        <button onClick={shuffleArray} className="w-auto mx-auto px-5 py-2 bg-red-300 rounded-lg">Shuffle</button>
        <p className="text-lg">Total Flips: {flips}</p>
      </div>
      
      <div className="flex justify-center items-center">
      <div className="grid grid-cols-4 place-items-center gap-4">
          {
            cards && cards.map((card) => (
              <Card key={card.unique} card={card} handleCardClick={handleCardClick} flipped={card.matched ||card === choiceOne || card === choiceTwo } />
            ))
          }
      </div>
      </div>
      {matched === 16 && <Congratulation flips={flips} reShuffle={shuffleArray} />}
    </>
  )
}

export default App
