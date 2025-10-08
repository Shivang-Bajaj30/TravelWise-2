import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Users, Wand2 } from "lucide-react";
import { generateItinerary } from "@/lib/api";

const TripDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const locationState = useLocation();
  const selectedLocation = locationState.state?.selectedLocation || "";

  const [travelers, setTravelers] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [preferences, setPreferences] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) {
      setError("Please select a destination first.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await generateItinerary({
        destination: selectedLocation,
        travelers,
        startDate,
        endDate,
        preferences,
      });

      console.log("AI Itinerary:", result);
      setSuccess(true);

      // Navigate to results page with itinerary data
      setTimeout(() => {
        navigate("/itinerary", { state: { result: result.data } });
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Failed to generate itinerary. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full shadow-2xl backdrop-blur-md bg-white/80 border border-white/40">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-extrabold text-gray-900">
            Plan Your Trip ✈️
          </CardTitle>
          <p className="text-gray-600">
            Destination:{" "}
            <span className="font-semibold text-orange-600">
              {selectedLocation || "Not selected"}
            </span>
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Travelers */}
            <div className="space-y-2">
              <Label htmlFor="travelers" className="flex items-center gap-2 text-gray-700">
                <Users className="w-5 h-5 text-orange-600" /> Number of Travelers
              </Label>
              <Input
                type="number"
                id="travelers"
                value={travelers}
                onChange={(e) => setTravelers(Math.max(1, +e.target.value))}
                min="1"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-5 h-5 text-orange-600" /> Start Date
                </Label>
                <Input
                  type="date"
                  id="startDate"
                  value={startDate}
                  min={today}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-5 h-5 text-orange-600" /> End Date
                </Label>
                <Input
                  type="date"
                  id="endDate"
                  value={endDate}
                  min={startDate || today}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-2">
              <Label htmlFor="preferences" className="flex items-center gap-2 text-gray-700">
                <Wand2 className="w-5 h-5 text-orange-600" /> Travel Preferences
              </Label>
              <Textarea
                id="preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="Adventure, culture, relaxation..."
                rows={4}
              />
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}
            {success && (
              <p className="text-green-600 text-center font-medium">
                ✅ Itinerary generated successfully!
              </p>
            )}

            <div className="text-center">
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:scale-[1.03] transition-transform text-white px-8 py-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...
                  </>
                ) : (
                  "Generate Itinerary"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripDetailsPage;
