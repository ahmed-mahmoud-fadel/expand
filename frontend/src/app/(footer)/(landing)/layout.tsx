import ContactForm from "@/components/forms/ContactForm";
import Header from "@/components/Header";
import Footer from '@/components/Footer'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Header />
    <div className='mx-12 md:mx-52 mb-10'>
      {children}
      {/* <ContactForm /> */}
    </div>
    </>
  );
}
 
export default LandingLayout;