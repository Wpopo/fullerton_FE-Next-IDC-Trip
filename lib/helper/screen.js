const Helper = {
  // <375px
  isXsScreen: () => {
    return window.innerWidth < 375;
  },
  // (≥375px)
  isSmScreen: () => {
    return window.innerWidth >= 375;
  },
  // (≥540px)
  ismdScreen: () => {
    return window.innerWidth >= 540;
  },
  // (≥720px)
  islgScreen: () => {
    return window.innerWidth >= 720;
  },
  // (>=1024px)
  isXlScreen: () => {
    return window.innerWidth >= 1024;
  },

  originWidth: () => window.innerWidth,
  originHeight: () => window.innerHeight,

  // 滾輪至頂
  scrollToTop: () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  }
};

export default Helper;
