import { useState } from "react";
import { RouteList } from "./components/RouteList";
import type { Route } from "./types";
import { MapPin } from "lucide-react";
import routesData from "./data/routes.json";

export function App() {
  const initialRoute = {
    ...routesData[0],
    steps: JSON.parse(
      localStorage.getItem("savedRouteSteps") ||
        JSON.stringify(routesData[0].steps)
    ),
  };

  const [route, setRoute] = useState<Route>(initialRoute);

  const handleRouteUpdate = (updatedRoute: Route) => {
    setRoute(updatedRoute);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">{route.name}</h1>
          </div>

          <RouteList route={route} onRouteUpdate={handleRouteUpdate} />
        </div>
      </div>
    </div>
  );
}
