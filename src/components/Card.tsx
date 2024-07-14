
interface Card{
    card: {
        id: number;
        unique: number;
        cardDetail: string;
        matched: boolean;
    }
    handleCardClick({}): void
    flipped: boolean
}


export default function Card(props: Card) {
  return (
    <div className="w-20 h-20 md:w-36 md:h-36 perspective">
    <div key={props.card.unique} 
         onClick={() => props.handleCardClick(props.card)}  
         className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${props.flipped ? 'rotateY-180' : ''}`}>
        
        {/* Front Side */}
        <div className="absolute w-full h-full bg-slate-300 flex justify-center items-center backface-hidden">

        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full bg-red-500 text-white flex justify-center items-center backface-hidden transform rotateY-180">
            <span>{props.card.cardDetail}</span>
        </div>
    </div>
</div>
  )
}
