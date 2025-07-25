interface Realm {
  no: string;
  code: string;
  name: string;
  dc: string;
  choice: string;
  life: string;
  class: string;
}

interface MockData {
  realms: Realm[];
}

interface TestResult {
  id: number;
  user_id: number;
  version: string;
  created_at: string;
  jinro_results: Array<{
    id: number;
    jinro_id: number;
    version: number;
    ability_development_score: number;
    autonomy_score: number;
    conservatism_score: number;
    stability_score: number;
    social_recognition_score: number;
    social_service_score: number;
    self_improvement_score: number;
    creativity_score: number;
    first_job_id: number;
    first_job: {
      id: number;
      job_type: string;
      job_name_ko: string;
      description: string | null;
      ability_development: number;
      autonomy: number;
      conservatism: number;
      stability: number;
      social_recognition: number;
      social_service: number;
      self_improvement: number;
      creativity: number;
    };
    first_job_score: number;
    second_job_id: number;
    second_job: {
      id: number;
      job_type: string;
      job_name_ko: string;
      description: string | null;
      ability_development: number;
      autonomy: number;
      conservatism: number;
      stability: number;
      social_recognition: number;
      social_service: number;
      self_improvement: number;
      creativity: number;
    };
    second_job_score: number;
    third_job_id: number;
    third_job: {
      id: number;
      job_type: string;
      job_name_ko: string;
      description: string | null;
      ability_development: number;
      autonomy: number;
      conservatism: number;
      stability: number;
      social_recognition: number;
      social_service: number;
      self_improvement: number;
      creativity: number;
    };
    third_job_score: number;
    created_at: string;
  }>;
}

const mockData: MockData = {
  "realms": [
    {
      "no": "1",
      "code": "100314",
      "name": "능력발휘",
      "dc": "나의 능력을 충분히 발휘할 수 있을 때 보람과 만족을 느낍니다.",
      "choice": "나는 나의 능력을 충분히 발휘할 수 있는 기회와 가능성이 주어지는 직업을 선택할 것입니다.",
      "life": "직업생활에서의 경쟁은 나를 도전적으로 만들어주고, 어려운 일을 하나씩 해결해 나가는 과정에서 성취감을 느낄 것 입니다.",
      "class": "values_ability"
    },
    {
      "no": "2",
      "code": "100315",
      "name": "자율성",
      "dc": "나는 어떤 일을 할 때 규칙, 절차, 시간 등을 스스로 결정하길 원합니다.",
      "choice": "나는 다른 것보다 일하는 방식과 스타일이 자유로운 직업을 선택할 것입니다.",
      "life": "나만의 방식에 맞게 자율적으로 일할 때 나의 능력을 더욱 효과적으로 발휘할 수 있습니다.",
      "class": "values_free"
    },
    {
      "no": "3",
      "code": "100316",
      "name": "보수",
      "dc": "나의 충분한 경제적 보상이 매우 중요하다고 생각합니다.",
      "choice": "나의 노력과 성과에 대해 충분한 경제적 보상이 주어지는 직업을 선택할 것입니다.",
      "life": "충분한 보수를 받는다면 일의 어려움과 힘겨움에 관계없이 최선을 다해 노력할 것입니다.",
      "class": "values_pay"
    },
    {
      "no": "4",
      "code": "100317",
      "name": "안정성",
      "dc": "나는 매사가 계획한대로 안정적으로 유지되는 것을 좋아합니다.",
      "choice": "나는 쉽게 해고되지 않고 오랫동안 일할 수 있는 직업을 선택할 것입니다.",
      "life": "안정적인 직업생활이 보장된다면 편안한 마음으로 더욱 열심히 일을 할 것입니다.",
      "class": "values_stability"
    },
    {
      "no": "5",
      "code": "100318",
      "name": "사회적 인정",
      "dc": "나는 다른 사람들로부터 나의 능력과 성취를 충분히 인정받고 싶어합니다.",
      "choice": "나는 많은 사람들로부터 주목받고 인정받을 수 있는 직업을 선택할 것입니다.",
      "life": "주변사람들이 나를 긍정적으로 평가하면 나의 능력발휘에 더욱 도움이 될 것입니다.",
      "class": "values_social"
    },
    {
      "no": "6",
      "code": "100319",
      "name": "사회봉사",
      "dc": "나는 다른 사람을 돕고 더 나은 세상을 만들고 싶습니다.",
      "choice": "나는 사람, 조직, 국가, 인류에 대한 봉사와 기여가 가능한 직업을 선택할 것입니다.",
      "life": "도움과 격려가 필요한 사람들에게 힘을 줄 수 있는 직업생활을 할 때 가치와 보람을 느낄 것입니다.",
      "class": "values_social_service"
    },
    {
      "no": "7",
      "code": "100320",
      "name": "자기계발",
      "dc": "나는 항상 새로운 것을 배우고 스스로 발전해 나갈 때 만족을 느낍니다.",
      "choice": "나는 나의 능력과 소질을 지속적으로 발전시킬 수 있는 직업을 선택할 것입니다.",
      "life": "나 스스로가 발전할 수 있는 기회가 충분히 주어지는 직업생활을 할 때 만족감을 느낄 것입니다.",
      "class": "values_self"
    },
    {
      "no": "8",
      "code": "100321",
      "name": "창의성",
      "dc": "나는 예전부터 해오던 것 보다는 새로운 것을 만들어 내는 것을 매우 좋아합니다.",
      "choice": "나는 늘 변화하고 혁신적인 아이디어를 내며, 창조적인 시도를 하는 직업을 선택하고 싶습니다.",
      "life": "나는 새롭고 독창적인 것을 만들어 내는 과정에서 능력을 충분히 발휘할 수 있을 것입니다.",
      "class": "values_creativity"
    }
  ]
};


const mockReportData: TestResult  = {
  id: 1,
  user_id: 123,
  version: "1.0",
  created_at: "2025-07-25T15:00:00Z",
  jinro_results: [
    {
      id: 11,
      jinro_id: 1,
      version: 1,
      ability_development_score: 5,
      autonomy_score: 4,
      conservatism_score: 3,
      stability_score: 4,
      social_recognition_score: 4,
      social_service_score: 2,
      self_improvement_score: 3,
      creativity_score: 3,
      first_job_id: 101,
      first_job: {
        id: 101,
        job_type: "app_developer",
        job_name_ko: "소프트웨어 엔지니어",
        description: "창의적인 문제 해결 능력과 최신 기술 스택을 활용하여 웹 및 모바일 애플리케이션을 설계, 개발 및 유지보수합니다. 사용자 경험을 최적화하고 확장 가능한 시스템을 구축하는 역할을 담당합니다.",
        ability_development: 5,
        autonomy: 4,
        conservatism: 3,
        stability: 4,
        social_recognition: 4,
        social_service: 2,
        self_improvement: 5,
        creativity: 4
      },
      first_job_score: 0.95,
      second_job_id: 102,
      second_job: {
        id: 102,
        job_type: "data_analyst",
        job_name_ko: "데이터 분석가",
        description: "대규모 데이터에서 인사이트를 추출하고 비즈니스 의사결정을 지원하기 위해 데이터를 수집, 처리, 분석합니다. 통계적 지식과 프로그래밍 기술을 사용하여 데이터 기반의 전략을 제시합니다.",
        ability_development: 4,
        autonomy: 3,
        conservatism: 4,
        stability: 4,
        social_recognition: 4,
        social_service: 2,
        self_improvement: 4,
        creativity: 3
      },
      second_job_score: 0.88,
      third_job_id: 103,
      third_job: {
        id: 103,
        job_type: "project_manager",
        job_name_ko: "프로젝트 관리자",
        description: "프로젝트의 목표를 성공적으로 달성하기 위해 계획, 실행, 모니터링 및 마무리를 총괄합니다. 팀원들과의 원활한 소통을 통해 리소스를 효율적으로 관리하고 일정 및 예산을 준수합니다.",
        ability_development: 4,
        autonomy: 4,
        conservatism: 3,
        stability: 4,
        social_recognition: 5,
        social_service: 3,
        self_improvement: 4,
        creativity: 2
      },
      third_job_score: 0.82,
      created_at: "2025-07-25T15:30:00Z"
    }
  ]
};

export default mockData;
export {mockReportData}