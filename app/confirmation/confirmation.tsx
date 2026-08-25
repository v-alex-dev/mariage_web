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

export default function ConfirmationForm({ songs, content }: ConfirmationFormProps) {
  const [state, dispatch] = useActionState(submitRsvp, initialState);
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState<'attendance' | 'song'>('attendance');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [songId, setSongId] = useState<number | null>(null);

  const errors = state.status === 'error' ? state.errors : {};

  const submit = (payload: RsvpInput) => {
    startTransition(() => {
      dispatch(payload);
    });
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null) return;

    if (attending === false) {
      submit({ fullName, email, attending: false, songIds: [] });
      return;
    }
    setStep('song');
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (songId === null) return;
    submit({ fullName, email, attending: true, songIds: [songId] });
  };
}
