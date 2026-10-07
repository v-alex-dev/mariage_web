'use client';

import { useActionState, useState } from 'react';
import { confirmGroup, type ConfirmGroupState } from '../action';
import type { ConfirmationContent } from '@/app/types/content';

interface Song {
  id: number;
  title: string;
  artist: string;
}
interface Guest {
  id: number;
  fullName: string;
  attending: boolean | null;
  songs: { songId: number }[];
}
interface Group {
  id: number;
  label: string | null;
  guests: Guest[];
}
interface GuestAnswer {
  attending: boolean;
  songId: number | null;
}

const initialState: ConfirmGroupState = { status: 'idle' };

export default function ConfirmationForm({
  token,
  group,
  songs,
  content,
}: {
  token: string;
  group: Group;
  songs: Song[];
  content: ConfirmationContent;
}) {
  const [state, dispatch] = useActionState(confirmGroup, initialState);
  const [answers, setAnswers] = useState<Map<number, GuestAnswer>>(
    () =>
      new Map(
        group.guests.map((g) => [
          g.id,
          { attending: g.attending ?? true, songId: g.songs[0]?.songId ?? null },
        ])
      )
  );

  if (state.status === 'success') {
    return <p className="font-serif italic text-lg text-center">{content.success.attending}</p>;
  }

  const update = (guestId: number, patch: Partial<GuestAnswer>) =>
    setAnswers((prev) => new Map(prev).set(guestId, { ...prev.get(guestId)!, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      token,
      guests: group.guests.map((g) => {
        const a = answers.get(g.id)!;
        return { guestId: g.id, attending: a.attending, songId: a.attending ? a.songId : null };
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full flex flex-col gap-8">
      <h1 className="font-serif text-3xl">{content.step1.title}</h1>

      {group.guests.map((guest) => {
        const a = answers.get(guest.id)!;
        return (
          <fieldset key={guest.id} className="flex flex-col gap-3 border-b pb-6">
            <legend className="font-serif text-xl">{guest.fullName}</legend>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={a.attending}
                  onChange={() => update(guest.id, { attending: true })}
                />
                {content.step1.attendingYes}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!a.attending}
                  onChange={() => update(guest.id, { attending: false, songId: null })}
                />
                {content.step1.attendingNo}
              </label>
            </div>

            {a.attending && (
              <div className="flex flex-col gap-1 pl-2">
                <span className="text-xs uppercase tracking-widest">
                  {content.step2.songsLabel}
                </span>
                {songs.map((song) => (
                  <label key={song.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={a.songId === song.id}
                      onChange={() => update(guest.id, { songId: song.id })}
                    />
                    {song.title} — {song.artist}
                  </label>
                ))}
              </div>
            )}
          </fieldset>
        );
      })}

      {state.status === 'error' && (
        <p role="alert" aria-live="polite" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button type="submit" className="customizer-btn customizer-btn--primary">
        {content.step2.submitLabel}
      </button>
    </form>
  );
}
