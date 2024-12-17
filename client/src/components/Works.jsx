import React from "react";
import { projects } from "../data";
import { BsGithub } from "react-icons/bs";

const Works = () => {
  return (
    <div className='w-full flex flex-col py-20 px-8 md:px-10 gap-10 lg:gap-20 lg:py-20'>
      <h4 className='text-3xl font-bold text-black dark:text-white mt-10 '>
        Projects
      </h4>

      <div className='flex flex-wrap gap-10 lg:gap-20 justify-center '>
        {projects.map((p, index) => (
          <div
            data-aos='fade-up'
            data-aos-offset='200'
            data-aos-delay='50'
            data-aos-duration='1000'
            data-aos-easing='ease-in-out'
            key={index}
            className='w-[450px] h-[350px] cursor-pointer shadow-xl hover:scale-110 ease-in-out duration-300 rounded-md '
          >
            <img
              src={p.img}
              alt={p.name}
              className='w-full h-[250px] rounded-md '
            />

            <div className='w-full h-[100px] bg-white dark:bg-[#04133e]'>
              <h4 className='text-2xl text-black dark:text-white font-semibold py-2 px-5 '>
                {p.title}
              </h4>
              <div className="flex gap-2 px-5 items-center">
                <BsGithub className='hover:scale-125' />
                <a 
                  href={p.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className='text-sm text-orange-600 px-1 uppercase'
                >
                  {p.cat}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
