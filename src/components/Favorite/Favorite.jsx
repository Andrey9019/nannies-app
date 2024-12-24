import { useFavorites } from "../Favorite/content/FavoritesContext";

const Favorite = () => {
  const { favorites } = useFavorites();

  return (
    <div className="flex flex-col">
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You have no favorite nannies yet.
        </p>
      ) : (
        favorites.map((nanny, index) => (
          <div
            className="flex flex-row bg-white shadow-lg rounded-3xl p-6 mb-8"
            key={index}
          >
            <div className="w-[120px] h-[120px] p-3 rounded-[30px] outline outline-2 outline-pink-200 mr-6 flex-shrink-0">
              <img
                className="rounded-[15px] object-cover"
                src={nanny.avatar_url}
                alt={nanny.name}
              />
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-400">Nanny</p>
                  <p className="text-2xl font-medium">{nanny.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default Favorite;
