import React from "react";
import { IoIosSearch } from "react-icons/io";

interface FilterByCityProps {
  uniqueCities: string[];
  selectedCity: string;
  setSelectedCity: (value: string) => void;
}

const FilterByCity: React.FC<FilterByCityProps> = ({
  uniqueCities,
  selectedCity,
  setSelectedCity,
}) => {
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="flex flex-col mb-8">
      <label htmlFor="city" className="mb-2 font-medium text-gray-500 text-end">
        City
      </label>
      <div className="relative">
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          className="block  text-base md:text-lg w-36 md:w-52 px-3 py-2 md:px-5 md:py-4 bg-white border rounded-2xl shadow-sm"
        >
          <option value="">All Cities</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <IoIosSearch className="absolute top-2.5 md:top-5 right-3 text-xl text-gray-500" />
      </div>
    </div>
  );
};

export default FilterByCity;
