'use client';

import { useActionState, useState, useTransition } from 'react';
import { submitRsvp, type RsvpActionState, type RsvpInput } from './actions';
import type { ConfirmationContent } from '@/app/types/content';

interface Song {
  id: number;
  title: string;
  artist: string;
}

interface ConfirmationFormProps {
  songs: Song[];
  content: ConfirmationContent;
}

export default function ConfirmationForm({ songs, content }: ConfirmationFormProps) {}
