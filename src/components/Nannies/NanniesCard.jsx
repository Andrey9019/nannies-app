/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import NanniesListHeartBtn from "./NanniesListHeartBtn";
import NanniesListComment from "./NanniesListComment";
import Swal from "sweetalert2"; // Якщо використовуєте SweetAlert2

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
  const handleFavoriteClick = () => {
    if (!userId) {
      // Якщо користувач не авторизований
      Swal.fire({
        icon: "warning",
        title: "You are not logged in!",
        text: "Please log in to add to favorites.",
      });
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl lg:rounded-3xl p-3 md:p-6 mb-8"
      key={index}
    >
      <div className="flex flex-col flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex mb-4">
            <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] p-2 rounded-[20px] md:p-3 md:rounded-[30px] outline outline-2 outline-pink-200 mr-6 flex-shrink-0">
              <img
                className="rounded-[15px] object-cover"
                src={nanny.avatar_url}
                alt={nanny.name}
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">Nanny</p>
              <p className="text-xl md:text-2xl font-medium">{nanny.name}</p>
            </div>
          </div>

          <div className="flex flex-wrap xl:flex-nowrap ml-2 mb-auto justify-between items-center gap-2">
            <p className="flex items-center ">
              <IoLocationOutline className="mr-2" />
              {nanny.location}
            </p>
            <p>
              Price / 1 hour:{" "}
              <span className="text-green-500 font-medium">
                {nanny.price_per_hour}$
              </span>
            </p>
            <p className="flex items-center">
              <FaStar className="mr-1 text-yellow-500" />
              Rating: {nanny.rating}
            </p>
            <NanniesListHeartBtn
              nanny={nanny}
              nannyId={nanny.nannyId}
              userId={userId}
              onClick={handleFavoriteClick}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6 ">
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
