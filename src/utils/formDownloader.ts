export type FormTemplateId = 'land-consent' | 'power-of-attorney';

interface FormTemplateMeta {
  filename: string;
  html: string;
}

const COMMON_DOC_STYLES = `
  body {
    font-family: "Malgun Gothic", "맑은 고딕", "Noto Sans KR", sans-serif;
    font-size: 10pt;
    line-height: 1.45;
    color: #111111;
    margin: 24px;
  }
  h1 {
    text-align: center;
    font-size: 16pt;
    letter-spacing: 2px;
    margin: 8px 0 14px 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  th, td {
    border: 1px solid #222222;
    padding: 6px 8px;
    vertical-align: middle;
    font-size: 9.5pt;
  }
  th {
    background-color: #f3f4f6;
    font-weight: bold;
    text-align: center;
  }
  .section-title {
    background-color: #e5e7eb;
    font-weight: bold;
    text-align: left;
  }
  .right { text-align: right; }
  .note {
    font-size: 8.5pt;
    color: #333333;
    line-height: 1.5;
  }
  .sign-block {
    margin-top: 18px;
    line-height: 1.8;
  }
`;

function wrapWordHtml(title: string, bodyContent: string): string {
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>${COMMON_DOC_STYLES}</style>
</head>
<body>
${bodyContent}
</body>
</html>`;
}

const FORM_TEMPLATES: Record<FormTemplateId, FormTemplateMeta> = {
  'land-consent': {
    filename: '대지사용승낙서(표준서식).doc',
    html: wrapWordHtml(
      '대지사용승낙서',
      `
      <h1>대 지 사 용 승 낙 서</h1>
      <table>
        <tr><th colspan="4" class="section-title">1. 대상 토지 표시</th></tr>
        <tr>
          <th style="width:20%;">소재지(지번)</th>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <th>지목</th>
          <td style="width:30%;">&nbsp;</td>
          <th>전체 면적(㎡)</th>
          <td style="width:30%;">&nbsp;</td>
        </tr>
        <tr>
          <th>사용승낙 면적(㎡)</th>
          <td colspan="3">&nbsp;</td>
        </tr>
      </table>

      <table>
        <tr><th colspan="4" class="section-title">2. 사용 목적 및 사용승낙기간 (필수 기재)</th></tr>
        <tr>
          <th style="width:20%;">사용 목적</th>
          <td colspan="3">가설건축물 축조신고 (용도 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</td>
        </tr>
        <tr>
          <th>사용승낙기간</th>
          <td colspan="3">20&nbsp;&nbsp;년 &nbsp;&nbsp;월 &nbsp;&nbsp;일 &nbsp;~&nbsp; 20&nbsp;&nbsp;년 &nbsp;&nbsp;월 &nbsp;&nbsp;일까지 (&nbsp;&nbsp;&nbsp;&nbsp;년간)</td>
        </tr>
      </table>

      <table>
        <tr><th colspan="4" class="section-title">3. 사용자(건축주)</th></tr>
        <tr>
          <th style="width:20%;">성명(법인명)</th>
          <td style="width:30%;">&nbsp;</td>
          <th style="width:20%;">생년월일<br/>(법인등록번호)</th>
          <td style="width:30%;">&nbsp;</td>
        </tr>
        <tr>
          <th>주소</th>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <th>연락처</th>
          <td colspan="3">&nbsp;</td>
        </tr>
      </table>

      <div class="sign-block">
        <p>본인 소유의 위 토지에 대하여 상기와 같이 가설건축물 축조 및 존치를 위한 대지 사용을 승낙하며, 이를 증명하기 위하여 인감증명서(또는 본인서명사실확인서)를 첨부하여 제출합니다.</p>
        <p class="right">20&nbsp;&nbsp;&nbsp;&nbsp;년 &nbsp;&nbsp;&nbsp;&nbsp;월 &nbsp;&nbsp;&nbsp;&nbsp;일</p>
      </div>

      <table>
        <tr><th colspan="4" class="section-title">4. 토지소유자(승낙인)</th></tr>
        <tr>
          <th style="width:20%;">성명(법인명)</th>
          <td style="width:30%;">&nbsp;</td>
          <th style="width:20%;">생년월일<br/>(법인등록번호)</th>
          <td style="width:30%;">&nbsp;</td>
        </tr>
        <tr>
          <th>주소</th>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td>&nbsp;</td>
          <th>서명 또는 인감 날인</th>
          <td style="height:40px;" class="right">(인 / 서명)</td>
        </tr>
      </table>

      <table>
        <tr><th class="section-title">필수 유의사항</th></tr>
        <tr>
          <td class="note">
            1. 반드시 가설건축물 존치(또는 연장) 기간 이상의 <strong>사용승낙기간</strong>을 명시하여야 합니다.<br/>
            2. 토지소유자가 <strong>인감을 날인한 경우에는 동일한 인감의 인감증명서</strong>를, <strong>자필 서명한 경우에는 동일한 서명의 본인서명사실확인서</strong>를 반드시 함께 제출하여야 합니다.<br/>
            3. 공유지분 토지인 경우 공유자 전원의 대지사용승낙서 및 인감증명서(또는 본인서명사실확인서)가 필요합니다.
          </td>
        </tr>
      </table>
      `
    ),
  },
  'power-of-attorney': {
    filename: '위임장(가설건축물_축조신고_대리인).doc',
    html: wrapWordHtml(
      '위임장',
      `
      <h1>위 &nbsp;&nbsp; 임 &nbsp;&nbsp; 장</h1>
      <table>
        <tr><th colspan="4" class="section-title">1. 위임하는 사람 (건축주)</th></tr>
        <tr>
          <th style="width:20%;">성명(법인·대표자)</th>
          <td style="width:30%;">&nbsp;</td>
          <th style="width:20%;">생년월일<br/>(법인등록번호)</th>
          <td style="width:30%;">&nbsp;</td>
        </tr>
        <tr>
          <th>주소(소재지)</th>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td colspan="3">&nbsp;</td>
        </tr>
      </table>

      <table>
        <tr><th colspan="4" class="section-title">2. 위임받는 사람 (대리인)</th></tr>
        <tr>
          <th style="width:20%;">성명</th>
          <td style="width:30%;">&nbsp;</td>
          <th style="width:20%;">생년월일</th>
          <td style="width:30%;">&nbsp;</td>
        </tr>
        <tr>
          <th>주소</th>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td>&nbsp;</td>
          <th>위임인과의 관계</th>
          <td>&nbsp;</td>
        </tr>
      </table>

      <table>
        <tr><th colspan="2" class="section-title">3. 위임 내용</th></tr>
        <tr>
          <th style="width:20%;">대상 대지위치</th>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <th>위임 사무</th>
          <td style="height:56px;">
            가설건축물 축조신고(또는 존치기간 연장신고) 신청, 보완 제출 및 신고필증 수령 등 접수 관련 일체 권한
          </td>
        </tr>
      </table>

      <div class="sign-block">
        <p>위와 같이 가설건축물 신고에 관한 사무 일체를 상기 대리인에게 위임합니다.</p>
        <p class="right">20&nbsp;&nbsp;&nbsp;&nbsp;년 &nbsp;&nbsp;&nbsp;&nbsp;월 &nbsp;&nbsp;&nbsp;&nbsp;일</p>
        <p class="right">위임인(건축주) : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (서명 또는 인)</p>
      </div>

      <table>
        <tr><th class="section-title">유의사항</th></tr>
        <tr>
          <td class="note">
            1. 개인 위임 시 위임인의 인감증명서 또는 본인서명사실확인서(날인·서명과 일치) 및 대리인 신분증을 지참하십시오.<br/>
            2. 법인 위임 시 위임장에 법인인감을 날인하고 법인인감증명서(사용인감 시 사용인감계 포함) 및 대리인 신분증·재직증명서를 지참하십시오.
          </td>
        </tr>
      </table>
      `
    ),
  },
};

export function downloadFormTemplate(templateId: FormTemplateId): void {
  const meta = FORM_TEMPLATES[templateId];
  const blob = new Blob(['\ufeff', meta.html], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = meta.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
