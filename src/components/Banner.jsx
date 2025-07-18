import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    {
      image:
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Denim Stylish Jacket ",
      title1: "Jean's stylish Jacket",
      subtitle: "Sky Blue Soft Denim",
      cta: "Check Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1647243498368-8c19cf82031a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNsb3RoaW5nJTIwYnJhbmR8ZW58MHx8MHx8fDA%3D",
      title: "Summer Collection",
      subtitle: "Discover our latest styles",
      cta: "Shop Now",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1673310535178-7c6069f28917?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNsb3RoaW5nJTIwYnJhbmR8ZW58MHx8MHx8fDA%3D",
      title: "New Arrivals",
      subtitle: "Fresh looks for the season",
      cta: "Explore",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1673356301861-d555ce5972ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNsb3RoaW5nJTIwYnJhbmR8ZW58MHx8MHx8fDA%3D",
      title: "Limited Edition",
      subtitle: "Exclusive pieces, limited time",
      cta: "Get It Now",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? data.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === data.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="relative mt-17 overflow-x-hidden mx-auto max-w-screen-xl w-full">
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
                  to={
                    slide.title1
                      ? `/product/${String(slide.title1)
                          .toLocaleLowerCase()
                          .split(" ")
                          .join("")}`
                      : "/#shop"
                  }
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
