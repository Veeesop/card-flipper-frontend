import axios from "axios";
import { ReactElement, useState } from "react"
import Deck from "./Deck";
import EmptyDeck from "./EmptyDeck";

export enum CardSide {
  FRONT,
  BACK
}

interface Card {
  suit: string,
  sequence: number,
  name: string
}

interface CardResponse {
  data : {
    cardData: {
      card?: Card,
      cardsRemaining: number,
    };
    msg: string,
    error: boolean
  }
}

function App(): ReactElement {
const [cardsRemaining, setCardsRemaining] = useState<number>(53)
const [flippedCardName, setFlippedCardName] = useState<string>('')

  const shuffleDeck = async ():Promise<void> => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/new-deck`);
    if(!response.data.error){
      setCardsRemaining(52)
      return;
    }
    console.error(response.data.msg);
  }

  const flipCard = async ():Promise<void> => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/next-card`)
    setCardsRemaining(response.data.cardData.cardsRemaining);

    if(response.data.cardData.card){
      setFlippedCardName(response.data.cardData.card.name)
    }
  }

  const unflipCard = async ():Promise<void> => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/unflip-card`)
    setCardsRemaining(response.data.cardData.cardsRemaining)

    if(response.data.cardData.card) {
      setFlippedCardName(response.data.cardData.card.name)
    }
  }


  return (
    <div
    style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#00613e',
    }}
    >
      <div className="draw-pile">
        { cardsRemaining > 52 || cardsRemaining < 1 ? (
          <EmptyDeck clickAction={shuffleDeck} displayText="Shuffle Deck" /> 
          ) : (
            <Deck cardSide={CardSide.BACK} clickAction={flipCard} />
          )}
      </div>
      <div className="discard-pile">
        { cardsRemaining > 51  ? (
          <EmptyDeck displayText="Flip The Cars" /> 
          ) : (
            <Deck cardSide={CardSide.FRONT} clickAction={unflipCard}  imageName={flippedCardName}/>
          )}
      </div>
    </div>
  );
}

export default App;
