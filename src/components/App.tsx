import axios from "axios";
import { ReactElement, useState } from "react"

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

    }
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
    <div>
      
    </div>
  );
}

export default App;
