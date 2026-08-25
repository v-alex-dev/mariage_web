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

  // ── Succès ──
  if (state.status === 'success') {
    return (
      <div className="max-w-xl w-full text-center">
        <p
          className="font-serif italic text-lg leading-relaxed"
          style={{ color: 'var(--text-primary)' }}
        >
          {state.attending ? content.success.attending : content.success.notAttending}
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-xl w-full">
      {step === 'attendance' && (
        <form onSubmit={handleStep1Submit} className="flex flex-col gap-6">
          <h1 className="font-serif text-3xl" style={{ color: 'var(--text-primary)' }}>
            {content.step1.title}
          </h1>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest">{content.step1.fullNameLabel}</span>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            {errors.fullName?.map((msg) => (
              <span key={msg} role="alert" className="text-xs text-red-600" aria-live="polite">
                {msg}
              </span>
            ))}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest">{content.step1.emailLabel}</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            {errors.email?.map((msg) => (
              <span key={msg} role="alert" className="text-xs text-red-600" aria-live="polite">
                {msg}
              </span>
            ))}
          </label>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-xs uppercase tracking-widest mb-2">
              {content.step1.attendingLabel}
            </legend>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="attending"
                checked={attending === true}
                onChange={() => setAttending(true)}
              />
              {content.step1.attendingYes}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="attending"
                checked={attending === false}
                onChange={() => setAttending(false)}
              />
              {content.step1.attendingNo}
            </label>
          </fieldset>

          {state.status === 'error' && state.message && (
            <p role="alert" aria-live="polite" className="text-sm text-red-600">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={attending === null || isPending}
            className="customizer-btn customizer-btn--primary"
          >
            {content.step1.submitLabel}
          </button>
        </form>
      )}

      {step === 'song' && (
        <form onSubmit={handleStep2Submit} className="flex flex-col gap-6">
          <h1 className="font-serif text-3xl" style={{ color: 'var(--text-primary)' }}>
            {content.step2.title}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {content.step2.songsLabel}
          </p>
          <p className="text-xs italic">{content.step2.maxSongsHint}</p>

          <fieldset className="flex flex-col gap-2">
            {songs.map((song) => (
              <label key={song.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="song"
                  checked={songId === song.id}
                  onChange={() => setSongId(song.id)}
                />
                {song.title} — {song.artist}
              </label>
            ))}
          </fieldset>

          {errors.songIds?.map((msg) => (
            <span key={msg} role="alert" className="text-xs text-red-600" aria-live="polite">
              {msg}
            </span>
          ))}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep('attendance')}
              className="customizer-btn customizer-btn--secondary"
            >
              {content.step2.backLabel}
            </button>
            <button
              type="submit"
              disabled={songId === null || isPending}
              className="customizer-btn customizer-btn--primary"
            >
              {content.step2.submitLabel}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
