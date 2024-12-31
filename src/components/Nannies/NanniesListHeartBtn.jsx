/* eslint-disable react/prop-types */
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useFavorites } from "../Favorite/content/FavoritesContext";

const NanniesListHeartBtn = ({ nanny, nannyId }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.nannyId === nannyId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(nannyId);
    } else {
      addToFavorites({ ...nanny, nannyId });
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
