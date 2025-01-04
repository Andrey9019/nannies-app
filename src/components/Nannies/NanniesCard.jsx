/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import NanniesListHeartBtn from "./NanniesListHeartBtn";
import NanniesListComment from "./NanniesListComment";

const calcBirthday = (birthday) => {
  const currentDate = new Date();
  const birthDate = new Date(birthday);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const NanniesCard = ({ nanny, index, userId }) => {
  return (
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

          <div className="flex items-center space-x-5">
            <p className="flex items-center ">
              <IoLocationOutline className="mr-2" />
              {nanny.location}
            </p>
            <p className="flex items-center ">
              <FaStar className="mr-1 text-yellow-500" />
              Rating: {nanny.rating}
            </p>
            <p className="">
              Price / 1 hour:{" "}
              <span className="text-green-500 font-medium">
                {nanny.price_per_hour}$
              </span>
            </p>
            <NanniesListHeartBtn
              nanny={nanny}
              nannyId={nanny.nannyId}
              userId={userId}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <p className="bg-gray-100 text-gray-600 rounded-full px-4 py-2">
            Age:{" "}
            <span className="text-black underline">
              {calcBirthday(nanny.birthday)}
            </span>
          </p>
          <p className="bg-gray-100 text-gray-600 rounded-full px-4 py-2">
            Experience: <span className="text-black">{nanny.experience}</span>
          </p>
          <p className="bg-gray-100 text-gray-600 rounded-full px-4 py-2">
            Kids Age: <span className="text-black">{nanny.kids_age}</span>
          </p>
          <p className="bg-gray-100 text-gray-600 rounded-full px-4 py-2">
            Education: <span className="text-black">{nanny.education}</span>
          </p>
        </div>

        <p className="text-gray-500 mb-3">{nanny.about}</p>
        <NanniesListComment nanny={nanny} />
      </div>
    </div>
  );
};

export default NanniesCard;
