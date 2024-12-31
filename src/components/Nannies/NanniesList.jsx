import { useState, useEffect } from "react";
import featchNannies from "../../firebase";

import NanniesCard from "./NanniesCard";

const NanniesList = () => {
  const [nannies, setNannies] = useState([]);
  console.log(nannies);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const getData = async () => {
      const nanniesData = await featchNannies();
      if (nanniesData) {
        setNannies(Object.values(nanniesData));
      }
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col">
      {nannies.slice(0, visibleCards).map((nanny, index) => (
        <NanniesCard nanny={nanny} key={index} />
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
