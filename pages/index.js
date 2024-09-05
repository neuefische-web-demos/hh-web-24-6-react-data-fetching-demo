import { useState } from "react";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";

// fetch
// axios
// graphQL

async function fetcher(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default function HomePage() {
  const [id, setId] = useState(0);
  const { data, isLoading, error } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`,
    fetcher
  );

  const [funnyJokeIds, setFunnyJokeIds] = useLocalStorageState("funnyJokeIds", {
    defaultValue: [],
  }); // if our Id is included, the joke is funny, otherwise not.

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  function handleToggleFunny(id) {
    const isFunny = funnyJokeIds.includes(data.id);
    if (isFunny) {
      setFunnyJokeIds(funnyJokeIds.filter((jokeId) => jokeId !== id));
    } else {
      setFunnyJokeIds([...funnyJokeIds, id]);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error: {error}</h1>;
  }

  const isFunny = funnyJokeIds.includes(data.id);

  // const comments = [
  //   {
  //     id: 0,
  //     comments: [],
  //   },
  // ];

  // const jokeComments = comments.find((commentList) => commentList.id === id);

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.joke}</h1>
      <button onClick={() => handleToggleFunny(data.id)}>
        {isFunny ? "😀" : "😭"}
      </button>
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
