// thing should be everything visible on desktop/tablet and a popover when small

import { useBreakpointContext } from '@roleypoly/design-system/atoms/breakpoints';
import { Popover } from '@roleypoly/design-system/atoms/popover';
import { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import {
  DropdownNavCurrent,
  DropdownNavIcon,
  DropdownNavOpener,
  NavItem,
} from './QuickNav.styled';

export type QuickNavProps = {
  navItems: string[];
  onNavChange?: (newNavItem: string) => void;
  currentNavItem?: string;
};

export const QuickNav = (props: QuickNavProps) => {
  const breakpoints = useBreakpointContext();

  if (breakpoints.screenSize.onSmallScreen) {
    return <QuickNavCollapsed {...props} />;
  }

  return <QuickNavExpanded {...props} />;
};

export const QuickNavExpanded = (props: QuickNavProps) => {
  return (
    <div>
      {props.navItems.map((navItem) => (
        <NavItem
          onClick={() => props.onNavChange?.(navItem)}
          selected={props.currentNavItem === navItem}
          key={navItem}
        >
          {navItem}
        </NavItem>
      ))}
    </div>
  );
};

export const QuickNavCollapsed = (props: QuickNavProps) => {
  const [popoverState, setPopoverState] = useState(false);

  return (
    <div>
      {popoverState ? (
        <Popover
          headContent={<>Server Editor</>}
          position={'top left'}
          active={popoverState}
          onExit={() => setPopoverState(false)}
        >
          {() => (
            <>
              {props.navItems.map((navItem) => (
                <NavItem
                  onClick={() => {
                    setPopoverState(false);
                    props.onNavChange?.(navItem);
                  }}
                  selected={props.currentNavItem === navItem}
                  key={navItem}
                >
                  {navItem}
                </NavItem>
              ))}
            </>
          )}
        </Popover>
      ) : (
        <DropdownNavOpener onClick={() => setPopoverState(true)}>
          <DropdownNavIcon>
            <GoChevronDown />
          </DropdownNavIcon>
          <DropdownNavCurrent>{props.currentNavItem}</DropdownNavCurrent>
        </DropdownNavOpener>
      )}
    </div>
  );
};
