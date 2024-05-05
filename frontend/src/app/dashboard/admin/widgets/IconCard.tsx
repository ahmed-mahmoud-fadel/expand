import React from "react";
import Card from "./Card";

const IconCard = ({
  icon,
  title,
  data,
}: {
  icon: React.ReactNode,
  title: string,
  data: number,
}) => {
  return (
    <Card>
      <div className="h-full flex flex-col justify-between">
        <p className="text-4xl">
          {icon}
        </p>
        <p>{title}</p>
        <p className="text-3xl font-bold">{data}</p>
      </div>
    </Card>
  );
}
 
export default IconCard;