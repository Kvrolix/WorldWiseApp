import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CitiesProvider } from './context/CitiesContext';
import { AuthProvider } from './context/FakeAuthContext';

import CountryList from './components/CountryList';
import CityList from './components/CityList';
import City from './components/City';
import Form from './components/Form';
import ProtectedRoute from './pages/ProtectedRoute';
import SpinnerFullPage from './components/SpinnerFullPage';

// import Homepage from './pages/Homepage';
// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import PageNotFound from './pages/PageNotFound';
// import Login from './pages/Login';
// import AppLayout from './pages/AppLayout';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// dist/index.html                   0.45 kB │ gzip:   0.29 kB
// dist/assets/index-7542dd2f.css   30.54 kB │ gzip:   5.09 kB
// dist/assets/index-23d63689.js   508.54 kB │ gzip: 148.12 kB

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route
								path="/pricing"
								element={<Pricing />}
							/>
							<Route
								path="/product"
								// this enables to pass props
								element={<Product />}
							/>
							<Route
								path="/login"
								element={<Login />}
							/>
							<Route
								path="/app"
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}>
								{/* This is a default element that we always want to have if none of the Inner Routes is not specified */}
								<Route
									index
									element={
										<Navigate
											replace // it will replace in the history stack
											to="cities"
										/>
									}
								/>
								{/* It could be any JSX written here */}
								<Route
									path="cities"
									element={<CityList />}
								/>
								<Route
									path="cities/:id"
									element={<City />}
								/>
								<Route
									path="countries"
									element={<CountryList />}
								/>
								<Route
									path="form"
									element={<Form />}
								/>
							</Route>
							<Route
								index
								element={<Homepage />}
							/>
							<Route
								// This will show the page not found for all pages that are not mentioned
								path="*"
								element={<PageNotFound />}
							/>
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
