/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { ChecklistPanel } from './components/ChecklistPanel';
import { Header } from './components/Header';
import { LegalFooter } from './components/LegalFooter';
import { ScenarioSelector } from './components/ScenarioSelector';
import { CHECKLIST_DOCUMENTS, DEFAULT_SCENARIO } from './data/checklistData';
import { IntakeScenario } from './types/checklist';

export default function App() {
  const [scenario, setScenario] = useState<IntakeScenario>(DEFAULT_SCENARIO);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => new Set());

  const applicableDocs = useMemo(
    () => CHECKLIST_DOCUMENTS.filter((doc) => doc.isApplicable(scenario)),
    [scenario]
  );

  function handleToggle(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleCheckAll() {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      applicableDocs.forEach((doc) => next.add(doc.id));
      return next;
    });
  }

  function handleUncheckAll() {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      applicableDocs.forEach((doc) => next.delete(doc.id));
      return next;
    });
  }

  function handleResetAll() {
    setScenario(DEFAULT_SCENARIO);
    setCheckedIds(new Set());
  }

  return (
    <div id="top" className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header onResetAll={handleResetAll} />

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-6">
          <ScenarioSelector scenario={scenario} onChange={setScenario} />

          <ChecklistPanel
            documents={applicableDocs}
            checkedIds={checkedIds}
            onToggle={handleToggle}
            onCheckAll={handleCheckAll}
            onUncheckAll={handleUncheckAll}
          />
        </div>
      </main>

      <LegalFooter />
    </div>
  );
}
