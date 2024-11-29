import styles from './CountryItem.module.css';
import PropTypes from 'prop-types';

import { convertLinkToEmoji } from '../hooks/helpers';
CountryItem.propTypes = {
	country: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired, // Assuming `id` is a number
			cityName: PropTypes.string.isRequired,
			emoji: PropTypes.string.isRequired,
			date: PropTypes.instanceOf(Date).isRequired,
		})
	).isRequired,
};

function CountryItem({ country }) {
	return (
		<li className={styles.countryItem}>
			<span>{convertLinkToEmoji(country.emoji)}</span>
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;
