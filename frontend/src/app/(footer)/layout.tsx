import Footer from "@/components/Footer";
import './landing.css'

const FootedLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
 
export default FootedLayout;