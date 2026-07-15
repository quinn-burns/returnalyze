"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Modal } from "../shared/overlays";

const ACTION_TYPES = [
  "—",
  "Promote bracketing",
  "Discourage bracketing",
  "Encourage exchange",
  "Improve size guidance",
];

export const SUBMITTED_ACTIONS_KEY = "customer:submittedActions";

export type SubmittedAction = {
  id: string;
  title: string;
  department: string;
  context: string;
  actionType: string;
  owner: string;
  notes: string;
};

type ActionCtx = { context: string; department: string };
const ActionModalContext = createContext<{ open: (c: ActionCtx) => void } | null>(null);

export function useActionModal() {
  const ctx = useContext(ActionModalContext);
  if (!ctx) throw new Error("useActionModal must be used within an ActionModalProvider");
  return ctx;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-neutral-700">
      {label}
      {children}
    </label>
  );
}

export function ActionModalProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<ActionCtx | null>(null);
  const [actionType, setActionType] = useState("—");
  const [owner, setOwner] = useState("");
  const [notes, setNotes] = useState("");

  const open = (c: ActionCtx) => {
    setTarget(c);
    setActionType("—");
    setOwner("");
    setNotes("");
  };
  const close = () => setTarget(null);

  const submit = () => {
    if (!target) return;
    const entry: SubmittedAction = {
      id: `CX-${Date.now().toString().slice(-5)}`,
      title: `${actionType === "—" ? "Action" : actionType} — ${target.department}`,
      department: target.department,
      context: target.context,
      actionType: actionType === "—" ? "" : actionType,
      owner,
      notes,
    };
    try {
      const cur = JSON.parse(localStorage.getItem(SUBMITTED_ACTIONS_KEY) || "[]");
      localStorage.setItem(SUBMITTED_ACTIONS_KEY, JSON.stringify([entry, ...cur]));
    } catch {
      /* localStorage unavailable — ignore */
    }
    close();
  };

  const inputCls =
    "h-11 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600/40";

  return (
    <ActionModalContext.Provider value={{ open }}>
      {children}
      <Modal open={!!target} onClose={close} label="Submit an action">
        {target ? (
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-neutral-800">Submit an action</h1>
                <p className="mt-1 text-sm text-neutral-500">
                  {target.context} ·{" "}
                  <span className="font-semibold text-neutral-800">{target.department}</span>
                </p>
              </div>
              <button type="button" aria-label="Close" onClick={close}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <Field label="Department">
              <input readOnly value={target.department} className={inputCls} />
            </Field>

            <Field label="Action type">
              <div className="relative">
                <select
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  className={`${inputCls} w-full appearance-none pr-9`}
                >
                  {ACTION_TYPES.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1l4 4 4-4" stroke="#8a8a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Field>

            <Field label="Owner">
              <input
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="Assign to…"
                className={inputCls}
              />
            </Field>

            <Field label="Notes">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe the action…"
                rows={4}
                className="resize-none rounded-lg border border-neutral-200 bg-white p-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600/40"
              />
            </Field>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={close}
                className="flex h-10 items-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submit}
                className="flex h-10 items-center rounded-lg bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
              >
                Submit
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </ActionModalContext.Provider>
  );
}
