# Closest Suburb

A tiny full-stack app that finds the nearest suburb to a given latitude/longitude.
* Backend: ASP.NET Core Web API (C#) that reads suburbs.json, computes distance, and returns the closest suburb.
* Frontend: React app that accepts lat/lon, calls the API, and displays the result.

### Quick start
1) Backend (ASP.NET Core)
Requirements: .NET 8+
```bash
# from the backend project folder
dotnet restore
dotnet build
dotnet run
```
* Ensure suburbs.json is present and copied to the output directory (set file properties to “Copy always” or “Copy if newer”).
* The API runs on Kestrel; note the port printed in the console (e.g., http://localhost:5174).
* If your React app uses a different port/base URL, update the BACKEND constant in the frontend.

2) Frontend (React)
Requirements: Node 18+
```bash
# from the frontend folder
npm install
npm start
```
* The app expects the backend at http://localhost:5174 by default; change the BACKEND constant if your backend runs elsewhere.

### API
Endpoint
```bash
GET /ClosestSuburbController?lat={number}&longi={number}
```

Query params
* lat: latitude (−90..90)
* longi: longitude (−180..180)

Response 200 (application/json)
```bash
{
  "id": 123,
  "suburbName": "Example Suburb",
  "latitude": -36.85,
  "longitude": 174.76
}
```

### Behavior

Reads and deserializes suburbs.json, then orders suburbs by distance to the input point and returns the closest one. (Current implementation uses Euclidean distance.)

Tip: If calling from a browser app on another origin, enable CORS in the API or run both on the same origin during development.

### Frontend usage

Enter latitude and longitude.

Click Find closest.

The closest suburb name appears below the form.

The button is disabled while loading; errors render inline.
