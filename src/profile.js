const buttons = document.querySelectorAll(".card-buttons button");

const sections = document.querySelectorAll(".card-section");

const card = document.querySelector(".card");

const handleButtonClick = e => {

  const targetSection = e.target.getAttribute("data-section");

  const section = document.querySelector(targetSection);

  targetSection !== "#about" ?

  card.classList.add("is-active") :

  card.classList.remove("is-active");

  card.setAttribute("data-state", targetSection);

  sections.forEach(s => s.classList.remove("is-active"));

  buttons.forEach(b => b.classList.remove("is-active"));

  e.target.classList.add("is-active");

  section.classList.add("is-active");

};

buttons.forEach(btn => {

  btn.addEventListener("click", handleButtonClick);

});

// 디바이스 OS 언어 감지 함수들
const getDeviceLanguage = () => {
    // 1. navigator.language - 가장 일반적인 방법
    const browserLanguage = navigator.language || navigator.userLanguage;
    
    // 2. navigator.languages - 사용자가 선호하는 언어 목록
    const preferredLanguages = navigator.languages || [browserLanguage];
    
    // 3. navigator.userAgent에서 언어 정보 추출 (일부 브라우저)
    const userAgentLanguage = navigator.userAgent.match(/[a-z]{2}-[A-Z]{2}/);
    
    return {
      primary: browserLanguage,
      preferred: preferredLanguages,
      userAgent: userAgentLanguage ? userAgentLanguage[0] : null,
      all: {
        browser: browserLanguage,
        preferred: preferredLanguages,
        userAgent: userAgentLanguage ? userAgentLanguage[0] : null
      }
    };
  };

// 언어별 콘텐츠 표시/숨김 함수
const showLanguageContent = (language) => {
  const allDescriptions = document.querySelectorAll('.multilang');
  
  // 모든 설명 숨기기
  allDescriptions.forEach(desc => {
    desc.style.display = 'none';
  });
  
  // 선택된 언어의 설명만 표시
  const targetDescriptions = document.querySelectorAll(`.multilang.${language}`);
  targetDescriptions.forEach(desc => {
    desc.style.display = 'block';
  });
  
  console.log(`${language} 언어 콘텐츠 표시됨`);
};

// 언어 선택 버튼 이벤트 처리
const setupLanguageSelector = () => {
  const languageButtons = document.querySelectorAll('.language-selector button');
  
  languageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const language = e.target.textContent.toLowerCase();
      
      // 버튼 활성화 상태 변경
      languageButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      
      // 해당 언어 콘텐츠 표시
      if (language === 'eng') {
        showLanguageContent('eng');
      } else if (language === 'kor') {
        showLanguageContent('kor');
      } else if (language === 'jpn') {
        showLanguageContent('jpn');
      }
    });
  });
};

// 디바이스 언어에 따른 자동 언어 선택
const autoSelectLanguage = () => {
  const languageInfo = getDeviceLanguage();
  const primaryLanguage = languageInfo.primary.toLowerCase();
  
  let targetLanguage = 'eng'; // 기본값
  
  if (primaryLanguage.startsWith('ko')) {
    targetLanguage = 'kor';
    console.log('한국어 사용자 감지 - 한국어 콘텐츠 표시');
  } else if (primaryLanguage.startsWith('ja')) {
    targetLanguage = 'jpn';
    console.log('일본어 사용자 감지 - 일본어 콘텐츠 표시');
  } else {
    console.log('영어/기타 언어 사용자 감지 - 영어 콘텐츠 표시');
  }
  
  // 해당 언어 버튼 활성화
  const languageButtons = document.querySelectorAll('.language-selector button');
  languageButtons.forEach(button => {
    button.classList.remove('active');
    if (button.textContent.toLowerCase() === targetLanguage) {
      button.classList.add('active');
    }
  });
  
  // 해당 언어 콘텐츠 표시
  showLanguageContent(targetLanguage);
  
  return targetLanguage;
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 언어 선택기 설정
  setupLanguageSelector();
  
  // 디바이스 언어에 따른 자동 선택
  autoSelectLanguage();
  
  // 언어 정보 콘솔 출력 (디버깅용)
  const languageInfo = getDeviceLanguage();
  console.log('=== 디바이스 언어 정보 ===');
  console.log('주 언어:', languageInfo.primary);
  console.log('선호 언어 목록:', languageInfo.preferred);
});