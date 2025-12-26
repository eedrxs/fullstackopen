import { useState } from "react";
import diariesService from "../services/diaries";
import { isAxiosError } from "axios";

const NewEntry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const target = event.target as HTMLFormElement;
    const newEntry = {
      date: target.date.value,
      visibility: target.visibility.value,
      weather: target.weather.value,
      comment: target.comment.value,
    };

    try {
      await diariesService.create(newEntry);
      window.location.reload();
    } catch (e) {
      if (isAxiosError(e) && e.response?.data) {
        setError(e.response.data);
        setTimeout(() => setError(""), 3000);
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h3>Add new entry</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            date <input type="date" id="date" />
          </label>
        </div>

        <div>
          <div>
            visibility{" "}
            {visibility.map((visibility) => (
              <label key={visibility}>
                {visibility}
                <input
                  type="radio"
                  id="visibility"
                  name="visibility"
                  value={visibility}
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <div>
            weather{" "}
            {weather.map((weather) => (
              <label key={weather}>
                {weather}
                <input
                  type="radio"
                  id="weather"
                  name="weather"
                  value={weather}
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <label>
            comment <input id="comment" />
          </label>
        </div>

        <button>{isLoading ? "adding..." : "add"}</button>
      </form>
    </div>
  );
};

export default NewEntry;

const visibility = ["great", "good", "ok", "poor"];
const weather = ["sunny", "rainy", "cloudy", "stormy", "windy"];
