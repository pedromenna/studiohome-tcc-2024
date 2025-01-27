import { SignUp } from "@clerk/nextjs";

type SignUpPageProps = {
  searchParams: {
    redirectUrl: string;
  };
};

export default function SignUpPage({
  searchParams: { redirectUrl },
}: SignUpPageProps) {
  return (
    <section className='full-height'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-center'>
          <SignUp signInUrl='/sign-in' redirectUrl={redirectUrl} />
        </div>
      </div>
    </section>
  );
}
