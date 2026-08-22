import React, { useEffect, useRef, useState } from "react";

const Credits = ({ cast = [], crew = [] }) => {
    const [activeTab, setActiveTab] = useState("cast");
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [activeTab]);

    const people = activeTab === "cast" ? cast : crew;

    return (
        <div className="py-16">
            <h2 className="text-4xl font-bold mb-5">
                Credits
            </h2>

            <button
                onClick={() => setActiveTab("cast")}
                className={`px-6 py-3 rounded-full border transition-all duration-300 mr-4 mb-4 ${
                    activeTab === "cast"
                        ? "bg-white text-black border-white"
                        : "bg-white/10 text-white border-white hover:bg-white hover:text-black"
                }`}
            >
                Cast
            </button>

            <button
                onClick={() => setActiveTab("crew")}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                    activeTab === "crew"
                        ? "bg-white text-black border-white"
                        : "bg-white/10 text-white border-white hover:bg-white hover:text-black"
                }`}
            >
                Crew
            </button>

            <div
                ref={scrollRef}
                className="h-[540px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {people.map((person) => (
                        <div
                            key={`${person.name}-${activeTab === "cast" ? person.character : person.job}`}
                            className="bg-[#181818] rounded-2xl p-5 flex flex-col items-center border border-gray-800 hover:border-gray-500 hover:scale-105 transition-all duration-300"
                        >
                            <img
                                src={
                                    person.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                                        : "https://placehold.co/185x185?text=No+Image"
                                }
                                alt={person.name}
                                className="w-28 h-28 rounded-full object-cover border-2 border-gray-700"
                            />

                            <h3 className="mt-4 text-lg font-semibold text-center">
                                {person.name}
                            </h3>

                            <p className="text-gray-400 text-sm text-center">
                                {activeTab === "cast"
                                    ? person.character
                                    : person.job}
                            </p>

                            {activeTab === "crew" && (
                                <p className="text-xs text-gray-500 text-center mt-1">
                                    {person.department}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Credits;