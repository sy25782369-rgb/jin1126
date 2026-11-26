import { Info } from 'lucide-react';
import {
  ApplicantType,
  IntakeScenario,
  LandOwnership,
  OwnerEntityType,
  ReportType,
} from '../types/checklist';

interface ScenarioSelectorProps {
  scenario: IntakeScenario;
  onChange: (next: IntakeScenario) => void;
}

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
}

const LAND_OPTIONS: SegmentedOption<LandOwnership>[] = [
  { value: 'self', label: '본인' },
  { value: 'other', label: '타인' },
];

const REPORT_OPTIONS: SegmentedOption<ReportType>[] = [
  { value: 'new', label: '신규' },
  { value: 'extension', label: '존치기간 연장' },
];

const OWNER_OPTIONS: SegmentedOption<OwnerEntityType>[] = [
  { value: 'individual', label: '개인' },
  { value: 'corporation', label: '법인' },
];

function SelectorGroup<T extends string>({
  index,
  title,
  value,
  options,
  onSelect,
  helperText,
}: {
  index: string;
  title: string;
  value: T;
  options: SegmentedOption<T>[];
  onSelect: (val: T) => void;
  helperText?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold text-slate-500">
          {index} {title}
        </span>
      </div>
      <div
        role="group"
        aria-label={title}
        className="grid grid-cols-2 gap-1.5 rounded-lg bg-slate-100 p-1"
      >
        {options.map((opt) => {
          const isActive = value === opt.value;
          const isDisabled = Boolean(opt.disabled);
          return (
            <button
              key={opt.value}
              type="button"
              disabled={isDisabled}
              aria-pressed={isActive}
              aria-disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) onSelect(opt.value);
              }}
              className={`min-h-[40px] rounded-md px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-800 ${
                isDisabled
                  ? 'cursor-not-allowed text-slate-400 bg-slate-100/60'
                  : isActive
                    ? 'cursor-pointer bg-blue-900 text-white shadow-xs'
                    : 'cursor-pointer text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {helperText && (
        <p className="text-[11px] leading-snug font-medium text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

export function ScenarioSelector({ scenario, onChange }: ScenarioSelectorProps) {
  const isCorporation = scenario.ownerEntityType === 'corporation';

  const applicantOptions: SegmentedOption<ApplicantType>[] = [
    { value: 'self', label: '본인', disabled: isCorporation },
    { value: 'agent', label: '대리인' },
  ];

  function handleOwnerChange(ownerEntityType: OwnerEntityType) {
    if (ownerEntityType === 'corporation') {
      onChange({
        ...scenario,
        ownerEntityType,
        applicantType: 'agent',
      });
    } else {
      onChange({
        ...scenario,
        ownerEntityType,
      });
    }
  }

  const advisories: string[] = [];
  if (scenario.reportType === 'extension') {
    advisories.push(
      '존치기간 연장신고는 만료일 7일 전까지 접수해야 합니다 (건축법 시행령 제15조의2 제2항).'
    );
  }
  if (scenario.landOwnership === 'other') {
    advisories.push(
      '타인 소유 대지는 토지소유자의 사용승낙 기간이 가설건축물 존치(연장) 기간 이상이어야 합니다.'
    );
  }
  if (isCorporation) {
    advisories.push(
      '법인은 자연인이 아니므로 본인 신청이 불가하며, 신청인 유형이 대리인(임직원·건축사 등)으로 자동 지정됩니다.'
    );
  }

  return (
    <section
      id="scenario"
      aria-labelledby="scenario-heading"
      className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h1
            id="scenario-heading"
            className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl text-balance"
          >
            접수 상황 선택
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            아래 4가지 조건을 선택하면 상황에 맞는 필요 구비서류가 즉시 표시됩니다.
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 sm:mt-0">
          <span>건축법 제20조 제3항</span>
          <span aria-hidden="true">·</span>
          <span>시행규칙 제13조</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SelectorGroup
          index="①"
          title="대지 소유"
          value={scenario.landOwnership}
          options={LAND_OPTIONS}
          onSelect={(landOwnership) => onChange({ ...scenario, landOwnership })}
        />
        <SelectorGroup
          index="②"
          title="신고 종류"
          value={scenario.reportType}
          options={REPORT_OPTIONS}
          onSelect={(reportType) => onChange({ ...scenario, reportType })}
        />
        <SelectorGroup
          index="③"
          title="신청인"
          value={scenario.applicantType}
          options={applicantOptions}
          onSelect={(applicantType) => onChange({ ...scenario, applicantType })}
          helperText={
            isCorporation
              ? '법인 선택 시 대리인만 선택 가능'
              : undefined
          }
        />
        <SelectorGroup
          index="④"
          title="건축주 유형"
          value={scenario.ownerEntityType}
          options={OWNER_OPTIONS}
          onSelect={handleOwnerChange}
        />
      </div>

      {advisories.length > 0 && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <div className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-blue-800"
              aria-hidden="true"
            />
            <div className="space-y-1">
              {advisories.map((note, idx) => (
                <p key={idx}>{note}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
