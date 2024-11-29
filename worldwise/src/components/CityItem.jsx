import PropTypes from 'prop-types';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import { useCities } from '../context/CitiesContext';
import { convertLinkToEmoji } from '../hooks/helpers';

CityItem.propTypes = {
	city: PropTypes.shape({
		cityName: PropTypes.string.isRequired,
		emoji: PropTypes.string.isRequired,
		date: PropTypes.instanceOf(Date).isRequired,
		id: PropTypes.number.isRequired,
		position: PropTypes.shape({ lat: PropTypes.number.isRequired, lng: PropTypes.number.isRequired }),
	}).isRequired,
};

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));

function CityItem({ city }) {
	const { currentCity, deleteCity } = useCities();
	const { cityName, emoji, date, id, position } = city;

	function handleClick(e) {
		e.preventDefault();
		deleteCity(id);
		console.log('Selected city item was deleted', cityName, id);
	}

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
				<span className={styles.emoji}>{convertLinkToEmoji(emoji)}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>{formatDate(date)}</time>
				<button
					className={styles.deleteBtn}
					onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
