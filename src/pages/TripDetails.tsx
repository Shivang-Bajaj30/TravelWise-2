import { useState } from 'react';

const TripDetails = () => {
  const [tripDetails, setTripDetails] = useState({
    budget: '',
    days: '',
    people: '',
    travelWith: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({ ...prev, [name]: value }));
  };

  const isPeopleFieldLocked = tripDetails.travelWith === 'solo' || tripDetails.travelWith === 'couple';

  return (
    <div className="max-w-xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Plan Your Trip</h1>
        <p className="mb-4 text-gray-600">Complete the details below to create your personalized travel itinerary</p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="font-bold mb-2 block" htmlFor="budget">What's your budget?</label>
          <select
            name="budget"
            id="budget"
            value={tripDetails.budget}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mb-2"
            required
          >
            <option value="">Select Budget Range</option>
            <option value="low">Low Budget</option>
            <option value="medium">Medium Budget</option>
            <option value="high">High Budget</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="font-bold mb-2 block" htmlFor="days">How many days?</label>
          <input
            name="days"
            id="days"
            value={tripDetails.days}
            onChange={handleChange}
            placeholder="Number of days"
            type="number"
            min={1}
            className="w-full p-3 border border-gray-300 rounded mb-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="font-bold mb-2 block" htmlFor="travelWith">Choose your travel companions</label>
          <select
            name="travelWith"
            id="travelWith"
            value={tripDetails.travelWith}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mb-2"
            required
          >
            <option value="">Select Travel Group</option>
            <option value="solo">Solo</option>
            <option value="couple">Couple</option>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
          </select>
        </div>
        {tripDetails.travelWith && tripDetails.travelWith !== 'solo' && (
          <div className="mb-6">
            <label className="font-bold mb-2 block" htmlFor="people">Number of People</label>
            <input
              name="people"
              id="people"
              value={tripDetails.people}
              onChange={handleChange}
              placeholder="Number of travelers"
              type="number"
              min={1}
              className="w-full p-3 border border-gray-300 rounded mb-2"
              disabled={isPeopleFieldLocked}
              required
            />
            {tripDetails.travelWith === 'couple' && (
              <p className="text-xs text-gray-500 mt-1">For couples, the number of travelers is set to 2</p>
            )}
          </div>
        )}
        <button type="submit" className="bg-green-600 rounded px-6 py-3 text-white font-bold mt-2" disabled={loading}>
          {loading ? 'Planning...' : 'Plan Trip'}
        </button>
      </form>
    </div>
  );
};

export default TripDetails; 