'use client';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import type { TreatmentId } from '../data/contracts';
import { Button } from './Button';
export type DialogState =
  | { kind: 'consultation'; treatment?: TreatmentId }
  | { kind: 'login' }
  | { kind: 'information'; title: string; text: string }
  | null;
export function ConsultationDialog({
  state,
  onClose,
  languages,
  initialStep = 'form',
}: {
  state: DialogState;
  onClose: () => void;
  languages: readonly string[];
  initialStep?: 'form' | 'complete';
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const completionHeading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(initialStep);
  useEffect(() => {
    if (step === 'complete') completionHeading.current?.focus();
  }, [step]);
  useEffect(() => {
    const el = dialog.current;
    if (state) {
      setStep(initialStep);
      el?.showModal();
    } else el?.close();
    return () => {
      el?.close();
    };
  }, [state, initialStep]);
  useEffect(() => {
    if (!state) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prior;
    };
  }, [state]);
  return (
    <dialog
      ref={dialog}
      className="consult-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <button className="icon-button dialog-close" aria-label="Close dialog" onClick={onClose}>
          <X />
        </button>
        {state?.kind === 'information' ? (
          <>
            <p className="eyebrow">Apsu</p>
            <h2 id="dialog-title">{state.title}</h2>
            <p>{state.text}</p>
            <Button onClick={onClose}>Got it</Button>
          </>
        ) : state?.kind === 'login' ? (
          <>
            <p className="eyebrow">Patient portal</p>
            <h2 id="dialog-title">Welcome back.</h2>
            <p>
              This is a frontend demonstration. Secure patient login will be connected when the
              backend is available.
            </p>
            <p>No credentials are collected or stored.</p>
            <Button onClick={onClose}>Back to Apsu</Button>
          </>
        ) : step === 'complete' ? (
          <>
            <CheckCircle2 className="success-icon" size={44} />
            <h2 id="dialog-title" ref={completionHeading} tabIndex={-1}>
              You’re ready for the next step.
            </h2>
            <p>
              Your selection is complete. In the live service, you would now begin a private
              consultation with the care team.
            </p>
            <p className="demo-note">
              Demo only — no appointment was booked and no information was sent.
            </p>
            <Button onClick={onClose}>Back to Apsu</Button>
          </>
        ) : (
          <>
            <p className="eyebrow">Care in your language</p>
            <h2 id="dialog-title">Let’s get started.</h2>
            <p>Choose the care you’re looking for.</p>
            <form
              key={state?.kind === 'consultation' ? (state.treatment ?? 'default') : 'closed'}
              onSubmit={(e) => {
                e.preventDefault();
                setStep('complete');
              }}
            >
              <label>
                Treatment
                <select
                  defaultValue={
                    state?.kind === 'consultation'
                      ? (state.treatment ?? 'weight-loss')
                      : 'weight-loss'
                  }
                >
                  <option value="weight-loss">Weight management</option>
                  <option value="birth-control">Birth control</option>
                  <option value="sleep">Sleep</option>
                </select>
              </label>
              <label>
                Preferred language
                <select defaultValue="English">
                  {languages.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </label>
              <p className="demo-note">
                This is a demo. No medical or personal information is collected.
              </p>
              <Button type="submit" arrow>
                Continue
              </Button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
