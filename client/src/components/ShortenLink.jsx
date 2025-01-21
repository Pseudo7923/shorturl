import copy from "copy-to-clipboard";
import { LuClipboardCopy } from "react-icons/lu";

function ShortenLink(props) {
  const { data } = props;

  const copyToClipboard = (value) => {
    let copyText = "http://localhost:5000/" + value;
    let isCopy = copy(copyText);
    if (isCopy) {
      alert(`Short URL Copied: ${copyText}`);
    }
  };

  return (
    <>
      <h1 className="self-center text-2xl font-semibold text-gray-800 mb-6">Shorten Links</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg border bg-white p-4">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border-b py-2 px-4 text-left">Long URL</th>
              <th className="border-b py-2 px-4 text-left">Short URL</th>
              <th className="border-b py-2 px-4 text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            {!data ? (
              <tr key="loading" className="bg-gray-100">
                <td className="border-b py-2 px-4">Loading...</td>
                <td className="border-b py-2 px-4 text-center text-red-600">
                  Loading...
                  <button onClick={() => copyToClipboard("loading")}>
                    <LuClipboardCopy className="cursor-pointer text-xl text-gray-600 transition-all ease-in hover:scale-110" />
                  </button>
                </td>
                <td className="border-b py-2 px-4 text-center">Loading...</td>
              </tr>
            ) : (
              data.reverse().map((dataItem) => (
                <tr key={dataItem.id} className="bg-gray-100">
                  <td className="border-b py-2 px-4">{dataItem.longurl}</td>
                  <td className="border-b py-2 px-4 text-center text-blue-600">
                    <a
                      href={`http://localhost:5000/${dataItem.shorturlid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {dataItem.shorturlid}
                    </a>
                    <button
                      onClick={() => copyToClipboard(dataItem.shorturlid)}
                      className="ml-2 text-xl text-gray-600 hover:text-gray-800"
                    >
                      <LuClipboardCopy className="cursor-pointer transition-all ease-in hover:scale-110" />
                    </button>
                  </td>
                  <td className="border-b py-2 px-4 text-center">{dataItem.count}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShortenLink;
