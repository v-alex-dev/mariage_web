'use client';

import { useActionState } from 'react';
import { login, type LoginState } from './actions';

const initialState: LoginState = { status: 'idle' };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <main className="login-page">
      <form action={formAction} className="login-page__form">
        <h1 className="login-page__title">Espace privé</h1>

        <label className="login-page__field">
          <span>Identifiant</span>
          <input type="text" name="username" required autoComplete="username" />
        </label>

        <label className="login-page__field">
          <span>Mot de passe</span>
          <input type="password" name="password" required autoComplete="current-password" />
        </label>

        {state.status === 'error' && (
          <p role="alert" aria-live="polite" className="login-page__error">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="customizer-btn customizer-btn--primary"
        >
          {isPending ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </main>
  );
}
