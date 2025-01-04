import { useState } from "react";
import { getAuth } from "firebase/auth";

import { useFavorites } from "../Favorite/content/FavoritesContext";
import NanniesCard from "../Nannies/NanniesCard";

const Favorite = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const { favorites, isLoading } = useFavorites();
  const [visibleCards, setVisibleCards] = useState(3);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading your favorites...
      </p>
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
export default Favorite;

// import { useState, useEffect } from "react";
// import fetchFavorites from "../../firebase";
// import { getAuth } from "firebase/auth";

// // import { useFavorites } from "../Favorite/content/FavoritesContext";
// import NanniesCard from "../Nannies/NanniesCard";

// const Favorite = () => {
//   const auth = getAuth();
//   const userId = auth.currentUser?.uid;

//   const { favorites, setFavorite } = useState([]);
//   const [visibleCards, setVisibleCards] = useState(3);

//   useEffect(() => {
//     const getData = async () => {
//       const nanniesData = await fetchFavorites();

//       if (nanniesData) {
//         const formattedNannies = Object.entries(nanniesData).map(
//           ([key, value]) => ({
//             ...value,
//             nannyId: key,
//           })
//         );
//         setFavorite(formattedNannies);
//       }
//     };

//     getData();
//   }, [setFavorite]);

//   return (
//     <div className="flex flex-col">
//       {favorites.length === 0 ? (
//         <p className="text-center text-gray-500 mt-10">
//           You have no favorite nannies yet.
//         </p>
//       ) : (
//         <div className="flex flex-col">
//           {favorites.slice(0, visibleCards).map((nanny) => (
//             <NanniesCard nanny={nanny} key={nanny.nannyId} userId={userId} />
//           ))}
//           {visibleCards < favorites.length && (
//             <button
//               onClick={() => setVisibleCards(visibleCards + 3)}
//               className="mx-auto mt-16 mb-24 bg-[#103931] text-white px-10 py-3 rounded-full"
//             >
//               Load more
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
// export default Favorite;
