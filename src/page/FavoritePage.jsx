import Favorite from "../components/Favorite/Favorite";
import Header from "../components/Navigation/Header";

const FavoritesPage = () => {
  return (
    <>
      <Header />
      <section className="bg-gray-100 min-h-screen pt-24 px-4 md:px-16 xl:px-32">
        <Favorite />
      </section>
    </>
  );
};

export default FavoritesPage;
