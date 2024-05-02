import React from 'react';
import {Link} from "react-router-dom";

function HomeScreen(props) {
    const currentYear = new Date().getFullYear();

    return (
        <div className="bg-default min-h-screen p-6 flex flex-col items-center justify-center lg:space-y-10 md:space-y-8 space-y-4 text-indigo-100 overscroll-none">
            <section className="flex flex-col items-center justify-center space-y-10">
                <h1 className="text-center lg:text-7xl md:text-5xl text-3xl line font-bold">
                    Impossible alone.
                    <br/>
                    <span className="lg:ml-60 md:ml-50 ml-6">Possible together.</span>
                </h1>

                <p className="text-center lg:text-xl md:text-xl text-l tracking-widest text-gray-400">
                    Make work flow across teams while connecting back to company goals.
                </p>

                <div className="flex items-center justify-center lg:gap-6 md:gap-5 gap-3">
                    <Link to="/auth/get-started" className="flex items-center justify-center lg:w-40 md:w-32 w-28 lg:h-12 md:h-10 h-8 lg:text-xl md:text-l text-m ring-2 ring-orange-500 rounded-full hover:bg-orange-500 transition-all duration-200 hover:px-5 cursor-pointer">
                        Get Started
                    </Link>

                    <Link to="/auth/login" className="flex items-center justify-center lg:w-40 md:w-32 w-28 lg:h-12 md:h-10 h-8 lg:text-xl md:text-l text-m ring-2 ring-orange-500 rounded-full hover:bg-orange-500 transition-all duration-200 hover:px-5 cursor-pointer">
                        Login
                    </Link>
                </div>
            </section>

            <footer className="flex lg:flex-row md:flex-row flex-col items-center justify-center gap-3 lg:pt-40 md:pt-28 pt-20">
                <a href="https://github.com/mdjahidhasan009/Project_Management/fork" className="text-gray-400">
                  <img alt="GitHub forks" src="https://img.shields.io/github/forks/mdjahidhasan009/Project_Management?style=social"/>
                </a>

                <a href="https://github.com/mdjahidhasan009/Project_Management/stargazers" className="ml-3 text-gray-400">
                  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/mdjahidhasan009/Project_Management?style=social"/>
                </a>

                <a href="https://github.com/mdjahidhasan009/Project_Management" className="ml-3 text-gray-400">
                  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/mdjahidhasan009/Project_Management"/>
                </a>
            </footer>
        </div>
    );
}

export default HomeScreen;
