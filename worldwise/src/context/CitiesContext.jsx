import { createContext, useEffect, useContext, useReducer, useCallback } from 'react';

const BASE_URL = `http://localhost:8000`;
const CitiesContext = createContext();

const initialState = { citites: [], isLoading: false, currentCity: {}, error: '' };

function reducer(state, action) {
	// Place for all the logic
	// They needto be pure functions
	// When we are working with async data and async code we dont have the ability to pass the data with dispatching
	switch (action.type) {
		case 'loading':
			return { ...state, isLoading: true };

		case 'cities/loaded':
			return { ...state, isLoading: false, cities: action.payload };

		case 'city/loaded':
			return { ...state, isLoading: false, currentCity: action.payload };

		case 'city/created':
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case 'rejected':
			return { ...state, isLoading: false, error: action.payload };
		default:
			throw new Error('Unknown action type');
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: 'loading' });
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({ type: 'cities/loaded', payload: data });
			} catch {
				dispatch({ type: 'rejected', payload: 'There was an error loading data.' });
			}
		}
		fetchCities();
	}, []);

	const getCity = useCallback(
		async function getCity(id) {
			dispatch({ type: 'loading' });
			try {
				const res = await fetch(`${BASE_URL}/cities/${id}`);
				const data = await res.json();
				// setCurrentCity(data);
				dispatch({ type: 'city/loaded', payload: data });
			} catch {
				dispatch({ type: 'rejected', payload: 'There was an error loading current city.' });
			}
		},
		// [currentCity.id]
		[]
	);

	async function createCity(newCity) {
		dispatch({ type: 'loading' });
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await res.json();

			dispatch({ type: 'city/created', payload: data });
		} catch {
			dispatch({ type: 'rejected', payload: 'There was an error with adding a city.' });
		}
	}

	async function deleteCity(id) {
		// It is important as when taken from URL it becomes a string
		if (Number(id) === currentCity.id) return;
		dispatch({ type: 'loading' });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, { method: 'DELETE' });

			dispatch({ type: 'city/deleted', payload: id });
		} catch {
			dispatch({ type: 'rejected', payload: 'There was an error with deleting a city.' });
		}
	}

	return (
		<CitiesContext.Provider
			value={{ cities, isLoading, getCity, currentCity, createCity, deleteCity }}>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error('The CitiesContext was used outside the CitiesProvider!');
	return context;
}

export { CitiesProvider, useCities };
