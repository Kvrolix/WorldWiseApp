import styles from './Sidebar.module.css';
import Logo from './Logo';
import AppNav from './AppNav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			{/* The outlet defines where the component will be rendered */}
			<Outlet />
			<Footer />
		</div>
	);
}
export default Sidebar;
