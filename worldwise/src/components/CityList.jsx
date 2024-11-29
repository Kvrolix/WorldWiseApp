import PropTypes from 'prop-types';
import { useCities } from '../context/CitiesContext';
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';

// CountryList.propTypes = {
// 	isLoading: PropTypes.bool.isRequired,
// 	cities: PropTypes.arrayOf.isRequired,
// };

// TODO BUG NOT FULLY UPDATED
CityList.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	cities: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired, // Assuming `id` is a number
			cityName: PropTypes.string.isRequired,
			emoji: PropTypes.string.isRequired,
			date: PropTypes.instanceOf(Date).isRequired,
		})
	).isRequired,
};

function CityList() {
	const { cities, isLoading } = useCities();

	if (isLoading) return <Spinner />;

	if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;
	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem
					city={city}
					key={city.id}
				/>
			))}
		</ul>
	);
}

export default CityList;
