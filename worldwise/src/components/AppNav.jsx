// Although it is better to not use desctructuring of the css as i know it comes from the styles when it gets more crowded in the code
import { NavLink } from 'react-router-dom';
import styles from './AppNav.module.css';
// import { nav } from './AppNav.module.css';

export default function AppNav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink to="cities">Cities</NavLink>
				</li>
				<li>
					<NavLink to="countries">Countries</NavLink>
				</li>
			</ul>
		</nav>
	);
}
