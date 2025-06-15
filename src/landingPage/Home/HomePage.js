import React from 'react';
import { ToastContainer } from "react-toastify";

import Hero from './Hero';
import Features from './Features';
import Comments from './Comments';
import Work from './Work';

const HomePage =() =>{
  return (
    <>
      <ToastContainer />
      <Hero />
      <Features />
      <Comments />
      <Work />
    </>
  );
};

export default HomePage;
