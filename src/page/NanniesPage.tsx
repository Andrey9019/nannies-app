import Nannies from "../components/Nannies/Nannies";
import Header from "../components/Navigation/Header";

const NanniesPage: React.FC = () => {
  return (
    <>
      <Header />
      <section className="bg-gray-100 min-h-screen pt-6 md:pt-12 xl:pt-24 px-4 md:px-16 xl:px-32">
        <Nannies />
      </section>
    </>
  );
};

export default NanniesPage;
