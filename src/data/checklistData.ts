import { ChecklistDocument, IntakeScenario, LegalArticle } from '../types/checklist';

export const REFERENCE_DATE = '2026년 11월 25일 (건축법 시행규칙 2026. 2. 27. 시행 기준)';

export const DEFAULT_SCENARIO: IntakeScenario = {
  landOwnership: 'self',
  reportType: 'new',
  applicantType: 'self',
  ownerEntityType: 'individual',
};

export const CHECKLIST_DOCUMENTS: ChecklistDocument[] = [
  {
    id: 'stat-new-application',
    title: '가설건축물 축조신고서 (별지 제8호서식)',
    legalBasis: '건축법 시행규칙 제13조 제1항 (시행 2026. 2. 27., 국토교통부령 제1567호)',
    description:
      '건축주 인적사항, 대지위치, 가설건축물의 구조·용도·면적·존치기간(3년 이내)을 빠짐없이 기재하고 서명 또는 날인하여야 합니다.',
    officialFormFiles: {
      hwpUrl: '/forms/form8_new_report.hwp',
      hwpFilename: '[별지 제8호서식] 가설건축물 축조신고서(건축법 시행규칙).hwp',
      pdfUrl: '/forms/form8_new_report.pdf',
      pdfFilename: '[별지 제8호서식] 가설건축물 축조신고서(건축법 시행규칙).pdf',
      versionNote: '국가법령정보센터 최신 원본 (시행 2026. 2. 27.)',
    },
    isApplicable: (s) => s.reportType === 'new',
  },
  {
    id: 'stat-extension-application',
    title: '가설건축물 존치기간 연장신고서 (별지 제11호서식)',
    legalBasis: '건축법 시행령 제15조의2 제2항 · 시행규칙 제13조 (시행 2026. 2. 27., 국토교통부령 제1567호)',
    description:
      '존치기간 만료일 7일 전까지 제출하여야 하며, 종전 신고번호·건축주·연장 희망 기간·연장사유를 정확히 기재하여 서명 또는 날인합니다.',
    officialFormFiles: {
      hwpUrl: '/forms/form11_extension_report.hwp',
      hwpFilename: '[별지 제11호서식] 가설건축물 존치기간 연장신고서(건축법 시행규칙).hwp',
      pdfUrl: '/forms/form11_extension_report.pdf',
      pdfFilename: '[별지 제11호서식] 가설건축물 존치기간 연장신고서(건축법 시행규칙).pdf',
      versionNote: '국가법령정보센터 최신 원본 (시행 2026. 2. 27.)',
    },
    isApplicable: (s) => s.reportType === 'extension',
  },
  {
    id: 'stat-site-plan',
    title: '배치도',
    legalBasis: '건축법 시행규칙 제13조 제1항 제1호',
    description:
      '건축물대장 배치도(현황도)에 가설건축물의 위치·치수·대지경계선 및 인접 도로로부터의 이격거리를 표기하여 제출합니다. (대지 내 기존 건축물이 없는 나대지인 경우 대지경계선과 도로 현황을 기준으로 작성)',
    isApplicable: (s) => s.reportType === 'new',
  },
  {
    id: 'stat-floor-plan',
    title: '평면도',
    legalBasis: '건축법 시행규칙 제13조 제1항 제2호',
    description:
      '각 층별 평면 구획, 출입구 위치, 세부 용도 및 바닥면적 산출 근거(가로×세로 치수)가 명확히 표시되어야 합니다.',
    isApplicable: (s) => s.reportType === 'new',
  },
  {
    id: 'stat-land-consent',
    title: '대지사용승낙서 (타인 소유 대지)',
    legalBasis: '건축법 시행규칙 제13조 제1항 제3호',
    description:
      '토지소유자(공유지분인 경우 공유자 전원)가 작성한 대지사용승낙서를 제출합니다.',
    importantNotice:
      '필수 확인: ① 승낙서 상에 가설건축물 존치(또는 연장) 기간 이상의 「사용승낙기간」을 반드시 명시해야 하며, ② 승낙서에 날인한 인감 또는 자필 서명은 함께 제출하는 인감증명서(또는 본인서명사실확인서)와 반드시 일치하여야 합니다.',
    formTemplateId: 'land-consent',
    formDownloadLabel: '대지사용승낙서 표준서식 (.doc)',
    isApplicable: (s) => s.landOwnership === 'other',
  },
  {
    id: 'prac-land-owner-verify',
    title: '토지소유자 인감증명서 또는 본인서명사실확인서',
    legalBasis: '대지사용승낙서 날인·서명 진위 확인',
    description:
      '토지소유자가 법인인 경우 법인인감증명서를 제출합니다.',
    importantNotice:
      '필수 일치: 대지사용승낙서에 날인한 인감과 동일한 인감의 「인감증명서」 또는 승낙서에 자필 서명한 서명과 동일한 「본인서명사실확인서」를 제출하여야 합니다.',
    isApplicable: (s) => s.landOwnership === 'other',
  },
  {
    id: 'prac-site-photos',
    title: '가설건축물 현황 사진 (전·후·좌·우 및 내부 전경)',
    legalBasis: '건축법 시행규칙 별지 제11호서식 (제출일 전 1개월 이내 촬영)',
    description:
      '신고서 제출일 이전 1개월 이내에 촬영한 가설건축물의 전·후·좌·우 측면 및 내부 전경 사진을 제출하여 무단 증축·용도변경 여부를 확인합니다.',
    isApplicable: (s) => s.reportType === 'extension',
  },
  {
    id: 'stat-power-of-attorney',
    title: '위임장 (대리인 신청)',
    legalBasis: '민원 처리에 관한 법률 시행규칙',
    description:
      '위임인(건축주)의 서명 또는 날인(법인인 경우 법인인감 날인), 수임인의 성명·연락처, 위임 사무 내용(신고 및 필증 수령 등)이 기재되어야 합니다.',
    formTemplateId: 'power-of-attorney',
    formDownloadLabel: '위임장 표준서식 (.doc)',
    isApplicable: (s) => s.applicantType === 'agent',
  },
  {
    id: 'prac-owner-id-individual',
    title: '신청인(건축주) 신분증 사본',
    legalBasis: '신청인 본인 확인',
    description:
      '방문 또는 비대면 접수 시 개인 건축주 본인의 신분을 확인하기 위한 신분증 사본(주민등록증·운전면허증·여권 등)입니다.',
    isApplicable: (s) =>
      s.applicantType === 'self' && s.ownerEntityType === 'individual',
  },
  {
    id: 'prac-owner-verify-agent-individual',
    title: '위임인(건축주) 인감증명서 또는 본인서명사실확인서',
    legalBasis: '위임 사실 진위 확인',
    description:
      '대리인 접수 시 개인 건축주가 적법하게 위임하였음을 확인하기 위한 인감증명서(또는 본인서명사실확인서)입니다. 위임장에 날인한 인감 또는 서명과 일치하여야 합니다.',
    isApplicable: (s) =>
      s.applicantType === 'agent' && s.ownerEntityType === 'individual',
  },
  {
    id: 'prac-agent-id',
    title: '대리인 신분증 사본 (법인·사무소 소속 시 재직증명서 포함)',
    legalBasis: '대리인 본인 및 소속 확인',
    description:
      '접수 창구 방문자(수임인)의 본인 확인을 위한 신분증 사본이며, 법인 임직원이나 건축사사무소 직원이 대리하는 경우 재직증명서를 함께 확인합니다.',
    isApplicable: (s) => s.applicantType === 'agent',
  },
  {
    id: 'prac-corp-seal',
    title: '법인인감증명서 (사용인감 날인 시 사용인감계 첨부)',
    legalBasis: '법인 인감 진위 확인',
    description:
      '신고서 및 위임장에 날인된 법인 인장의 진위 여부를 대조하기 위해 제출하며, 사용인감을 사용한 경우 사용인감계를 반드시 첨부합니다.',
    isApplicable: (s) => s.ownerEntityType === 'corporation',
  },
];

export const LEGAL_ARTICLES: LegalArticle[] = [
  {
    law: '건축법',
    article: '제20조 제3항',
    summary:
      '재해복구, 흥행, 전람회, 공사용 가설건축물 등 대통령령으로 정하는 용도의 가설건축물을 축조하려는 자는 존치기간, 설치 기준 및 절차에 따라 시장·군수·구청장에게 신고한 후 착공하여야 함.',
  },
  {
    law: '건축법 시행령',
    article: '제15조',
    summary:
      '신고대상 가설건축물의 종류(임시사무실·창고·컨테이너 등), 구조 요건 및 존치기간(3년 이내, 공사용 가설건축물은 해당 공사 완료일까지)의 범위를 정함.',
  },
  {
    law: '건축법 시행령',
    article: '제15조의2 제2항',
    summary:
      '신고대상 가설건축물의 존치기간을 연장하려는 경우, 존치기간 만료일 7일 전까지 특별자치시장·특별자치도지사 또는 시장·군수·구청장에게 연장신고하여야 함.',
  },
  {
    law: '건축법 시행규칙',
    article: '제13조 (시행 2026. 2. 27., 국토교통부령 제1567호)',
    summary:
      '축조신고 시 가설건축물 축조신고서(별지 제8호서식)·배치도·평면도 및 대지사용승낙서(타인 소유 대지)를, 존치기간 연장 시 연장신고서(별지 제11호서식)를 제출하도록 규정함.',
  },
];
