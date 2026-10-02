'use client';

import { useActionState, useState } from 'react';
import { createGroup, type CreateGroupState } from '../actions';

const initialState: CreateGroupState = { status: 'idle' };

export default function NewGroupForm() {
  const [state, dispatch] = useActionState(createGroup, initialState);
  const [label, setLabel] = useState('');
  const [guestNames, setGuestNames] = useState(['']);

  const updateName = (i: number, value: string) =>
    setGuestNames((prev) => prev.map((n, idx) => (idx === i ? value : n)));
  const addGuest = () => setGuestNames((prev) => [...prev, '']);
  const removeGuest = (i: number) =>
    setGuestNames((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ label, guestNames });
  };

  return (
    <form onSubmit={handleSubmit} className="dashboard-form">
      <h1 className="dashboard-page__title">Nouveau groupe</h1>

      <label className="login-page__field">
        <span>Nom du groupe (usage interne, ex. &quot;Famille Dupont&quot;)</span>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
      </label>

      <fieldset className="dashboard-form__guests">
        <legend>Invités</legend>
        {guestNames.map((name, i) => (
          <div key={i} className="dashboard-form__guest-row">
            <input
              type="text"
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              placeholder="Nom et prénom"
              required
            />
            {guestNames.length > 1 && (
              <button type="button" onClick={() => removeGuest(i)} aria-label="Retirer cet invité">
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addGuest}
          className="customizer-btn customizer-btn--secondary"
        >
          + Ajouter un invité
        </button>
      </fieldset>

      {state.status === 'error' && (
        <p role="alert" aria-live="polite" className="login-page__error">
          {state.message}
        </p>
      )}

      <button type="submit" className="customizer-btn customizer-btn--primary">
        Créer le groupe
      </button>
    </form>
  );
}
