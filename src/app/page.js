"use client";
import { useEffect, useState } from "react";
import { getData } from "@/request";
import Image from "next/image";

export default function DeveloperFilter() {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  const filteredDevelopers = data.filter((dev) =>
    selectedSkill ? dev.languages?.includes(selectedSkill) : true
  );

  console.log(filteredDevelopers);

  return (
    <div className="bg-sky-50 text-gray-900 min-h-screen flex flex-col items-center">
      <img
        className="w-full"
        src="bg-haeder.png"
        width={400}
        height={400}
        alt="Bg Image"
      />

      <div className="max-w-[1110px] w-full px-4 md:px-0 mx-auto">
        <select
          className="border py-5 px-5 mb-5 w-full bg-white border-gray-700 rounded-md"
          onChange={(e) => setSelectedSkill(e.target.value)}
          value={selectedSkill}
        >
          <option value="">Barchasi</option>
          <option value="JavaScript">JavaScript</option>
          <option value="CSS">CSS</option>
          <option value="Python">Python</option>
          <option value="Ruby">Ruby</option>
        </select>
      </div>

      <ul className="space-y-4 container mx-auto max-w-[1110px] mt-10 px-4 md:px-0">
        {filteredDevelopers.map((dev, index) => (
          <li
            key={index}
            className="flex flex-col mt-5 md:flex-row md:justify-between items-start md:items-center bg-white shadow-lg p-6 rounded-md gap-6"
          >
            <div className="flex flex-col md:flex-row md:items-center items-start gap-6">
              <Image
                src={dev.logo}
                width={80}
                height={80}
                alt="logo"
                className="w-16 h-16"
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[#5CA5A5] font-bold text-lg">
                    {dev.company}
                  </span>
                  {dev.new && (
                    <span className="bg-[#5CA5A5] text-white text-xs px-2 py-1 rounded-full">
                      NEW!
                    </span>
                  )}
                  {dev.featured && (
                    <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold">{dev.position}</h3>
                <div className="text-gray-500 text-sm flex flex-wrap gap-4">
                  <span>{dev.postedAt}</span>
                  <span>{dev.contract}</span>
                  <span>{dev.location}</span>
                </div>
              </div>
            </div>
            <hr className="bg-gray-300 w-full h-[2px] md:hidden" />
            <div className="flex flex-wrap items-center justify-start md:justify-end gap-3">
              <span className="border text-[#5CA5A5] py-2 px-3 text-sm md:text-base hover:text-white hover:bg-[#5CA5A5] rounded-md font-bold">
                {dev.role}
              </span>
              <span className="border text-[#5CA5A5] py-2 px-3 text-sm md:text-base hover:text-white hover:bg-[#5CA5A5] rounded-md font-bold">
                {dev.level}
              </span>
              {dev.languages.map((language, index) => (
                <span
                  key={index}
                  className="border text-[#5CA5A5] py-2 px-3 text-sm md:text-base hover:text-white hover:bg-[#5CA5A5] rounded-md font-bold"
                >
                  {language}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
