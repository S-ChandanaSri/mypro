"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/page.js";
import Image from "next/image";

import { useRouter } from "next/navigation";

import Footerimages from "../Footerimages/page.js";
import Amenities from "../Amenities/page.tsx";
import { ImageList } from "@mui/material";
import Title from "../Title/page.js";
import Description from "../Description/page.js";
import Describe from "../Describe/page.js";
import Imageslist from "../Imageslist/page.js";
import Display from "../Display/page.js";
import { useListing } from "@/app/context/ListingContext.js";
import Introduction3 from "../Introduction3/page.js";
import Amount from "../Amount/page.js";
import Pay from "../Pay/page.js";

export default function Imagesstep() {
  const router = useRouter();
  //const navigate=useNavigate();
  const [currentstep, setCurrentstep] = useState(0);
  const { listingid } = useListing();

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
    if (currentstep > 0) {
      setCurrentstep((prevStep) => prevStep - 1);
    }
  };
  useEffect(() => {
    console.log("Current listingid:", listingid);
  }, [listingid]); // this will log whenever listingid changes

  const [dragId, setDragId] = useState();
  //const location = useLocation();
  //console.log("llllllllllll",listingid)
  //const { listingid } = location.state || {};
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [click, setClick] = useState("");

  const [num, setNum] = useState("");
  const [salary, setSalary] = useState(1000);
  const [addition, setAddition] = useState(0);
  useEffect(() => {
    const calculatedAddition = parseInt(salary, 10) + parseInt(num, 10);
    setAddition(calculatedAddition);
  }, [salary, num]);

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const [edit, setEdit] = useState(false);

  const decimalDigits = 0;

  const handleNext = () => {
    if (step === 0) {
      setStep((prevStep) => prevStep + 1);
      setCurrentstep((prevStep) => prevStep + 1);
    } else if (step === 1) {
      console.log("ll", listingid);

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
        window.scrollTo(0, 0);
      }, 3000);
    } else if (step === 2) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
        window.scrollTo(0, 0);
      }, 3000);
    } else if (step === 3) {
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
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep((prevStep) => prevStep + 1);
        setCurrentstep((prevStep) => prevStep + 1);
      }, 3000);
    } else if (step === 8) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentstep((prevStep) => prevStep + 1);
        router.push("/Propertylisting");
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFFFF]">
      <Navbar />
      <div className="flex-grow">
        <div className="flex items-center">
          {step === 0 && <Display />}
          {step === 1 && <Amenities listingid={listingid} />}

          {step === 2 && <Imageslist listingid={listingid} />}

          {step === 3 && <Title listingid={listingid} />}
          {step === 4 && <Description listingid={listingid} />}
          {step === 5 && <Describe listingid={listingid} />}
          {step === 6 && <Introduction3 listingid={listingid} />}
          {step === 7 && (
            <Amount
              listingid={listingid}
              salary={salary}
              setSalary={setSalary}
            />
          )}
          {step === 8 && <Pay listingid={listingid} salary={salary} />}
        </div>
      </div>
      <Footerimages
        isLoading={isLoading}
        buttonText="NEXT"
        onClick={handleNext}
        onBack={handleBack}
        step={step}
        setStep={setStep}
        currentstep={currentstep}
      />
    </div>
  );
}
