import { createContext, useState, useEffect, useContext, useReducer } from 'react';

const BASE_URL = `http://localhost:8000`;
const CitiesContext = createContext();

const initialState = { citites: [], isLoading: false, currentCity: {} };

function reducer(state, action) {
	// Place for all the logic
	// They needto be pure functions
	// When we are working with async data and async code we dont have the ability to pass the data with dispatching
	switch (action.type) {
		case 'loading':
			return { ...state, isLoading: true };

		case 'cities/loaded':
			return { ...state, isLoading: false, cities: action.payload };
		case 'citites/created':
			return;
		case 'citites/deleted':
			return;
		default:
			throw new Error('Unknown action type');
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);
	// const [cities, setCities] = useState([]);
	// const [currentCity, setCurrentCity] = useState({});
	// const [isLoading, setIsLoading] = useState(false);

	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: 'loading' });
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch (err) {
				alert('There was an error loading data');
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch (err) {
			alert('There was an error loading data');
		} finally {
			setIsLoading(false);
		}
	}

	async function createCity(newCity) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities`, { method: 'POST', body: JSON.stringify(newCity), headers: { 'Content-Type': 'application/json' } });
			const data = await res.json();
			console.log(data);
			setCities((cities) => [...cities, data]);
		} catch (err) {
			alert('There was an error with adding a city.');
		} finally {
			setIsLoading(false);
		}
	}

	async function deleteCity(id) {
		try {
			setIsLoading(true);
			await fetch(`${BASE_URL}/cities/${id}`, { method: 'DELETE' });
			setCities((cities) => cities.filter((city) => city.id !== id));
		} catch (err) {
			alert('There was an error with deleting a city.');
		} finally {
			setIsLoading(false);
		}
	}

	return <CitiesContext.Provider value={{ cities, isLoading, getCity, currentCity, createCity, deleteCity }}>{children}</CitiesContext.Provider>;
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error('The CitiesContext was used outside the CitiesProvider!');
	return context;
}

export { CitiesProvider, useCities };
