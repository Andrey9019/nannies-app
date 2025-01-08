import NanniesList from "../components/Nannies/NanniesList";

const NanniesPage = () => {
  return (
    <section className="bg-gray-100 min-h-screen pt-24 px-4 md:px-16 xl:px-32">
      {/* filter */}
      <NanniesList />
    </section>
  );
};

export default NanniesPage;
