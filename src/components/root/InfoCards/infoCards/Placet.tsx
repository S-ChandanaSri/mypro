import React from "react";
import { CardInfo1 } from "@/constants/types";
import Image from "next/image";

interface InfoCardsProps {
  title: string;
  cards: CardInfo1[];
  handletype: (option: CardInfo1) => void;
  option: string | null;
}

const Placetype: React.FC<InfoCardsProps> = ({
  title,
  handletype,
  cards,
  option,
}) => {
  return (
    <>
      <div className="relative mx-auto flex h-[670px] flex-col items-center">
        <div className="relative top-[65px] h-[106px] w-[640px] gap-[46px]">
          <p className="custo-font h-[53px] w-[640px] text-center text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]">
            {title}
          </p>
        </div>
        <div className="flex flex-col items-center gap-[2rem]">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => handletype(card)}
              className={`... relative left-[7px] top-[44px] h-[135px] w-[666px] gap-[10px] rounded-[15px] border-[2px] border-[#000000] px-[22px] py-[20px] ${option === card.label ? "border-4 border-blue-500" : "border-[#8E98A8]"}`}
            >
              <div className="flex h-[74px] w-[620px] items-center gap-[161px] pt-5">
                <div className="h-[74px] w-[401px] gap-[9px]">
                  <p className="custo-font h-[38px] w-[401px] text-left text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]">
                    {card.label}
                  </p>
                  <p className="custo-font h-[27px] w-[401px] text-left text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]">
                    {card.sublabel}
                  </p>
                </div>
                <Image
                  width={58}
                  height={58}
                  src={card.icon}
                  className="h-[58px] w-[58px]"
                  alt={card.label}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default Placetype;
