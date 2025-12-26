import axios from "axios";

import { apiBaseUrl } from "../constants";
import type { NonSensitiveDiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

const create = async (object: unknown) => {
  const { data } = await axios.post<unknown>(
    `${apiBaseUrl}/diaries`,
    object
  );

  return data;
};

export default {
  getAll, create
};

