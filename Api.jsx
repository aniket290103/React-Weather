import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Api() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        setLoading(true); 
        setWeather(null); 
        setError(""); 
        const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "fde2b37d85msh253b511f314bd00p1e14c5jsn69b7960b2839",
                "x-rapidapi-host": "open-weather13.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const result = await response.json();
                setTimeout(() => {
                    setWeather(result); 
                    setLoading(false); 
                }, 2000); 
            } else {
                setError("City not found");
                setLoading(false);
            }
        } catch (error) {
            setError("An error occurred while fetching weather data.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 space-y-4 bg-blue-50 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold text-blue-600">Weather App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={fetchWeather}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Search
            </button>
            {loading && (
                <div className="mt-4 p-4 bg-white rounded-md shadow-md text-center">
                    <Skeleton height={25} width={150} className="mb-2" />
                    <Skeleton height={25} width={200} className="mb-2" />
                    <Skeleton height={25} width={120} className="mb-2" />
                    <Skeleton circle={true} height={50} width={50} />
                </div>
            )}
            {!loading && error && <p className="text-red-500">{error}</p>}
            {!loading && weather && (
                <div className="mt-4 p-4 bg-white rounded-md shadow-md text-center">
                    <h2 className="text-xl font-bold text-blue-700">{weather.name}</h2>
                    <p className="text-gray-700">Temperature: {weather.main.temp}°C</p>
                    <p className="text-gray-700">Humidity: {weather.main.humidity}%</p>
                    <p className="text-gray-700">Condition: {weather.weather[0].description}</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt="Weather Icon"
                        className="inline-block"
                    />
                </div>
            )}
        </div>
    );
}

export default Api;
