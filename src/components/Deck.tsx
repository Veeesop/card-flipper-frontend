import { ReactElement } from "react";
import { CardSide } from "./App";


interface Props {
    imageName?: string;
    cardSide: CardSide;
    clickAction: Function;
}

export default function Deck(props: Props): ReactElement<Props> {
    const {imageName, cardSide, clickAction} = props;

    const imagePath: string = cardSide === CardSide.FRONT 
        ? `${process.env.REACT_APP_S3_URL}/${imageName}.png` 
        : `${process.env.REACT_APP_S3_URL}/card-back.png`;
    
    return (
        
        <div
        style={{ height: '50vh', margin: '0 1rem', cursor: 'pointer' }}
        onClick={():void => clickAction() }
        >
            <img src={imagePath} alt={`${cardSide === CardSide.FRONT && imageName 
                ? imageName.replace(/_/g, ' ') 
                : 'The Back of a playing card'
                }`} 
                style={{
                    maxHeight: '100%',
                    border: '1px solid transparent',
                    outline: '4px solid white',
                    borderRadius: '10px',
                  }}
            />
        </div>
    )
}