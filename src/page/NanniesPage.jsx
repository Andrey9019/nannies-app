import { useState, useEffect } from "react";
import featchNannies from "../firebase";

const NanniesPage = () => {
  const [nannies, setNannies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const nanniesData = await featchNannies();
      // Перетворюємо об'єкт в масив
      if (nanniesData) {
        setNannies(Object.values(nanniesData));
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Nannies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nannies.map((nanny, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {nanny.name}
              </h3>
              <img
                className="w-full h-40 object-cover rounded-lg mb-4"
                src={nanny.avatar_url}
                alt={nanny.name}
              />
              <p className="text-gray-600 text-sm mb-2">{nanny.about}</p>
              <p className="text-gray-700 font-semibold">
                Price per hour: ${nanny.price_per_hour}
              </p>
              <p className="text-gray-500 text-sm">Rating: {nanny.rating}</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NanniesPage;
