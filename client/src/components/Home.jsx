import { useEffect, useState } from "react";
import axios from "axios";
import ErrorComponent from "./ErrorComponent";
import ShortenLink from "./ShortenLink";

function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [urlData, setUrlData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [message, setMessage] = useState("");

  const url = "http://localhost:5000";

  function validateUrl(url) {
    const lowercasedURL = url.toLowerCase();
    return lowercasedURL.startsWith("http://") || lowercasedURL.startsWith("https://");
  }

  function onChangeHandler(event) {
    setInput(event.target.value);
  }

  useEffect(() => {
    async function fetchData(api) {
      try {
        const response = await axios.get(api);
        setUrlData(response?.data);
        const latestValue = response.data[response?.data?.length - 1];
        const link = `${url}/${latestValue?.shorturlid}`;
        // setMessage(link);
      } catch (error) {
        setError(true);
        setMessage("Error fetching data: " + error.message);
      }
    }

    fetchData(url + "/api/get-all-short-urls");
  }, [refresh]);

  async function onSubmitHandler(event) {
    event.preventDefault();
    if (!validateUrl(input)) {
      setError(true);
      setMessage("Enter a valid link starting with http:// or https://");
      return;
    }
    try {
      const response = await axios.post(url + "/api/create-short-url", {
        longurl: input,
      });

      if (response?.data?.status === "ok") {
        setError(false);
        setInput("");
        setRefresh((prev) => !prev);
      // console.log(response.data);
        setMessage(`${url}/${response?.data?.shorturlid}`);
      
      }
    } catch (error) {
      setError(true);
      setMessage("Error submitting URL: " + error.message);
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-9 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Create Short URL</h1>
      
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg w-full sm:w-2/4">
        <form
          className="flex flex-col w-full gap-6"
          onSubmit={onSubmitHandler}
        >
          <label htmlFor="url" className="self-start text-lg font-medium text-gray-700">
            Enter Link
          </label>
          <input
            type="text"
            value={input}
            onChange={onChangeHandler}
            placeholder="http://example.com"
            id="url"
            className="h-12 w-full border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           {error ? <ErrorComponent message={message} className="bg-red-100"/> :  <>{message}</>}
          <button
            type="submit"
            className="h-12 w-full bg-blue-600 text-white rounded-md transition-all ease-in-out transform hover:bg-blue-700 hover:scale-105"
          >
            Create Short URL
          </button>
        </form>
      </div>

      <div className="mt-8 w-full sm:w-2/4">
        <ShortenLink data={urlData} />
      </div>
    </div>
  );
}

export default Home;
