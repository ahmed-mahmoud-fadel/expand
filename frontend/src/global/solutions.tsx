import { IoGlassesOutline } from "react-icons/io5";
import { GiConverseShoe } from "react-icons/gi";
import { FiWatch } from "react-icons/fi";

const solutions: {
  name: string,
  icon: JSX.Element,
}[] = [
  {
    name: "Glasses",
    icon: <IoGlassesOutline />,
  },
  {
    name: "Watches",
    icon: <FiWatch />,
  },
  {
    name: "Shoes",
    icon: <GiConverseShoe />,
  },
]

export default solutions