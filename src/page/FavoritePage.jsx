import Favorite from "../components/Favorite/Favorite";

const FavoritesPage = () => {
  return (
    <section className="bg-gray-100 min-h-screen pt-24 px-4 md:px-16 xl:px-32">
      {/* filter */}
      <Favorite />
    </section>
  );
};

export default FavoritesPage;
