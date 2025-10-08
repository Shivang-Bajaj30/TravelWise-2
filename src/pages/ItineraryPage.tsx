import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Hotel, Bus, Calendar, ArrowLeft } from "lucide-react";

const ItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.result?.data;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          No itinerary data found 🗺️
        </h1>
        <Button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
        >
          Go Back
        </Button>
      </div>
    );
  }

  const { places = [], hotels = [], transportation = [], costs = [], itinerary = [] } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            ✈️ Your Personalized Itinerary
          </h1>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex items-center gap-2 border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </div>

        {/* Places Section */}
        <Card className="shadow-lg border border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 text-2xl">
              <MapPin className="w-6 h-6" /> Must-Visit Places
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            {places.length > 0 ? (
              places.map((place: any, i: number) => (
                <div key={i} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg text-gray-900">{place.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{place.details}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    🕒 {place.time} | 💰 {place.pricing || "Free"}
                  </p>
                  <p className="text-sm text-gray-500">🌤️ Best time: {place.bestTime}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No place recommendations available.</p>
            )}
          </CardContent>
        </Card>

        {/* Hotels Section */}
        <Card className="shadow-lg border border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 text-2xl">
              <Hotel className="w-6 h-6" /> Recommended Hotels
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            {hotels.length > 0 ? (
              hotels.map((hotel: any, i: number) => (
                <div key={i} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg text-gray-900">{hotel.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{hotel.description}</p>
                  <p className="text-sm text-gray-500 mt-1">📍 {hotel.address}</p>
                  <p className="text-sm text-gray-500">💵 {hotel.price} | ⭐ {hotel.rating}</p>
                  <p className="text-sm text-gray-500">
                    🛎️ {hotel.amenities?.join(", ") || "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No hotel data available.</p>
            )}
          </CardContent>
        </Card>

        {/* Transportation Section */}
        <Card className="shadow-lg border border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 text-2xl">
              <Bus className="w-6 h-6" /> Transportation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transportation.length > 0 ? (
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                {transportation.map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No transportation data available.</p>
            )}
          </CardContent>
        </Card>

        {/* Costs Section */}
        <Card className="shadow-lg border border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 text-2xl">
              <Calendar className="w-6 h-6" /> Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {costs.length > 0 ? (
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                {costs.map((c: string, i: number) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No cost information available.</p>
            )}
          </CardContent>
        </Card>

        {/* Itinerary Section */}
        <Card className="shadow-lg border border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 text-2xl">
              <Calendar className="w-6 h-6" /> Daily Itinerary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {itinerary.length > 0 ? (
              itinerary.map((day: any, i: number) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Day {day.day}
                  </h3>
                  <ul className="list-disc ml-6 text-gray-700 space-y-1 mt-2">
                    {day.activities?.map((a: string, j: number) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No daily itinerary available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ItineraryPage;