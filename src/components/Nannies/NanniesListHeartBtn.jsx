/* eslint-disable react/prop-types */
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useFavorites } from "../Favorite/content/FavoritesContext";

const NanniesListHeartBtn = ({ nanny, nannyId, userId }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.nannyId === nannyId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(nannyId, userId);
    } else {
      addToFavorites(userId, { ...nanny, nannyId });
    }
  };

  return (
    <button onClick={handleToggleFavorite}>
      {isFavorite ? (
        <IoHeartSharp className="text-2xl ml-12 text-red-500" />
      ) : (
        <IoHeartOutline className="text-2xl ml-12" />
      )}
    </button>
  );
};

export default NanniesListHeartBtn;
