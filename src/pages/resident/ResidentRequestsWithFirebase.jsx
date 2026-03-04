import { useState, useEffect } from "react";
import { getRequestsByResident } from "../../firebase/services";

const ResidentRequestsWithFirebase = ({ residentId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        // Assuming residentId is "user123" or actual Firebase UID
        const data = await getRequestsByResident(residentId);
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (residentId) {
      fetchRequests();
    }
  }, [residentId]);

  if (loading) return <div>Loading requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>My Requests</h2>
      {requests.map(request => (
        <div key={request.id}>
          <h3>{request.type}</h3>
          <p>Status: {request.status}</p>
          <p>Date: {request.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ResidentRequestsWithFirebase;