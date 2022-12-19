import './styles/square.css';
import horseIcon from './assets/knight.png';

export const Square = ({ id, type, status, onClick = () => {} }) => {
  const cursor = type === "horse" ? "pointer" : ""

  const squareColor = (status) => {
    switch (status) {
      case 'free':
        return "#E8EEF5";
      case 'green':
        return "#51C529";
      case 'red':
        return "#FF4547";
      case 'free-dark':
        return "#8AA7C9";
      default:
        return '#E8EEF5';
    }
  };

  const showIcon = type => {
		if (type === "horse") {
			return <img className='horseIcon' alt="Hourse" src={horseIcon}/>;
		} else {
			return <></>;
		}
	};

  return (
    <div
      className="square"
      onClick={() => onClick(id, type, status)}
      style={{ background: squareColor(status), border: '1px solid' + squareColor(status),  cursor: cursor }}>
      {showIcon(type)}
    </div>
  );
};