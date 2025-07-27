import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSignInUrl, getSignUpUrl, withAuth } from '@workos-inc/authkit-nextjs';

export default async function AuthPage() {
    const { user } = await withAuth();

    if (user) {
        redirect('/dashboard');
    }

    const signInUrl = await getSignInUrl();
    const signUpUrl = await getSignUpUrl();

    return (
        <>
            <Link href={signInUrl}>Log in</Link>
            <Link href={signUpUrl}>Sign Up</Link>
        </>
    );
}
