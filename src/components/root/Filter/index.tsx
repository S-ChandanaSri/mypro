import Image from "next/image";
import React from "react";
import image6 from "../../../../public/res/images/filters/image6.png";
import image7 from "../../../../public/res/images/filters/image7.png";
import image2 from "../../../../public/res/images/filters/image2.png";
import image3 from "../../../../public/res/images/filters/image3.png";
import image5 from "../../../../public/res/images/filters/image5.png";
import image4 from "../../../../public/res/images/filters/image4.png";
import Frame39907 from "../../../../public/res/images/filters/Frame39907.png";
import Frame39908 from "../../../../public/res/images/filters/Frame39908.png";
import Link from "next/link";

const Filter: React.FC<{ setOpen: () => void }> = ({ setOpen }) => {
  const cities = [
    { src: image6, name: "Bombay" },
    { src: image7, name: "Pune" },
    { src: image6, name: "Bombay" },
    { src: image5, name: "Kolkata" },
    { src: image4, name: "Bombay" },
    { src: image3, name: "Bombay" },
    { src: image2, name: "Bombay" },
  ];

  return (
    <div className="flex items-center gap-[105px] border-[1px] border-[#0000004D] bg-[#FFFFFF] px-[47px] py-[15px] sm:gap-2 lg:gap-10">
      <div className="w-fill h-fill h-[127px] w-[1066.33px] gap-[82px]">
        <div className="flex h-[126.82px] w-[1066.89px] gap-[77px] sm:mx-auto sm:w-[400px] md:relative md:right-5 md:mx-auto md:flex md:w-[500px] md:justify-between lg:mx-auto lg:w-auto">
          {cities.map((city, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${index >= 3 && index < 4 ? "hidden md:flex lg:hidden" : ""} ${index >= 4 ? "hidden lg:flex" : ""}`}
            >
              <Image src={city.src} width={86} height={86} alt={city.name} />
              <p className="text-[20px] font-medium text-black">{city.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[36px] w-[36px] sm:mx-auto sm:hidden md:hidden lg:relative lg:left-[3rem] lg:block">
        <button className="h-[36px] w-[36px] border-[1.04px] border-[#000000]">
          <Image width={36} height={36} src={Frame39907} alt="" />
        </button>
      </div>
      <Link
        href="#"
        onClick={setOpen}
        className="h-[50.16px] sm:relative sm:left-[3rem] sm:hidden md:hidden lg:relative lg:right-4 lg:block lg:w-auto"
      >
        <button className="border-mixed h-[50.16px] w-[101.67px] border-[#000000]">
          <Image width={80} height={40} src={Frame39908} alt="" />
        </button>
      </Link>
    </div>
  );
};

export default Filter;
