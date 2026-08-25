import type { Metadata } from 'next';
import { prisma } from '@/app/lib/db';
import { CONFIRMATION } from '@/app/content/confirmation';
import ConfirmationForm from './ConfirmationForm';

export const metadata: Metadata = {
  title: CONFIRMATION.seo.title,
  description: CONFIRMATION.seo.description,
};
