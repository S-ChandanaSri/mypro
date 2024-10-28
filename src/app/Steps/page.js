"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";

//import { useNavigate } from 'react-router-dom';
import Image from "next/image";

import Footer from "../Footer/page.js";
import d from "../../../public/res/images/components/d.png";
//import Select from 'react-select';
import countryList from "react-select-country-list";
import Amenities1 from "../Amenities1/page.js";
import Amenities2 from "../Amenities2/page.js";
import Place from "../Place/page.js";
import Placetype from "../Placetype/page.js";
import Location from "../Location/page.js";
import Address from "../Address/page.js";
import Peopletype from "../Peopletype/page.js";
import Display from "../Display/page.js";
import Navbar from "../Navbar/page.js";
import Options from "../Options/page.js";
import { useRouter } from "next/navigation";
import { useListing } from "@/app/context/ListingContext";
import { v4 as uuidv4 } from "uuid";
export default function Steps() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  //const navigate = useNavigate();
  const iframeRef = useRef(null);

  const [countguests, setCountguests] = useState(0);
  const [countBedrooms, setCountBedrooms] = useState(0);
  const [countBeds, setCountBeds] = useState(0);
  const [privateroom, setPrivate] = useState(0);
  const [privateroom1, setPrivate1] = useState(0);
  const [privateroom2, setPrivate2] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const { listingid, setListingid } = useListing();
  const [address, setAddress] = useState({
    road: "",
    city: "",
    country: "",
    zipcode: "",
    street: "",
    state: "",
    country_code: "",
    village: "",
    mandal: "",
    district: "",
  });
  const [error, setError] = useState(null);
  const [loadingg, setLoadingg] = useState(true);

  const [valuee, setValue] = useState(null);
  const options = useMemo(() => countryList().getData(), []);

  const [placetype, setPlacetype] = useState(null);
  const [peopletype, setPeopletype] = useState(null);
  const [isClicked, setIsClicked] = useState(null);
  const [currentstep, setCurrentstep] = useState(0);

  useEffect(() => {
    const id = uuidv4(); // Generate UUID
    setListingid(id); // Update context
  }, [setListingid]);

  const handleClick = (button) => {
    setIsClicked(button);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
    if (currentstep > 0) {
      setCurrentstep((prevStep) => prevStep - 1);
    }
  };

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const url = iframe.getAttribute("src");
      console.log("i got it", url);

      const params = new URLSearchParams(new URL(url).search);
      const embedParams = params.get("pb");

      const latitudeMatch = embedParams.match(/!3d(-?\d+\.\d+)/);
      const longitudeMatch = embedParams.match(/!2d(-?\d+\.\d+)/);

      const latitude = latitudeMatch ? latitudeMatch[1] : "Not found";
      const longitude = longitudeMatch ? longitudeMatch[1] : "Not found";

      console.log(`Latitude: ${latitude}`);
      console.log(`Longitude: ${longitude}`);
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log("yeeee", data);
            const country = data.address.country || "";
            const countryCode = data.address.country_code || "";

            console.log("Fetched country:", country);
            console.log("Fetched countryCode:", countryCode);

            const selectedOption = options.find(
              (option) =>
                option.value.toUpperCase() === countryCode.toUpperCase(),
            );

            console.log("options:", options);
            console.log("Selected Option:", selectedOption);

            setAddress({
              road: data.address.road || data.address.street || "",
              city:
                data.address.city ||
                data.address.town ||
                data.address.city_district ||
                "",
              country: country,
              zipcode: data.address.zipcode || data.address.postcode || "",
              street: data.address.street || data.address.colony || "",
              state: data.address.state || "",
              country_code: countryCode,
              district: data.address.state_district || "",
              mandal: data.address.county || "",
              village: data.address.suburb || "",
            });

            setValue(selectedOption || null);
            setLoadingg(false);
          })
          .catch((err) => {
            console.error("Error fetching address:", err);
            setError("Unable to fetch address.");
            setLoadingg(false);
          });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Unable to get location.");
        setLoadingg(false);
      },
    );
  }, [options]);

  if (loadingg) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleNext = () => {
    if (step === 0) {
      setStep((prevStep) => prevStep + 1);
      setCurrentstep((prevStep) => prevStep + 1);
    } else if (step === 1) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 2) {
      if (selectedOption) {
        console.log("sssssssssssssss:", selectedOption);
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 3) {
      if (placetype) {
        console.log("firstoption", placetype);
      }

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 4) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 5) {
      if (placetype) {
        console.log("firstoption", placetype);
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 6) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 7) {
      console.log("Listing ID before fetch:", listingid);

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 8) {
      if (peopletype) {
        console.log("firstoption", peopletype);
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.push("/Imagesstep");
      }, 3000);
    }
  };

  const optons = [
    "House",
    "Apartment",
    "Villa",
    "Duplex",
    "Penthouse",
    "Farmhouse",
    "Bungalow",
    "Flats",
    "Studiohouse",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFFFF]">
      <div className="flex-grow">
        <div className="flex min-h-screen items-center">
          {step === 0 && <Options />}
          {step === 1 && (
            <>
              <div className="flex h-[555px]">
                <div className="relative left-[148px] top-[1px] h-[114px] w-[509px] gap-[46px]">
                  <div className="flex h-[114px] w-[448px] flex-col items-center pl-11 pt-7 text-left">
                    <p className="custo-font relative left-[133px] top-[224px] h-[60px] w-[573px] text-[40px] font-[400] leading-[60px] tracking-[0.46px] text-[#000000]">
                      1. Tell us about your place
                    </p>
                    <p className="custo-font relative left-[83px] top-[224px] h-[54px] w-[394px] text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]">
                      Share some basic info, like where it is and how many
                      guests can stay
                    </p>
                  </div>
                  <Image
                    width={571.17}
                    height={700}
                    alt=""
                    src={d}
                    className="relative left-[672px] top-[-106px] h-[571.17px] w-[700px]"
                  />
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <Place
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setIsLoading={setIsLoading}
              setListingid={setListingid}
            />
          )}
          {step === 3 && <Placetype listingid={listingid} />}

          {step === 4 && <Location listingid={listingid} />}

          {step === 5 && <Address listingid={listingid} />}

          {step === 6 && <Amenities1 listingid={listingid} />}

          {step === 7 && (
            <>
              <div className="relative left-[390px] top-[50px] flex h-[670px] flex-col items-center">
                <div className="h-[914px] w-[1066px] rounded-[15px] border-[black]">
                  <p className="custo-font relative top-[30px] h-[53px] w-[392px] text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]">
                    {" "}
                    Let’s start with basics{" "}
                  </p>
                  <p className="custo-font relative top-[70px] h-[27px] w-[392px] text-[18px] font-[500] leading-[27px] tracking-[0.46px] text-[#000000]">
                    {" "}
                    What kind of bathrooms do guest have ?{" "}
                  </p>
                  <div className="relative top-[40px]">
                    <Amenities2
                      handleplus={() => setPrivate(privateroom + 1)}
                      handleminus={() => setPrivate(privateroom - 1)}
                      label1="Private and attached"
                      label2="Its connected to the guest room and just for them"
                      count={privateroom}
                    />
                    <div className="relative left-[2px] top-[127px] w-[667px] border-[1px] border-[#8E98A8]"></div>

                    <div className="relative top-[45px]">
                      <Amenities2
                        handleplus={() => setPrivate1(privateroom1 + 1)}
                        handleminus={() => setPrivate1(privateroom1 - 1)}
                        label1="Dedicated"
                        label2="Its private but accessed via space like a halway"
                        count={privateroom1}
                      />
                    </div>

                    <div className="relative left-[2px] top-[173px] w-[667px] border-[1px] border-[#8E98A8]"></div>

                    <div className="relative top-[85px]">
                      <Amenities2
                        handleplus={() => setPrivate2(privateroom2 + 1)}
                        handleminus={() => setPrivate2(privateroom2 - 1)}
                        label1="Shared"
                        label2="Its shared with other people"
                        count={privateroom2}
                      />
                    </div>

                    <div className="relative left-[2px] top-[210px] w-[667px] border-[1px] border-[#8E98A8]"></div>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 8 && <Peopletype listingid={listingid} />}
        </div>
        <Footer
          isLoading={isLoading}
          buttonText="NEXT"
          onClick={handleNext}
          onBack={handleBack}
          step={step}
          setStep={setStep}
          currentstep={currentstep}
        />
      </div>
    </div>
  );
}
