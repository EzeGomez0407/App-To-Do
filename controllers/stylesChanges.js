const handleScrollforStyleNavBar = (navBar, scrollTop) => {
  let opacity = 0;

  if (scrollTop > 0) {
    if (scrollTop >= 40 && scrollTop <= 50) {
      navBar.style.backgroundColor = "#202020aa";
      navBar.style.backdropFilter = "blur(3px)";
    } else if (scrollTop >= 50 && scrollTop <= 60) {
      navBar.style.backgroundColor = "#202020a6";
      navBar.style.backdropFilter = "blur(3px)";
    } else if (scrollTop >= 60 && scrollTop <= 70) {
      navBar.style.backgroundColor = "#202020a8";
      navBar.style.backdropFilter = "blur(3px)";
    } else if (scrollTop > 70) {
      navBar.style.backgroundColor = "#202020bb";
      navBar.style.backdropFilter = "blur(3px)";
    } else {
      if (scrollTop < 10) {
        opacity = `0${scrollTop}`;
      } else {
        opacity = `${scrollTop * 2}`;
      }
      navBar.style.backgroundColor = `#202020${opacity}`;
    }
  } else {
    navBar.style.background = "none";
  }
};

export { handleScrollforStyleNavBar };
