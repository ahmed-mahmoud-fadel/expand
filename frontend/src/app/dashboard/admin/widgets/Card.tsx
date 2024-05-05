const Card = ({
  children,
}: {
  children?: React.ReactNode,
}) => {
  return (
    <div className="border h-full p-4 rounded-sm">
      {children}
    </div>
  );
}
 
export default Card;