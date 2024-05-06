import ContactForm from "@/components/forms/ContactForm";

const ContactUsPage = () => {
  return (
    <main className="flex items-center flex-col py-5 md:py-10 px-0 md:px-24 justify-center gap-5 text-center">
      <h2>We love listening to you!</h2>
      <p className="text-xl">You can contact us by the form provided.</p>
      <ContactForm />
    </main>
  );
}
 
export default ContactUsPage;