import "./App.css";
import React from "react";
import { useState } from "react";

const BACKEND = "http://localhost:5174"; // Backend url

type Suburb = {
  id: number,
  suburbName: string;
  latitude: number;
  longitude: number;
}

function App() {
  const [latS, setLatS] = useState(""); 
  const [longiS, setLongiS] = useState("");
  const [closest, setClosest] = useState<Suburb | null>(null); // Initially null
  // loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 

  async function onSubmit(e: React.FormEvent<HTMLFormElement>)
  {
    e.preventDefault();
    setClosest(null) // Reset closest before fetching
    setError(null);

    const lat = parseFloat(latS.trim()); // Convert string states to float
    const longi = parseFloat(longiS.trim()); // Trim before parsing 

    // Validate input is numeric
    if (Number.isNaN(lat) || Number.isNaN(longi)) {
      setError("Please enter numbers.");
      return;
    }
    // Validate input in appropriate range
    if (lat < -90 || lat > 90 || longi < -180 || longi > 180) {
      setError("Latitude must be between -90 and 90; longitude between -180 and 180.");
    return;
    }
    // Set loading true while fetching
    setLoading(true);
    try {
      const url = `${BACKEND}/ClosestSuburbController?lat=${lat}&longi=${longi}`;
      const response = await fetch(url);
    
      const text = await response.text();

      if (!response.ok) {
        let message = `Fail`;
        try {
          const body = text ? JSON.parse(text) : null;
          if (body?.message) message = body.message;
        } catch {}
        throw new Error(message);
      }

      if (!text) {
        setError("No closest suburb found.");
        return;
      }

      const data = JSON.parse(text) as Suburb; // Get closest suburb from backend
      setClosest(data);
    } catch (e: any) {
      setError(e?.message ?? "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }


  return (
  <div>
      <form onSubmit={onSubmit}>
        <label>
          Latitude
          <input
            type="number"
            step="any"
            min={-90}
            max={90}
            placeholder="-10"
            value={latS}
            onChange={(e) => setLatS(e.target.value)}
            required
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            step="any"
            min={-180}
            max={180}
            placeholder="-10"
            value={longiS}
            onChange={(e) => setLongiS(e.target.value)}
            required
          />
        </label>
        {/* Disable button while request in process */}
        <button type="submit" disabled={loading}>
          {loading ? "Finding…" : "Find closest"}
        </button>

        {/* Render only when loading, error (alert for readers), closest not null */}
        {loading && <p>Loading…</p>}
        {error && <p role="alert">{error}</p>}
        {closest && <p>{closest.suburbName}</p>}

      </form>

  </div>
  );
}

export default App;
