import "./App.css";
import { useState } from "react";

const BACKEND = "http://localhost:5174"; // backend url

type Suburb = {
  id: number,
  suburbName: string;
  latitude: number;
  longitude: number;
}

type Closest = {
  id: number,
  suburbName: string;
  latitude: number;
  longitude: number;
}

function App() {
  const [lat, setLat] = useState("");
  const [longi, setLongi] = useState("");
  const [closest, setClosest] = useState<Suburb | null>(null); //initially null
  // loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 

  async function onSubmit(e: React.FormEvent)
  {
    e.preventDefault();
    setError(null);
    setClosestName(null);
    setClosestDistance(null);

    const latNum = parseFloat(lat); //strinmg to num
    const longiNum = parseFloat(longi)

    if (Number.isNaN(latNum) || Number.isNaN(longiNum)) {
      setError("Please enter numbers");
      return;
    }

    setLoading(true);
    try {
      const url = `${BACKEND}/controller`;
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
        setError("None found");
        return;
      }

      const data = JSON.parse(text) as Suburb; // get suburb from backend
      setClosest(data);
    } catch (e: any) {
      setError(e?.message ?? "Errir");
    } finally {
      setLoading(false);
    }
  }


  return (
  <div>
      <form onSubmit={onSubmit}>

        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />

        <input
          type="number"
          value={longi}
          onChange={(e) => setLongi(e.target.value)}
          required
        />
        <button type="submit">Add</button>

      </form>

  </div>
  );
}

export default App;
