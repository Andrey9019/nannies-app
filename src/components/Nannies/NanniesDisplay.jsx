/* eslint-disable react/prop-types */

import NanniesCard from "./NanniesCard";
import Button from "../ui/Button";

const NanniesDisplay = ({
  filterNannies,
  visibleCards,
  setVisibleCards,
  userId,
}) => {
  const filteredNannies = filterNannies();

  return (
    <div>
      {filteredNannies.slice(0, visibleCards).map((nanny) => (
        <NanniesCard nanny={nanny} key={nanny.nannyId} userId={userId} />
      ))}

      {visibleCards < filteredNannies.length && (
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
