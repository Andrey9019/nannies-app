/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import Modal from "../Form/Modal";
import Button from "../ui/Button";

const NanniesListComment = ({ nanny, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };
  return (
    <>
      <button
        className="font-medium underline text-start mr-auto"
        onClick={() => toggleExpand(index)}
      >
        {expandedCardIndex === index ? "Show less" : "Read more"}
      </button>

      {expandedCardIndex === index && (
        <div className="mt-6">
          {nanny.reviews.map((review, reviewIndex) => (
            <div key={reviewIndex} className="flex items-start space-x-4 mb-4">
              <div className="w-16 h-10 md:w-12 md:h-12 text-sm md:text-base rounded-full bg-gray-300 flex items-center justify-center">
                {review.reviewer.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{review.reviewer}</p>
                <p className="flex items-center text-gray-600 text-sm">
                  <FaStar className="mr-1 text-yellow-500" />
                  {review.rating.toFixed(1)}
                </p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
          <div>
            <Button
              text={"Make an Appointment"}
              className="text-sm md:text-base"
              onClick={handleOpenModal}
            ></Button>

            <Modal
              nanny={nanny}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default NanniesListComment;
