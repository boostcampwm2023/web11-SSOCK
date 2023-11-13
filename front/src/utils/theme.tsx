const colors = {
  '--primary-red-primary': '#8A0F0A',
  '--primary-green-primary': '#25330F',
  '--primary-yellow': '#E7AD56',
  '--primary-black': '#171921',
  '--red-p-primary': '#AD280F',
  '--primary-redp-variant': '#F89F9B',
  '--black-primary': '#252420',
  '--sub-text': '#A0A0A0',
  '--nick-name': '#49C19D',
  '--blue-blue-dark-10': '#4589FF',
  '--white-primary': '#ECE0D0',
  '--warning': '#FF4E70',
  '--primary-blue-p-variant': '#607F8F',
  '--yellow-primary-2': '#EEA630'
}; //rem이 특정 폰트 기준으로 계산 되는걸로 아는데

const font = {
  '--normal-title-font': 'normal normal 400 32px/normal "KingSejongInstitute"',
  '--normal-introduce-font':
    'normal normal 400 18px/150% "KingSejongInstitute"',
  '--normal-login-font': 'normal normal 400 16px/100% "Pretendard-Regular"',
  '--normal-button-font': 'normal normal 400 18px/150% "YUniverse-B"',
  '--normal-nickname-font':
    'normal normal 400 28px/normal "KingSejongInstitute"',
  '--normal-nickname-text-font':
    'normal normal 400 16px/20px "Pretendard-Regular"',
  '--normal-nickname-input-font':
    'normal normal 400 24px/20px "Pretendard-Regular"'
};

const size = {
  '--desktop-min-width': '1024px',
  '--desktop-width': '800px',
  maxWidth: '900px'
};

const theme = {
  colors,
  font,
  size
};

export default theme;
