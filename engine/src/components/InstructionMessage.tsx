const InstructionMessage = ({
  message,
}: {
  message: string,
}) => {
  return (
    <div
    style={{
      textAlign: "center",
      color: "white",
      backgroundColor: "#fff2",
      fontSize: "3rem",
      fontFamily: "sans-serif",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      height: '100%',
      width: "100%",
    }}
    >
      {message}
    </div>
  );
}
 
export default InstructionMessage;