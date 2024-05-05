import SignupForm from "@/components/forms/SignupForm";

const SignupPage = () => {
  return (
    <main className="flex flex-col gap-10 items-center w-full">
      <h2>Sign up</h2>
      <SignupForm />
    </main>
  );
}
 
export default SignupPage;