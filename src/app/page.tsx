"use client";
import React from "react";
import Image from "next/image";
import List from "@/components/root/Propertycard/List";
import makiarrow from "../../public/res/icons/downArrow.svg";
import Filter from "../components/root/Filter/index";
import FilterOptionFlow from "./filterOptionFlow/page";

import {
  GetInTouchInfo,
  OurServicesInfo,
  Propertcardinfo,
  WhyChooseUsInfo,
} from "@/constants/arrays";
import { strings } from "@/constants/strings";
import InfoCards from "@/components/root/InfoCards";
import Hero from "@/components/root/Hero";
import VideoTestimonials from "@/components/root/VideoTestimonials";
import FAQs from "@/components/root/FAQs";
import {
  OTPModal,
  PhoneNumberModal,
} from "@/components/popup/PhoneNumberModal";
import { useState } from "react";
import ZendenWelcomeModal from "@/components/popup/WelcomeModal";
import ImageUploadModal from "@/components/popup/ImageModal";
import { postPhoneNumber, postOTP, postImage } from "@/api";

function Home() {
  const [WelcomeModal, setWelcomeModal] = useState<boolean>(true);
  const [ImageModal, setImageModal] = useState<boolean>(false);
  const [PhoneModal, setPhoneModal] = useState<boolean>(false);
  const [OtpModal, setOtpModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const welcomeModalContinue = (): void => {
    setWelcomeModal(false);
    setPhoneModal(true);
  };
  const PhoneNumberContinue = async (phoneNumber: string) => {
    setIsLoading(true);
    try {
      await postPhoneNumber({ phoneNumber });
      setPhoneModal(false);
      setOtpModal(true);
      setError(null);
    } catch (e) {
      setError("Failed to verify phone number. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const OTPContinue = async (otp: string) => {
    setIsLoading(true);
    try {
      await postOTP({ otp });
      setOtpModal(false);
      setImageModal(true); // Open Image Upload modal
      setError(null);
    } catch (e) {
      setError("Invalid OTP. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const ImageContinue = async (image: File) => {
    setIsLoading(true);
    try {
      await postImage({ image });
      setImageModal(false);
      setError(null);
    } catch (e) {
      setError("Failed to upload image. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const WelcomeClose = () => {
    // Simply close the OTP modal
    setWelcomeModal(false);
  };
  const PhoneClose = () => {
    // Simply close the OTP modal
    setPhoneModal(false);
  };
  const OtpClose = () => {
    // Simply close the OTP modal
    setOtpModal(false);
  };
  const ImageClose = () => {
    // Simply close the OTP modal
    setImageModal(false);
  };

  const [Openn, setOpen] = useState(false);

  const handlefilter = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="space-y-32 overflow-hidden px-6 sm:px-16">
      <ZendenWelcomeModal
        open={WelcomeModal}
        handleClose={WelcomeClose}
        handleContinue={welcomeModalContinue}
      />
      <PhoneNumberModal
        open={PhoneModal}
        handleClose={PhoneClose}
        handlePhoneNumberContinue={PhoneNumberContinue}
      />
      <OTPModal
        open={OtpModal}
        handleClose={OtpClose}
        handleOTPContinue={OTPContinue}
      />
      <ImageUploadModal
        open={ImageModal}
        handleClose={ImageClose}
        handleContinue={ImageContinue}
      />
      <Hero />

      <Filter setOpen={handlefilter} />
      {Openn && <FilterOptionFlow setPopup={setOpen} />}

      <div className="-[887px] h-[950px] gap-[32px] bg-[#C1C7DC] bg-opacity-10 px-[37px] py-[3px] sm:mx-auto sm:h-auto lg:relative lg:right-[2rem] lg:h-[900px] lg:w-[1450px]">
        <div className="flex items-center justify-between sm:relative sm:left-3 sm:mx-auto sm:flex sm:items-center sm:justify-around md:flex md:justify-between">
          <div className="h-[100px ] flex-col justify-between sm:mx-auto md:mx-2">
            <p className="custo-font -[2px] h-[38px] w-[281px] text-[13px] font-normal leading-[37.8px] text-[#000000] transition-all duration-300 xxs:ml-6 xxs:text-[15px] xs:ml-9 xs:text-[16px] sm:relative sm:text-left sm:text-[16px] lg:text-[28px]">
              Our Popular Homes
            </p>
            <div className="h-[30px] w-[530px]">
              <p className="custo-font h-[30px] w-[540px] text-[12px] font-[300] leading-[29.7px] text-[#000000] transition-all duration-300 xxs:ml-6 xxs:text-[14px] xs:ml-9 xs:text-[15px] sm:relative sm:h-auto sm:text-left sm:text-[16px] lg:text-[22px]">
                Book student acomodation across popular cities
              </p>
            </div>
          </div>

          <div className="-[0.5rem] flex items-center sm:relative sm:right-[3rem] sm:mx-auto sm:flex md:mx-2">
            <p className="custo-font h-[38px] w-[134px] items-center text-[28px] font-[300] leading-[37.8px] text-black transition-all duration-300 sm:relative sm:h-auto sm:text-left sm:text-[16px] lg:text-[22px]">
              Explore All
            </p>
            <button>
              <Image
                width={31}
                height={31}
                src={makiarrow}
                alt=""
                className="relative right-0 h-[31px] w-[31px]"
              />
            </button>
          </div>
        </div>
        <div className="sm:flex sm:flex-col sm:items-center">
          <div className="grid grid-cols-1 gap-4 xxs:grid xxs:grid-cols-1 xxs:items-center xxs:justify-center sm:mx-auto sm:grid sm:h-auto sm:grid-cols-2 sm:justify-start md:mx-auto md:grid-cols-2 md:justify-between lg:mr-[1rem] lg:grid lg:h-auto lg:grid-cols-4 lg:justify-between">
            <List cards={Propertcardinfo} />
          </div>
        </div>
      </div>

      <div className="space-y-32">
        {/*<InfoCards
          title={strings.landing.ourServices.heading}
          subText={strings.landing.ourServices.subHeading}
          cards={OurServicesInfo}
        />
        <InfoCards
          title={strings.landing.whyChooseUs.heading}
          subText={strings.landing.whyChooseUs.subHeading}
          cards={WhyChooseUsInfo}
        />
        <InfoCards
          title={strings.landing.getInTouch.heading}
          subText={strings.landing.getInTouch.subHeading}
          cards={GetInTouchInfo}
        />*/}
      </div>
      {/* <VideoTestimonials /> */}
      <FAQs />
    </div>
  );
}

export default Home;
