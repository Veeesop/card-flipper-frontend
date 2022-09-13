import { ReactElement } from "react";

interface Props {
    clickAction?: Function;
    displayText: string;
}

export default function EmptyDeck(props: Props): ReactElement<Props> {
    const {displayText, clickAction} = props;
    const convertVHToPix = () => {
        return document.documentElement.clientHeight;
    }
    return (
        <div
            onClick={():void => clickAction && clickAction()}
            style={{
                width: `${convertVHToPix() * 0.5 * 0.688696}px`,
                height: '50vh',
                margin: '0 .78rem',
                border: '4px solid white',
                color: 'white',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Crete Round',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
            <p>{displayText.toUpperCase()}</p>
        </div>
    )
}