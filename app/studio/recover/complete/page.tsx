import { AcceptInvite } from '@/components/studio/AcceptInvite';

export const metadata = { title: 'Choose a Studio password · Sarah Katerina', robots: { index: false, follow: false } };

export default function Page() { return <AcceptInvite purpose="recovery" />; }
