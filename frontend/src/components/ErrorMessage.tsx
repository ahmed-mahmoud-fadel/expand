const ErrorMessage = ({
  message
}: {
  message?: string 
}) => {
  return (
    <>
    {
      message &&
      <div className="text-red-600 font-bold">
        {message}
      </div>
    }
    </>
  );
}
 
export default ErrorMessage;