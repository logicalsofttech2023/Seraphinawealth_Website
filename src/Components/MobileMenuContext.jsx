import React, { createContext, useState, useEffect } from 'react';

export const MobileMenuContext = createContext();

export const MobileMenuProvider = ({ children }) => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (isMobileMenuVisible) {
      body.classList.add('mobile-menu-visible');
    } else {
      body.classList.remove('mobile-menu-visible');
    }
  }, [isMobileMenuVisible]);

  return (
    <MobileMenuContext.Provider value={{ isMobileMenuVisible, setMobileMenuVisible }}>
      {children}
    </MobileMenuContext.Provider>
  );
};
