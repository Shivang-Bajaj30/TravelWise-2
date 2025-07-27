import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface TripDetailsProps {
  selectedLocation: string | null;
}

const TripDetailsPage: React.FC<TripDetailsProps> = ({ selectedLocation }) => {
  const [travelers, setTravelers] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [preferences, setPreferences] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const locationState = useLocation();
  const selectedLocationFromState = locationState.state?.selectedLocation || selectedLocation;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/trip', {
        location: selectedLocationFromState,
        travelers,
        startDate,
        endDate,
        preferences,
      });
      console.log('Trip details submitted:', { selectedLocation: selectedLocationFromState, travelers, startDate, endDate, preferences });
      navigate('/'); // Redirect back to home or to itinerary page later
    } catch (err) {
      setError('Failed to submit trip details. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden" style={{ height: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-19" style={{ height: 'calc(100vh - 64px)' }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Plan Your Trip to {selectedLocationFromState || 'Your Destination'}
        </h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="travelers">
              Number of Travelers
            </label>
            <input
              type="number"
              id="travelers"
              value={travelers}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTravelers(Math.max(1, parseInt(e.target.value)))
              }
              min="1"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="preferences">
              Travel Preferences (e.g., adventure, relaxation, culture)
            </label>
            <textarea
              id="preferences"
              value={preferences}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPreferences(e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={4}
              placeholder="Tell us what kind of trip you're looking for..."
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-colors duration-200"
          >
            Generate Itinerary
          </button>
        </form>
      </div>
    </div>
  );
};

export default TripDetailsPage;