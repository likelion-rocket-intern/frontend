export interface JobInfo {
  code: string;
  name: string;
  etc: string;
  grp: string;
}

export interface ValueRealm {
  no: string;
  code: string;
  name: string;
  dc: string;
  choice: string;
  life: string;
  class: string;
}

export interface Report6Data {
  realms: ValueRealm[];
}

export interface TestReport {
  inspctseq: string;
  qestnrseq: string;
  origin: null;
  mbrno: string;
  gender: null;
  gendercd: null;
  target: string;
  targetcd: string;
  name: null;
  loginid: null;
  grade: null;
  school: null;
  email: null;
  comptdtm: string;
  code1: string;
  code1nm: string;
  w1: number;
  code2: string;
  code2nm: string;
  w2: number;
  code3: string;
  code3nm: string;
  w3: number;
  code4: string;
  code4nm: string;
  w4: number;
  code5: string;
  code5nm: string;
  w5: number;
  code6: string;
  code6nm: string;
  w6: number;
  code7: string;
  code7nm: string;
  w7: number;
  code8: string;
  code8nm: string;
  w8: number;
  jobs: JobInfo[];
  majors: JobInfo[];
  report6_data: Report6Data;
}

export const mockTestReport: TestReport = {
  inspctseq: "77795990",
  qestnrseq: "6",
  origin: null,
  mbrno: "0",
  gender: null,
  gendercd: null,
  target: "대학생",
  targetcd: "100208",
  name: null,
  loginid: null,
  grade: null,
  school: null,
  email: null,
  comptdtm: "2025-07-09T06:42:41.000+00:00",
  code1: "100320",
  code1nm: "자기계발",
  w1: 4.0,
  code2: "100316",
  code2nm: "보수",
  w2: 4.0,
  code3: "100319",
  code3nm: "사회봉사",
  w3: 4.0,
  code4: "100314",
  code4nm: "능력발휘",
  w4: 4.0,
  code5: "100321",
  code5nm: "창의성",
  w5: 3.0,
  code6: "100317",
  code6nm: "안정성",
  w6: 3.0,
  code7: "100318",
  code7nm: "사회적 인정",
  w7: 3.0,
  code8: "100315",
  code8nm: "자율성",
  w8: 3.0,
  jobs: [
    {
      code: "366",
      name: "레크리에이션지도자",
      etc: "2",
      grp: "고졸"
    },
    {
      code: "205",
      name: "노무사",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "262",
      name: "기자",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "407",
      name: "직업군인",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "374",
      name: "변리사",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "362",
      name: "일반공무원",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "359",
      name: "경찰관",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "271",
      name: "아나운서",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "1080",
      name: "환경공학기술자",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "1068",
      name: "마케팅전문가",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "240",
      name: "증권중개인",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "375",
      name: "변호사",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "281",
      name: "개그맨",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "834",
      name: "시스템소프트웨어개발자",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "1279",
      name: "헤드헌터",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "244",
      name: "금융자산운용가(펀드매니저)",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "414",
      name: "판사",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "37",
      name: "한의사",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "270",
      name: "성우",
      etc: "4",
      grp: "대졸"
    },
    {
      code: "950",
      name: "투자분석가(애널리스트)",
      etc: "5",
      grp: "대학원졸"
    },
    {
      code: "20",
      name: "심리학연구원 ",
      etc: "5",
      grp: "대학원졸"
    },
    {
      code: "25",
      name: "전문의사",
      etc: "5",
      grp: "대학원졸"
    },
    {
      code: "1103",
      name: "교육학연구원",
      etc: "5",
      grp: "대학원졸"
    },
    {
      code: "408",
      name: "직업상담 및 취업알선원",
      etc: "5",
      grp: "대학원졸"
    },
    {
      code: "34",
      name: "치과의사",
      etc: "5",
      grp: "대학원졸"
    },
    {
      code: "995",
      name: "에너지공학기술자",
      etc: "5",
      grp: "대학원졸"
    }
  ],
  majors: [
    {
      code: "407",
      name: "직업군인",
      etc: "0",
      grp: "계열무관"
    },
    {
      code: "20",
      name: "심리학연구원 ",
      etc: "1",
      grp: "인문"
    },
    {
      code: "270",
      name: "성우",
      etc: "1",
      grp: "인문"
    },
    {
      code: "205",
      name: "노무사",
      etc: "2",
      grp: "사회"
    },
    {
      code: "950",
      name: "투자분석가(애널리스트)",
      etc: "2",
      grp: "사회"
    },
    {
      code: "359",
      name: "경찰관",
      etc: "2",
      grp: "사회"
    },
    {
      code: "408",
      name: "직업상담 및 취업알선원",
      etc: "2",
      grp: "사회"
    },
    {
      code: "271",
      name: "아나운서",
      etc: "2",
      grp: "사회"
    },
    {
      code: "362",
      name: "일반공무원",
      etc: "2",
      grp: "사회"
    },
    {
      code: "374",
      name: "변리사",
      etc: "2",
      grp: "사회"
    },
    {
      code: "1068",
      name: "마케팅전문가",
      etc: "2",
      grp: "사회"
    },
    {
      code: "240",
      name: "증권중개인",
      etc: "2",
      grp: "사회"
    },
    {
      code: "375",
      name: "변호사",
      etc: "2",
      grp: "사회"
    },
    {
      code: "1279",
      name: "헤드헌터",
      etc: "2",
      grp: "사회"
    },
    {
      code: "244",
      name: "금융자산운용가(펀드매니저)",
      etc: "2",
      grp: "사회"
    },
    {
      code: "414",
      name: "판사",
      etc: "2",
      grp: "사회"
    },
    {
      code: "262",
      name: "기자",
      etc: "2",
      grp: "사회"
    },
    {
      code: "1103",
      name: "교육학연구원",
      etc: "3",
      grp: "교육"
    },
    {
      code: "374",
      name: "변리사",
      etc: "4",
      grp: "공학"
    },
    {
      code: "834",
      name: "시스템소프트웨어개발자",
      etc: "4",
      grp: "공학"
    },
    {
      code: "995",
      name: "에너지공학기술자",
      etc: "4",
      grp: "공학"
    },
    {
      code: "1080",
      name: "환경공학기술자",
      etc: "5",
      grp: "자연"
    },
    {
      code: "34",
      name: "치과의사",
      etc: "6",
      grp: "의학"
    },
    {
      code: "37",
      name: "한의사",
      etc: "6",
      grp: "의학"
    },
    {
      code: "25",
      name: "전문의사",
      etc: "6",
      grp: "의학"
    },
    {
      code: "281",
      name: "개그맨",
      etc: "7",
      grp: "예체능"
    },
    {
      code: "366",
      name: "레크리에이션지도자",
      etc: "7",
      grp: "예체능"
    }
  ],
  report6_data: {
    realms: [
      {
        no: "1",
        code: "100314",
        name: "능력발휘",
        dc: "나의 능력을 충분히 발휘할 수 있을 때 보람과 만족을 느낍니다.",
        choice: "나는 나의 능력을 충분히 발휘할 수 있는 기회와 가능성이 주어지는 직업을 선택할 것입니다.",
        life: "직업생활에서의 경쟁은 나를 도전적으로 만들어주고, 어려운 일을 하나씩 해결해 나가는 과정에서 성취감을 느낄 것 입니다.",
        class: "values_ability"
      },
      {
        no: "2",
        code: "100315",
        name: "자율성",
        dc: "나는 어떤 일을 할 때 규칙, 절차, 시간 등을 스스로 결정하길 원합니다.",
        choice: "나는 다른 것보다 일하는 방식과 스타일이 자유로운 직업을 선택할 것입니다.",
        life: "나만의 방식에 맞게 자율적으로 일할 때 나의 능력을 더욱 효과적으로 발휘할 수 있습니다.",
        class: "values_free"
      },
      {
        no: "3",
        code: "100316",
        name: "보수",
        dc: "나의 충분한 경제적 보상이 매우 중요하다고 생각합니다.",
        choice: "나의 노력과 성과에 대해 충분한 경제적 보상이 주어지는 직업을 선택할 것입니다.",
        life: "충분한 보수를 받는다면 일의 어려움과 힘겨움에 관계없이 최선을 다해 노력할 것입니다.",
        class: "values_pay"
      },
      {
        no: "4",
        code: "100317",
        name: "안정성",
        dc: "나는 매사가 계획한대로 안정적으로 유지되는 것을 좋아합니다.",
        choice: "나는 쉽게 해고되지 않고 오랫동안 일할 수 있는 직업을 선택할 것입니다.",
        life: "안정적인 직업생활이 보장된다면 편안한 마음으로 더욱 열심히 일을 할 것입니다.",
        class: "values_stability"
      },
      {
        no: "5",
        code: "100318",
        name: "사회적 인정",
        dc: "나는 다른 사람들로부터 나의 능력과 성취를 충분히 인정받고 싶어합니다.",
        choice: "나는 많은 사람들로부터 주목받고 인정받을 수 있는 직업을 선택할 것입니다.",
        life: "주변사람들이 나를 긍정적으로 평가하면 나의 능력발휘에 더욱 도움이 될 것입니다.",
        class: "values_social"
      },
      {
        no: "6",
        code: "100319",
        name: "사회봉사",
        dc: "나는 다른 사람을 돕고 더 나은 세상을 만들고 싶습니다.",
        choice: "나는 사람, 조직, 국가, 인류에 대한 봉사와 기여가 가능한 직업을 선택할 것입니다.",
        life: "도움과 격려가 필요한 사람들에게 힘을 줄 수 있는 직업생활을 할 때 가치와 보람을 느낄 것입니다.",
        class: "values_social_service"
      },
      {
        no: "7",
        code: "100320",
        name: "자기계발",
        dc: "나는 항상 새로운 것을 배우고 스스로 발전해 나갈 때 만족을 느낍니다.",
        choice: "나는 나의 능력과 소질을 지속적으로 발전시킬 수 있는 직업을 선택할 것입니다.",
        life: "나 스스로가 발전할 수 있는 기회가 충분히 주어지는 직업생활을 할 때 만족감을 느낄 것입니다.",
        class: "values_self"
      },
      {
        no: "8",
        code: "100321",
        name: "창의성",
        dc: "나는 예전부터 해오던 것 보다는 새로운 것을 만들어 내는 것을 매우 좋아합니다.",
        choice: "나는 늘 변화하고 혁신적인 아이디어를 내며, 창조적인 시도를 하는 직업을 선택하고 싶습니다.",
        life: "나는 새롭고 독창적인 것을 만들어 내는 과정에서 능력을 충분히 발휘할 수 있을 것입니다.",
        class: "values_creativity"
      }
    ]
  }
};