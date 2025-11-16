import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const Search = () => {
  const originalUrl =
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

  const proxyUrl =
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(originalUrl);

  const fetchTestData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTczODY3OTRkMDQ5MTZlY2Q4Mzk5MTk5OTNkMTFlOCIsIm5iZiI6MTc2MzE5Nzc5Ny4zOTEsInN1YiI6IjY5MTg0MzY1NjRhMzJiMjE2MjRjOWYxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-j-ZUW1lWfUrLSFpPQ0UueVy-enL3jclEM-3zqgiGRw'
      }
    };

    try {
      console.log("TEST DATA FETCHING......")
      const response = await fetch(originalUrl, options)
      console.log("TEST RESPONSE", response);

      const json = await response.json();
      console.log("TEST DATA", json);
    } catch (error: any) {
      console.log("Error-->", error?.message)
    }
  }

  useEffect(() => {
    console.log("Test data fetching:");

    fetchTestData()

  }, []);

  return (
    <View>
      <Text>Search</Text>
    </View>
  )
}

export default Search