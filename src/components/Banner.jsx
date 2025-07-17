import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Summer Collection",
      subtitle: "Discover our latest styles",
      cta: "Shop Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "New Arrivals",
      subtitle: "Fresh looks for the season",
      cta: "Explore",
    },
    {
      image:
        "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Limited Edition",
      subtitle: "Exclusive pieces, limited time",
      cta: "Get It Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Clearance Sale",
      subtitle: "Up to 70% off selected items",
      cta: "Shop Sale",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? data.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === data.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="relative mt-14 overflow-x-hidden mx-auto max-w-screen-xl w-full">
      {" "}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {data.map((slide, index) => (
          <div key={index} className="min-w-full h-[350px] relative">
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            > */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-2xl"
            />
            {/* </a> */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-white pointer-events-auto">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-xl mb-6">{slide.subtitle}</p>
                <Link
                  to="/#shop"
                  className=" bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
            <button
              onClick={prevSlide}
              className=" cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={nextSlide}
              className=" cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-blue-300" : "bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default Banner;
