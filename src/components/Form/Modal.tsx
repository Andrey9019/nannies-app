import { useEffect, useState } from "react";
import AppointmentForm from "./AppointmentForm";

import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  nanny: {
    avatar_url: string;
    name: string;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, nanny }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white rounded-3xl shadow-lg w-full max-w-[600px] max-h-screen overflow-y-auto p-3 md:p-8 m-3 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl md:text-3xl 2xl:text-4xl font-medium mb-2 md:mb-4 2xl:mb-5 w-3/4">
          Make an appointment with a babysitter
        </h2>
        <p className="text-sm md:text-base text-gray-400 mb-5 md:mb-7 2xl:mb-10">
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>
        <div className="flex mb-5 2xl:mb-10">
          <div className="mr-3">
            <img
              className="w-11 h-11 rounded-full object-cover"
              src={nanny.avatar_url}
              alt={nanny.name}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-400 mb-1">Your nanny</p>
            <p className="font-medium">{nanny.name}</p>
          </div>
        </div>
        <button
          className="absolute top-5 right-5 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <IoMdClose className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <AppointmentForm />
      </div>
    </div>
  );
};

export default Modal;
