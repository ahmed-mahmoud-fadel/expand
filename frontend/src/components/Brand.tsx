import Image from "next/image";
import icon from '@/global/img/icon.png'

const Brand = ({
  size = 1
}: {
  size?: number
}) => {
  return (
    <div className="brand-name flex text-lg md:text-3xl items-center gap-1" style={{scale: size}}>
      E<Image src={icon} className="w-4 h-4 md:w-8 md:h-8" alt="" />PAND
    </div>
  );
}
 
export default Brand;