import {
  AlertTriangle,
  Check,
  CheckSquare,
  CircleDashed,
  Download,
  ExternalLink,
  FileText,
  Square,
} from 'lucide-react';
import { ChecklistDocument } from '../types/checklist';
import { downloadFormTemplate } from '../utils/formDownloader';

interface ChecklistPanelProps {
  documents: ChecklistDocument[];
  checkedIds: Set<string>;
  onToggle: (id: string) => void;
  onCheckAll: () => void;
  onUncheckAll: () => void;
}

function DocumentRow({
  doc,
  isChecked,
  onToggle,
}: {
  doc: ChecklistDocument;
  isChecked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div
      className={`flex items-start gap-3.5 px-5 py-4 transition-colors hover:bg-slate-50/90 ${
        isChecked ? 'bg-slate-50/50' : 'bg-white'
      }`}
    >
      <label
        htmlFor={`doc-${doc.id}`}
        className="relative mt-0.5 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center"
      >
        <input
          id={`doc-${doc.id}`}
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggle(doc.id)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
            isChecked
              ? 'border-blue-900 bg-blue-900 text-white'
              : 'border-slate-300 bg-white text-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-blue-800'
          }`}
        >
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
        </span>
      </label>

      <div className="min-w-0 flex-1">
        <label htmlFor={`doc-${doc.id}`} className="block cursor-pointer">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span
              className={`text-[15px] font-semibold leading-snug ${
                isChecked
                  ? 'text-slate-500 line-through decoration-slate-300'
                  : 'text-slate-900'
              }`}
            >
              {doc.title}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold shrink-0 ${
                isChecked ? 'text-emerald-700' : 'text-slate-500'
              }`}
            >
              {isChecked ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>준비 완료</span>
                </>
              ) : (
                <>
                  <CircleDashed className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>준비 필요</span>
                </>
              )}
            </span>
          </div>

          <p className="mt-1 text-xs font-medium text-slate-500">
            {doc.legalBasis}
          </p>

          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            {doc.description}
          </p>
        </label>

        {doc.importantNotice && (
          <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs leading-relaxed font-semibold text-amber-950">
            <AlertTriangle
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700"
              aria-hidden="true"
            />
            <span>{doc.importantNotice}</span>
          </div>
        )}

        {doc.officialFormFiles && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href={doc.officialFormFiles.hwpUrl}
              download={doc.officialFormFiles.hwpFilename}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-blue-900/20 bg-blue-50/80 px-3 py-1.5 text-xs font-semibold text-blue-900 hover:bg-blue-100/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>최신 법정서식 다운로드 (.hwp)</span>
            </a>

            <a
              href={doc.officialFormFiles.pdfUrl}
              download={doc.officialFormFiles.pdfFilename}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              <span>PDF 원본 다운로드 (.pdf)</span>
            </a>

            <span className="text-xs text-slate-500">
              {doc.officialFormFiles.versionNote}
            </span>
          </div>
        )}

        {doc.formTemplateId && (
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => downloadFormTemplate(doc.formTemplateId!)}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{doc.formDownloadLabel ?? '표준서식 다운로드 (.doc)'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ChecklistPanel({
  documents,
  checkedIds,
  onToggle,
  onCheckAll,
  onUncheckAll,
}: ChecklistPanelProps) {
  const totalCount = documents.length;
  const checkedCount = documents.filter((d) => checkedIds.has(d.id)).length;
  const remainingCount = totalCount - checkedCount;

  return (
    <section
      id="checklist"
      aria-labelledby="checklist-heading"
      className="flex flex-col gap-6"
    >
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="checklist-heading"
              className="text-lg font-bold tracking-tight text-slate-900"
            >
              구비서류
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 tabular-nums">
              <span>
                전체 <strong className="font-semibold text-slate-900">{totalCount}건</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                준비 완료{' '}
                <strong className="font-semibold text-emerald-700">{checkedCount}건</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                남은 서류{' '}
                <strong
                  className={`font-semibold ${
                    remainingCount > 0 ? 'text-blue-900' : 'text-slate-700'
                  }`}
                >
                  {remainingCount}건
                </strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onCheckAll}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <CheckSquare className="h-3.5 w-3.5" aria-hidden="true" />
              <span>전체 확인</span>
            </button>
            <button
              type="button"
              onClick={onUncheckAll}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Square className="h-3.5 w-3.5" aria-hidden="true" />
              <span>전체 해제</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {documents.map((doc) => (
            <DocumentRow
              key={doc.id}
              doc={doc}
              isChecked={checkedIds.has(doc.id)}
              onToggle={onToggle}
            />
          ))}
        </div>

        <div className="flex flex-col gap-1.5 border-t border-slate-200 bg-slate-50/70 px-5 py-3 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            별지 서식(.hwp / .pdf)은 국가법령정보센터(시행 2026. 2. 27.) 최신 공식 원본 파일입니다.
          </span>
          <a
            href="https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B1%B4%EC%B6%95%EB%B2%95%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-blue-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            <span>국가법령정보센터 바로가기</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
