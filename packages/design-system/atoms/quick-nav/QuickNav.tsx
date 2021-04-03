// thing should be everything visible on desktop/tablet and a popover when small

import { Popover } from '@roleypoly/design-system/atoms/popover';
import { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import {
  DropdownNavCurrent,
  DropdownNavIcon,
  DropdownNavOpener,
  HideIfNotSmall,
  HideIfSmall,
  NavItem,
} from './QuickNav.styled';

export type QuickNavProps = {
  navItems: string[];
  onNavChange?: (newNavItem: string) => void;
  currentNavItem?: string;
};

export const QuickNav = (props: QuickNavProps) => {
  return (
    <>
      <QuickNavExpanded {...props} />
      <QuickNavCollapsed {...props} />
    </>
  );
};

export const QuickNavExpanded = (props: QuickNavProps) => {
  return (
    <HideIfSmall>
      {props.navItems.map((navItem) => (
        <NavItem
          onClick={() => props.onNavChange?.(navItem)}
          selected={props.currentNavItem === navItem}
          key={navItem}
        >
          {navItem}
        </NavItem>
      ))}
    </HideIfSmall>
  );
};

export const QuickNavCollapsed = (props: QuickNavProps) => {
  const [popoverState, setPopoverState] = useState(false);

  return (
    <HideIfNotSmall>
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
    </HideIfNotSmall>
  );
};
