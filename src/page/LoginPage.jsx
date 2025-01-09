import "react";

import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

import { GoArrowUpRight } from "react-icons/go";
import LoginForm from "../components/Auth/LoginForm";

const HomePage = () => {
  return (
    <>
      <section className="flex text-white h-[calc(100vh-4rem)] md:h-screen">
        <div className="hidden md:flex flex-col flex-1 justify-center pl-8 pr-5 xl:pl-24 xl:pr-16 bg-[--prime]">
          <h1 className="text-6xl xl:text-7xl font-medium pb-7">
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
        <div className=" flex items-center justify-center flex-1 home-bg-img">
          <LoginForm />
        </div>
      </section>
    </>
  );
};

export default HomePage;
