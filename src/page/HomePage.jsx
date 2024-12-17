import "react";

import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

import { FaCheck } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

const HomePage = () => {
  return (
    <>
      <section className="flex text-white h-screen">
        <div className="flex flex-col flex-1 justify-center pl-24 pr-16 bg-[#103931]">
          <h1 className="text-7xl font-medium pb-7">
            Make Life Easier for the Family:
          </h1>
          <p className="text-2xl pb-16">
            Find Babysitters Online for All Occasions
          </p>
          <Link to="/nannies">
            <Button
              text="Get Started"
              border="true"
              icon={<GoArrowUpRight />}
            />
          </Link>
        </div>
        <div className="relative flex-1 flex home-bg-img">
          <div className="absolute flex justify-center items-center bg-white h-24 w-64 bottom-12 right-12 rounded-2xl">
            <div className="flex w-12 h-12 mr-4 justify-center items-center rounded-xl bg-[#103931]">
              <FaCheck />
            </div>
            <div>
              <p className="text-base mb-[6px] text-gray-500">
                Experienced nannies
              </p>
              <p className="text-2xl font-bold text-black">15,000</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
