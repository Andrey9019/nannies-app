import { useState, useEffect } from "react";
import featchNannies from "../../firebase";
import { getAuth } from "firebase/auth";

import NanniesCard from "./NanniesCard";
import Button from "../ui/Button";

const NanniesList = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [nannies, setNannies] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("default");

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

  const filterNannies = () => {
    switch (filter) {
      case "prise-asc":
        return nannies
          .slice()
          .sort((a, b) => a.price_per_hour - b.price_per_hour);
      case "prise-desc":
        return nannies
          .slice()
          .sort((a, b) => b.price_per_hour - a.price_per_hour);
      case "rating-asc":
        return nannies.slice().sort((a, b) => b.rating - a.rating);
      default:
        return nannies;
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-8">
        <label htmlFor="filter" className="mb-2 font-medium text-gray-500">
          Filters
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="block text-lg w-52 px-5 py-4  text-white bg-[--prime] border rounded-2xl shadow-sm "
        >
          <option value="rating-asc">Popular</option>
          <option value="prise-desc">Higher Price</option>
          <option value="prise-asc">Lower Price</option>
          <option value="default">Default</option>
        </select>
      </div>
      {filterNannies()
        .slice(0, visibleCards)
        .map((nanny) => (
          <NanniesCard nanny={nanny} key={nanny.nannyId} userId={userId} />
        ))}
      {/* {nannies.slice(0, visibleCards).map((nanny) => (
          <NanniesCard nanny={nanny} key={nanny.nannyId} userId={userId} />
      ))} */}
      {visibleCards < nannies.length && (
        <Button
          text={"Load more"}
          onClick={() => setVisibleCards(visibleCards + 3)}
          className="mx-auto mt-16 mb-24 "
        ></Button>
      )}
    </div>
  );
};

export default NanniesList;
