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

  return (
    <div className="flex flex-col">
      {nannies.slice(0, visibleCards).map((nanny) => (
        <NanniesCard nanny={nanny} key={nanny.nannyId} userId={userId} />
      ))}
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
