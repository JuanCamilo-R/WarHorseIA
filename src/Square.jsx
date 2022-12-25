import './styles/square.css';
import horseIcon from './assets/knight.png';
import bonusIcon from './assets/bonus.png';

export const Square = ({ type, status, onClick }) => {

    const cursor = (type === 'horse' && status === 'green') ? 'pointer' : '';

    // Changes the color of the square according to its status.
    const squareColor = (status) => {
        switch (status) {
            case 'free':
                return '#E8EEF5';
            case 'green':
                return '#51C529';
            case 'red':
                return '#FF4547';
            case 'free-dark':
                return '#8AA7C9';
            default:
                return '#E8EEF5';
        }
    };

    // Adds or removes an image to the square according to its type.
    const showIcon = (type) => {
        switch (type) {
            case '':
                return <></>;
            case 'horse':
                return <img className="squareIcon" alt="Hourse" src={horseIcon} />;
            case 'horse-selected':
                return <img className="squareIcon" alt="Hourse" src={horseIcon} />;
            case 'bonus':
                return <img className="squareIcon" alt="Bonus" src={bonusIcon} />;
            default:
                return <></>;
        }
    };

    // Decides the name of the style according to the type of square.
    const className = (type, status) => {
        if (type === 'horse-selected') {
            return 'horseSquareSelected';
        }

        if (status === 'free-dark') {
            return 'freeDarkSquare';
        }

        return 'square';
    };

    return (
        <div
            className={className(type, status)}
            onClick={onClick}
            style={{
                background: squareColor(status),

                cursor: cursor,
            }}
        >
            {showIcon(type)}
        </div>
    );
};
