import "react";

import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

import { FaCheck } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import Header from "../components/Navigation/Header";

const HomePage = () => {
  return (
    <>
      <Header />
      <section className="flex flex-col md:flex-row text-white h-[calc(100vh-4rem)] md:h-screen">
        <div className="flex flex-col flex-1 justify-center px-5 md:pl-7 bg-[--prime] xl:pl-24 xl:pr-16">
          <h1 className="text-4xl font-medium pb-3 md:pb-7 md:text-5xl xl:text-7xl">
            Make Life Easier for the Family:
          </h1>
          <p className="text-xl pb-8 md:pb-16 md:text-2xl">
            Find Babysitters Online for All Occasions
          </p>
          <Link to="/nannies" className="w-max">
            <Button
              text="Get Started"
              border="true"
              icon={<GoArrowUpRight />}
            />
          </Link>
        </div>
        <div className=" relative flex-1 home-bg-img ">
          <div className="absolute flex justify-center items-center bg-white h-16 w-48 bottom-12 right-12 rounded-2xl md:h-24 md:w-64">
            <div className="flex w-9 h-9 mr-4 justify-center items-center rounded-xl bg-[--prime] md:w-12 md:h-12">
              <FaCheck />
            </div>
            <div>
              <p className="text-xs mb-[6px] text-gray-500 md:text-base">
                Experienced nannies
              </p>
              <p className="text-lg font-bold text-black md:text-2xl">15,000</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
