import './styles/square.css';
import horseIcon from './assets/knight.png';
import bonusIcon from './assets/bonus.png';

export const Square = ({ type, status, onClick }) => {

    const cursor = (type === 'horse' && status === 'green') ? 'pointer' : '';

    // Changes the color of the square according to its status.
    const squareColor = (status) => {
        const color = {
            'free': '#E8EEF5',
            'green': '#51C529',
            'red': '#FF4547',
            'free-dark': '#8AA7C9',
            'default': '#E8EEF5',
        };
        return (color[status] ?? color['default']);
    }

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
    }

    // Decides the name of the style according to the type of square.
    const className = (type, status) => {
        const name = {
            'horse-selected': 'horseSquareSelected',
            'free-dark': 'freeDarkSquare',
            'default': 'square',
        };
        return (name[type] ?? name[status] ?? name['default']);
    }

    return (
        <div
            className={className(type, status)}
            onClick={onClick}
            style={{ background: squareColor(status), cursor: cursor, }}
        >
            {showIcon(type)}
        </div>
    );
}
