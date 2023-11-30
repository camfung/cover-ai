import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useCredits = () => {
  const [credits, setCredits] = useState(null);

  const fetchCredits = useCallback(async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + `/get-credits`,
        { withCredentials: true }
      );
      setCredits(response.data.credits);
    } catch (error) {
      // Handle error here
      console.error("Error fetching credits:", error);
    }
  }, [setCredits]);

  useEffect(() => {
    fetchCredits();
  }, []);

  return { credits, fetchCredits };
};
