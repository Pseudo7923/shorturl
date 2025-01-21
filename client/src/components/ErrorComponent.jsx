function ErrorComponent({message,className}) {
  // const { message, className } = props;
  return (
    <>
      <div className={`flex items-center justify-start p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-md`+className}>
        <span className="font-semibold mr-2">Error:</span>
        <span>{message}</span>
      </div>
    </>
  );
}

export default ErrorComponent;
