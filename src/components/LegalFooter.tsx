import { LEGAL_ARTICLES, REFERENCE_DATE } from '../data/checklistData';

export function LegalFooter() {
  return (
    <footer
      id="legal-basis"
      aria-labelledby="legal-heading"
      className="mt-10 border-t border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2
            id="legal-heading"
            className="text-base font-bold tracking-tight text-slate-900"
          >
            근거 조문 및 기준일
          </h2>
          <p className="text-sm font-semibold text-slate-700 tabular-nums">
            기준일 : {REFERENCE_DATE}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {LEGAL_ARTICLES.map((item) => (
            <div
              key={`${item.law}-${item.article}`}
              className="rounded-lg border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="flex flex-wrap items-baseline gap-x-2 text-sm font-bold text-slate-900">
                <span>{item.law}</span>
                <span className="text-blue-900">{item.article}</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                {item.summary}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-1.5 border-t border-slate-100 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            본 체크리스트의 구비서류는 지자체 건축조례, 대지 여건(국·공유지, 개발제한구역 등) 및 담당 부서 확인 기준에 따라 일부 가감될 수 있습니다.
          </p>
          <p className="shrink-0 tabular-nums">
            법령·실무 기준일 {REFERENCE_DATE}
          </p>
        </div>
      </div>
    </footer>
  );
}
