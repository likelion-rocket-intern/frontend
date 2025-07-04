export const paths = {
  // AUTH
  auth: {
    login: `/login`,
  },

  // ROOT
  root: "/",

  // DASHBOARD
  resume: {
    upload: `/resume/upload`,
    report: (id: string) => `/resume/report/${id}`, // 분석 결과 상세
  },
  aptitude: {
    test: `/aptitude/test`,
    report: (id: string) => `/aptitude/report/${id}`, // 검사 결과 상세
  },
  mypage: `/mypage`, // 마이페이지
};
