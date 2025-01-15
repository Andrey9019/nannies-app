import { useState, useEffect } from "react";
import featchNannies from "../../firebase";
import { getAuth } from "firebase/auth";

import NanniesDisplay from "./NanniesDisplay";
import FilterByAttributes from "../Filter/FilterByAttributes";
import FilterByCity from "../Filter/FilterByCity";

const NanniesList = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [nannies, setNannies] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("default");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const nanniesData = await featchNannies();

      if (nanniesData) {
        const formattedNannies = Object.entries(nanniesData).map(
          ([key, value]) => ({
            ...value,
            nannyId: key,
          })
        );
        setNannies(formattedNannies);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  // функція для виділення тільки міста
  const extractCity = (location) => {
    return location.split(",")[0].trim(); // Беремо все до коми
  };

  // унікальні міста для випадаючого списку
  const uniqueCities = [
    ...new Set(nannies.map((nanny) => extractCity(nanny.location))),
  ];

  // логіка фільтрації
  const filterNannies = () => {
    let filteredNannies = nannies;

    if (selectedCity) {
      filteredNannies = filteredNannies.filter(
        (nanny) => extractCity(nanny.location) === selectedCity
      );
    }

    switch (filter) {
      case "prise-asc":
        return filteredNannies
          .slice()
          .sort((a, b) => a.price_per_hour - b.price_per_hour);
      case "prise-desc":
        return filteredNannies
          .slice()
          .sort((a, b) => b.price_per_hour - a.price_per_hour);
      case "rating-asc":
        return filteredNannies.slice().sort((a, b) => b.rating - a.rating);
      default:
        return filteredNannies;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-center text-gray-500 mt-10 mb-5">
          Loading nannies ...
        </p>
        <span className="text-center loader"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <FilterByAttributes filter={filter} setFilter={setFilter} />
        <FilterByCity
          uniqueCities={uniqueCities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
      <NanniesDisplay
        nannies={nannies}
        filterNannies={filterNannies}
        visibleCards={visibleCards}
        setVisibleCards={setVisibleCards}
        userId={userId}
      />
    </div>
  );
};

export default NanniesList;
