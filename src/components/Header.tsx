import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  onResetAll: () => void;
}

export function Header({ onResetAll }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 sm:text-lg"
        >
          가설건축물 축조신고 접수 체크리스트
        </a>

        <nav
          aria-label="주요 섹션 이동"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <a
            href="#scenario"
            className="whitespace-nowrap shrink-0 py-1 hover:text-slate-900 hover:underline underline-offset-4 transition-colors"
          >
            상황 선택
          </a>
          <a
            href="#checklist"
            className="whitespace-nowrap shrink-0 py-1 hover:text-slate-900 hover:underline underline-offset-4 transition-colors"
          >
            구비서류
          </a>
          <a
            href="#legal-basis"
            className="whitespace-nowrap shrink-0 py-1 hover:text-slate-900 hover:underline underline-offset-4 transition-colors"
          >
            근거 조문
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>조건 초기화</span>
          </button>
        </div>
      </div>
    </header>
  );
}
