"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getData } from "@/request";

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
    selectedSkill ? dev.language?.includes(selectedSkill) : true
  );

  return (
    <div className="bg-sky-50 text-gray-900 w-full h-full flex flex-col mx-auto justify-center">
      <img
        className="w-full"
        src="bg-haeder.png"
        width={400}
        height={400}
        alt="Bg Image"
      />

      <div className="max-w-[1390px] w-full mx-auto">
        <select
          className="border  py-5 px-4 max-w-[1110px] w-full mx-auto absolute top-40 bg-white border-gray-700 p-2 rounded"
          onChange={(e) => setSelectedSkill(e.target.value)}
          value={selectedSkill}
        >
          <option value="">Barchasi</option>
          <option value="JavaScript">JavaScript</option>
          <option value="CSS">CSS</option>
          <option value="React">React</option>
          <option value="Python">Python</option>
          <option value="Django">Django</option>
        </select>
      </div>

      <ul className="space-y-2 container mx-auto max-w-[1110px] mt-20">
        {filteredDevelopers.map((dev, index) => (
          <li
            key={index}
            className="flex justify-between border py-8 px-10 gap-5 bg-white p-2 rounded"
          >
            <h3>{dev.position}</h3>
            <p className="border py-2 px-2 hover:text-white hover:bg-[#5CA5A5]">
              {dev.languages?.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
