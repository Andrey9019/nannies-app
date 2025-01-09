import { useState } from "react";
import { getAuth } from "firebase/auth";

import { useFavorites } from "../Favorite/content/FavoritesContext";
import NanniesCard from "../Nannies/NanniesCard";
import Button from "../ui/Button";

const Favorite = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const { favorites, isLoading } = useFavorites();
  const [visibleCards, setVisibleCards] = useState(3);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-center text-gray-500 mt-10 mb-5">
          Loading your favorites...
        </p>
        <span className="text-center loader"></span>
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        You have no favorite nannies yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {favorites.slice(0, visibleCards).map((nanny) => (
        <NanniesCard nanny={nanny} key={nanny.nannyId} userId={userId} />
      ))}
      {visibleCards < favorites.length && (
        <Button
          text={"Load more"}
          onClick={() => setVisibleCards(visibleCards + 3)}
          className="mx-auto mt-16 mb-24 "
        ></Button>
      )}
    </div>
  );
};
export default Favorite;
