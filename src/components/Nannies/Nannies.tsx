import { useState, useEffect } from "react";
import featchNannies from "../../firebase";
import { getAuth } from "firebase/auth";

import NanniesDisplay from "./NanniesDisplay";
import FilterByAttributes from "../Filter/FilterByAttributes";
import FilterByCity from "../Filter/FilterByCity";
import { Nanny } from "../types/interfaces";

const Nannies: React.FC = () => {
  const auth = getAuth();

  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("default");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const nanniesData = await featchNannies();

      if (nanniesData) {
        const formattedNannies: Nanny[] = Object.entries(nanniesData).map(
          ([key, value]: [string, any]) => ({
            ...(value as Nanny),
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
  const extractCity = (location: string) => {
    return location.split(",")[0].trim(); // Беремо все до коми
  };

  // унікальні міста для випадаючого списку
  const uniqueCities = [
    ...new Set(nannies.map((nanny) => extractCity(nanny.location))),
  ];

  // логіка фільтрації
  const filterNannies = (): Nanny[] => {
    let filteredNannies = nannies;

    if (selectedCity) {
      filteredNannies = filteredNannies.filter(
        (nanny) => extractCity(nanny.location) === selectedCity
      );
    }

    switch (filter) {
      case "price-asc":
        return filteredNannies
          .slice()
          .sort((a, b) => a.price_per_hour - b.price_per_hour);
      case "price-desc":
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
        userId={auth.currentUser ? auth.currentUser.uid : ""}
      />
    </div>
  );
};

export default Nannies;
