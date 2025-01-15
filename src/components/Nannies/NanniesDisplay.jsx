/* eslint-disable react/prop-types */

import NanniesCard from "./NanniesCard";
import Button from "../ui/Button";

const NanniesDisplay = ({
  nannies,
  filterNannies,
  visibleCards,
  setVisibleCards,
  userId,
}) => {
  return (
    <div>
      {filterNannies()
        .slice(0, visibleCards)
        .map((nanny) => (
          <NanniesCard nanny={nanny} key={nanny.nannyId} userId={userId} />
        ))}

      {visibleCards < nannies.length && (
        <Button
          text={"Load more"}
          onClick={() => setVisibleCards(visibleCards + 3)}
          className="mx-auto mt-16 mb-24"
        />
      )}
    </div>
  );
};

export default NanniesDisplay;
