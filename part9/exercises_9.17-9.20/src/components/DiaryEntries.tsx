import { useEffect, useState } from "react";
import diaryService from "../services/diaries";
import type { NonSensitiveDiaryEntry } from "../types";

const DiaryEntries = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      console.log(diaries);
      setDiaries(diaries);
    };

    fetchDiaries();
  }, []);

  return (
    <div>
      <h2>Diary Entries</h2>

      {diaries.map((diary, index) => (
        <div key={index}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
