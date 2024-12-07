import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

// callback?.();    
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(`${apiUrl}/?apikey=${apiKey}&s=${query}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("error fetching");
        }

        const data = await response.json();
        setMovies(data.Search || []);
        // setError("");
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
      } catch (error) {
        console.error(error.message);

        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
    };
     
    fetchMovies();

    return () => controller.abort();
  }, [query]);
  return { movies, isLoading, error };
}
