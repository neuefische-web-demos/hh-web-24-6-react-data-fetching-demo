import { useEffect, useState } from "react";
import useSWR from "swr";

export default function HomePage() {
  return (
    <>
      <Joke />
      <Joke />
    </>
  );
}

async function fetcher(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function Joke() {
  const [id, setId] = useState(0);
  const { data, isLoading, error } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`,
    fetcher
  );

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }
  console.log(isLoading, error, data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.joke}</h1>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
