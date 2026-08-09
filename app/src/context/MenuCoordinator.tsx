/**
 * MenuCoordinator — Prevents UI conflicts between floating menus.
 * Only one menu can be active at a time. The active menu has priority;
 * the other is hidden with a smooth fade transition.
 */
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

type ActiveMenu = 'none' | 'hamburger' | 'magic';

interface MenuCoordinatorContextValue {
  activeMenu: ActiveMenu;
  setActiveMenu: (menu: ActiveMenu) => void;
  requestPriority: (menu: ActiveMenu) => boolean;
  releasePriority: (menu: ActiveMenu) => void;
}

const MenuCoordinatorContext = createContext<MenuCoordinatorContextValue>({
  activeMenu: 'none',
  setActiveMenu: () => {},
  requestPriority: () => true,
  releasePriority: () => {},
});

export function MenuCoordinatorProvider({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenuState] = useState<ActiveMenu>('none');
  const lockRef = useRef<ActiveMenu>('none');

  const setActiveMenu = useCallback((menu: ActiveMenu) => {
    setActiveMenuState(menu);
    lockRef.current = menu;
  }, []);

  const requestPriority = useCallback((menu: ActiveMenu): boolean => {
    if (lockRef.current === 'none' || lockRef.current === menu) {
      lockRef.current = menu;
      setActiveMenuState(menu);
      return true;
    }
    return false;
  }, []);

  const releasePriority = useCallback((menu: ActiveMenu) => {
    if (lockRef.current === menu) {
      lockRef.current = 'none';
      setActiveMenuState('none');
    }
  }, []);

  return (
    <MenuCoordinatorContext.Provider value={{ activeMenu, setActiveMenu, requestPriority, releasePriority }}>
      {children}
    </MenuCoordinatorContext.Provider>
  );
}

export function useMenuCoordinator() {
  return useContext(MenuCoordinatorContext);
}

/**
 * Hook for a menu to claim priority while user is interacting.
 * Handles both mouse (mousedown/mouseup) and touch (touchstart/touchend) events.
 */
export function useMenuPriority(
  menuName: ActiveMenu,
  opts?: { fadeDuration?: number }
) {
  const { requestPriority, releasePriority } = useMenuCoordinator();
  const fadeMs = opts?.fadeDuration ?? 250;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActiveRef = useRef(false);

  const onPointerEnter = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    isActiveRef.current = true;
    requestPriority(menuName);
  }, [menuName, requestPriority]);

  const onPointerLeave = useCallback(() => {
    isActiveRef.current = false;
    timerRef.current = setTimeout(() => {
      if (!isActiveRef.current) {
        releasePriority(menuName);
      }
    }, fadeMs);
  }, [menuName, releasePriority, fadeMs]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      releasePriority(menuName);
    };
  }, [menuName, releasePriority]);

  return { onPointerEnter, onPointerLeave, fadeMs };
}
