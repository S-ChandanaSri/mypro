"use client";
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../Navbar/page.js";
import Footer from "../Footer/page.js";
import Slider from "../Slider/page.js";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Edit() {
  const searchParams = useSearchParams();
  const [image, setImage] = useState("default-image-url");
  const [index, setIndex] = useState("0");

  useEffect(() => {
    const imageParam = searchParams.get("image");
    const indexParam = searchParams.get("index");

    if (imageParam) {
      setImage(decodeURIComponent(imageParam));
    }
    if (indexParam) {
      setIndex(decodeURIComponent(indexParam));
    }
  }, [searchParams]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);
  const [blur, setBlur] = useState(0);

  const [details, setDetails] = useState(false);
  const [edit, setEdit] = useState(true);

  const getImageStyle = useMemo(() => {
    return {
      filter: `
                brightness(${brightness}%)
                contrast(${contrast}%)
                hue-rotate(${hueRotate}deg)
                blur(${blur}px)
                `,
    };
  }, [brightness, contrast, hueRotate, blur]);

  const handleBrightnessChange = ({ target }) => setBrightness(target.value);
  const handleContrastChange = ({ target }) => setContrast(target.value);
  const handleHueRotateChange = ({ target }) => setHueRotate(target.value);
  const handleBlurChange = ({ target }) => setBlur(target.value);

  const handleDetails = () => {
    setEdit(false);
    setDetails(!details);
  };

  const handleEdit = () => {
    setDetails(false);
    setEdit(!edit);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex h-[855px] flex-col">
        <Navbar />
        <div className="relative h-[855px]">
          <div className="relative left-[750px] top-[29px] h-[29.5px] w-[744px]">
            <p className="custo-font h-[36px] w-[136px] text-[24px] font-[500] leading-[36px] tracking-[0.46px] text-[#000000]">
              Edit photo
            </p>
          </div>
          <div className="relative top-[50px] w-[1519px] border-[1px] border-[#8E98A8]"></div>
          <div>
            {image && (
              <Image
                src={image}
                alt={`Image ${index}`}
                className="relative left-[130px] top-[160px] h-[549px] w-[682px] rounded-[10px]"
                style={getImageStyle}
              />
            )}
          </div>
          <div>
            <div className="relative bottom-[390px] left-[1100px] h-[36px] w-[159px]">
              <div className="h-[30px] w-[150px]">
                <button
                  className="custo-font relative right-[90px] h-[30px] w-[71px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]"
                  onClick={handleDetails}
                >
                  Details
                </button>
                <button
                  className="custo-font h-[30px] w-[38px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            </div>
            {details && (
              <>
                <div className="relative bottom-[350px] left-[970px] h-[73px] w-[397px]">
                  <p className="custo-font h-[30px] w-[397px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]">
                    Caption
                  </p>
                  <p className="custo-font h-[36px] w-[397px] pt-2 text-[12px] font-[300] leading-[18px] tracking-[0.46px] text-[#000000]">
                    Mention what is special about the space like special
                    furniture and couch etc
                  </p>
                </div>
                <textarea className="relative bottom-[330px] left-[970px] h-[150px] w-[393px] rounded-[4px] border-[0.5px] border-[#000000] px-[10px] py-[11px]"></textarea>
              </>
            )}
            {edit && (
              <>
                <div className="relative bottom-[300px] left-[980px] h-[300px] w-[500px]">
                  <div className="mb-6 flex h-[63.43px] w-[332px] flex-col justify-evenly">
                    <p className="custo-font h-[27px] w-[332px] text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]">
                      Brightness
                    </p>
                    <Slider
                      className="relative bottom-8 w-[332px]"
                      min={0}
                      max={200}
                      value={brightness}
                      handleChange={handleBrightnessChange}
                    />
                  </div>
                  <div className="mb-6 flex h-[63.43px] w-[332px] flex-col justify-evenly">
                    <p className="custo-font h-[30px] w-[397px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]">
                      Contrast
                    </p>
                    <Slider
                      min={0}
                      max={200}
                      value={contrast}
                      handleChange={handleContrastChange}
                    />
                  </div>
                  <div className="mb-6 flex h-[63.43px] w-[332px] flex-col justify-evenly">
                    <p className="custo-font h-[30px] w-[397px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]">
                      Hue Rotate
                    </p>
                    <Slider
                      min={0}
                      max={360}
                      value={hueRotate}
                      handleChange={handleHueRotateChange}
                    />
                  </div>
                  <div className="mb-6 flex h-[63.43px] w-[332px] flex-col justify-evenly">
                    <p className="custo-font h-[30px] w-[397px] text-[20px] font-[400] leading-[30px] tracking-[0.46px] text-[#000000]">
                      Blur
                    </p>
                    <Slider
                      min={0}
                      max={20}
                      value={blur}
                      handleChange={handleBlurChange}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
