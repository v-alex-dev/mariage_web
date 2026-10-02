import type { Metadata } from 'next';
import NewGroupForm from './NewGroupForm';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function NewGroupPage() {
  return (
    <main className="dashboard-page">
      <NewGroupForm />
    </main>
  );
}
