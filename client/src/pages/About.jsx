import React from "react";

function About() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4 text-slate-700">About Me</h1>
      <p className="mb-8 text-slate-500">
        My name is Vivek. I am a software engineer with a passion for real
        estate. I have been working on a real estate project to provide a
        platform for users to buy, sell, and rent properties with ease.
      </p>

      <h1 className="text-2xl font-bold mb-4  text-slate-700">
        About the Real Estate Project
      </h1>
      <p className="text-slate-500">
        This project is designed to simplify the process of real estate
        transactions. It provides a user-friendly interface where users can
        browse through various listings, get detailed information about each
        property, and contact the property owner or agent directly through the
        platform. The project is built using modern technologies to ensure a
        seamless experience for all users.
      </p>
      <a
        href="https://kpvivek.netlify.app/"
        target="_blank"
        className="bg-slate-600 text-white px-4 py-2 mt-8 rounded-md inline-block"
      >
        Visit Website
      </a>
    </div>
  );
}

export default About;
