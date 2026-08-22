import React from "react";

const Hero = ({ onGetStarted }) => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#111827] to-black"></div>

            {/* Decorative Blur */}
            <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-green-500/10 blur-[120px]"></div>
            <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]"></div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <span className="mb-6 rounded-full border border-gray-700 bg-gray-900/70 px-5 py-2 text-sm text-purple-400">
                    🎬 Track • Rate • Discover
                </span>

                <h1 className="max-w-5xl text-6xl font-extrabold leading-tight text-white md:text-7xl">
                    Welcome to{" "}
                    <span className="text-purple-400">Trail</span>
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
                    Keep track of every movie you've watched, discover new
                    favorites, create your own watchlist, and share your
                    cinematic journey with friends.
                </p>

                <div className="mt-12 flex gap-5">
                    <button
                        onClick={onGetStarted}
                        className="rounded-lg bg-purple-500 px-8 py-3 font-semibold text-white transition hover:bg-purple-600"
                    >
                        Get Started
                    </button>

                    <button className="rounded-lg border border-gray-700 px-8 py-3 font-semibold text-white transition hover:border-white hover:bg-white hover:text-black">
                        Explore Movies
                    </button>
                </div>

                <p className="mt-10 text-sm text-gray-500">
                    Join thousands of movie lovers building their personal film diary.
                </p>
            </div>
        </section>
    );
};

export default Hero;