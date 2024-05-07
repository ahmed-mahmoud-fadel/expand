import Header from "@/components/Header";
import { cookies } from "next/headers";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const jwt = cookies().get('jwt')

  return (
    <>
    <Header loggedIn={jwt ? true : false} />
    <div className='mx-12 md:mx-52 mb-10'>
      {children}
      {/* <ContactForm /> */}
    </div>
    </>
  );
}
 
export default LandingLayout;