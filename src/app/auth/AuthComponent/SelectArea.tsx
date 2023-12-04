"use client";
import { useState } from "react";

interface SelectAreaProps {
    area: string;
    onAreaChange: (selectedArea: string) => void;
}

export default function SelectArea({ area, onAreaChange }: SelectAreaProps) {
  const handleChange = (event: any) => {
    onAreaChange(event.target.value as string);
  };

  return (
    <div className="selectArea w-72">
      <label htmlFor="area" className="block text-gray-700 text-sm font-bold mb-2">지역</label>
      <select 
        id="area"
        value={area} 
        onChange={handleChange} 
        className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value="서울">서울</option>
        <option value="경기도">경기도</option>
        <option value="인천">인천</option>
        <option value="강원도">강원도</option>
        <option value="충청북도">충청북도</option>
        <option value="충청남도">충청남도</option>
        <option value="대전">대전</option>
        <option value="경상북도">경상북도</option>
        <option value="경상남도">경상남도</option>
        <option value="대구">대구</option>
        <option value="울산">울산</option>
        <option value="부산">부산</option>
        <option value="전라북도">전라북도</option>
        <option value="전라남도">전라남도</option>
        <option value="광주">광주</option>
        <option value="제주도">제주도</option>
      </select>
    </div>
  );
}