function SystemDesign() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">System Design Diagram</h1>
      <div className="flex justify-center bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4">
        <img 
          src="/static/images/url_shortner.png" 
          alt="System Design Diagram" 
          className="rounded-md border-2 border-gray-300 shadow-md"
        />
      </div>
    </div>
  );
}

export default SystemDesign;
