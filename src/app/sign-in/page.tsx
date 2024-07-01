import { SignIn } from "@clerk/nextjs";

type SignInPageProps = {
  searchParams: {
    redirectUrl: string;
  };
};

export default function SignInPage({
  searchParams: { redirectUrl },
}: SignInPageProps) {
  return (
    <section className='full-height'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-center'>
          <SignIn signUpUrl='/sign-up' redirectUrl={redirectUrl} />
        </div>
      </div>
    </section>
  );
}
