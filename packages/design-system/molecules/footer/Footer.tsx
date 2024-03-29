import { AmbientLarge } from '@roleypoly/design-system/atoms/typography';
import * as React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Flags } from './Flags';
import { FooterWrapper, HoverColor } from './Footer.styled';

const year = new Date().getFullYear();

export const Footer = () => (
  <FooterWrapper>
    <AmbientLarge>
      <div>
        &copy; {year} Roleypoly &ndash; Made with{' '}
        <FaHeart size={'0.8em'} color={'#fe4365'} />
        &nbsp;in Raleigh, NC
      </div>
      <div>
        <a href="https://discord.gg/Xj6rK3E">Discord/Support</a> &ndash;&nbsp;
        <a href="https://patreon.com/roleypoly">Patreon</a> &ndash;&nbsp;
        <a href="https://github.com/roleypoly">GitHub</a>
      </div>
      <HoverColor>
        <Flags height={'1em'} />
      </HoverColor>
    </AmbientLarge>
  </FooterWrapper>
);
