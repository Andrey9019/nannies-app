import { useState, useEffect } from "react";
import featchNannies from "../../firebase";
import { getAuth } from "firebase/auth";

import NanniesCard from "./NanniesCard";

const NanniesList = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [nannies, setNannies] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const getData = async () => {
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
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col">
      {nannies.slice(0, visibleCards).map((nanny) => (
        <NanniesCard nanny={nanny} key={nanny.nannyId} userId={userId} />
      ))}
      {visibleCards < nannies.length && (
        <button
          onClick={() => setVisibleCards(visibleCards + 3)}
          className="mx-auto mt-16 mb-24 bg-[#103931] text-white px-10 py-3 rounded-full"
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default NanniesList;
