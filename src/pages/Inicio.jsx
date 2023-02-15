import { Button, SparkLine } from "components";
import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { earningData, SparklineAreaData } from "../data/dummy";

const Inicio = () => {
  const { currentColor } = useStateContext();
  return (
    <div className="mt-5">
      <div className="flex flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-50 rounded-xl w-full p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Ganancias</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4">
              <BsCurrencyDollar />
            </button>
          </div>
          <div className="mt-6">
            <Button color="white" bgColor={currentColor} text="Download" borderRadius="10px" />
          </div>
        </div>

        <div className=" rounded-2xl md:w-400 p-4 m-3 h-50" style={{ backgroundColor: currentColor }}>
          <div className="flex justify-between items-center ">
            <p className="font-semibold text-white text-2xl">Motores con TBO</p>

            <div>
              <p className="text-2xl text-white font-semibold mt-8">36</p>
              <p className="text-gray-200">A futuro</p>
            </div>
          </div>

          <div className="mt-4">
            <SparkLine
              currentColor={currentColor}
              id="column-sparkLine"
              height="100px"
              type="Column"
              data={SparklineAreaData}
              width="320"
              color="rgb(242, 252, 253)"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-5 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg w-72  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl">
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>{item.percentage}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
