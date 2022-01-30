import * as React from 'react';
import { Hero as HeroComponent } from './Hero';

export default {
  title: 'Atoms/Hero',
  component: HeroComponent,
  args: {
    topSpacing: 75,
    bottomSpacing: 25,
  },
};

export const Hero = ({ topSpacing, bottomSpacing }) => {
  return (
    <StoryWrapper topSpacing={topSpacing} bottomSpacing={bottomSpacing}>
      <HeroComponent topSpacing={topSpacing} bottomSpacing={bottomSpacing}>
        <h1>This is it.</h1>
      </HeroComponent>
    </StoryWrapper>
  );
};

type WrapperProps = {
  children: React.ReactNode;
  topSpacing: number;
  bottomSpacing: number;
};

const StoryWrapper = ({ topSpacing, bottomSpacing, ...props }: WrapperProps) => (
  <div>
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100vh',
      }}
    >
      <div
        style={{
          height: topSpacing,
          backgroundColor: 'rgb(255 0 0 / 25%)',
          top: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          overflow: 'hidden',
        }}
      >
        topSpacing
      </div>
      <div
        style={{
          height: bottomSpacing,
          backgroundColor: 'rgb(0 0 255 / 25%)',
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          overflow: 'hidden',
        }}
      >
        bottomSpacing
      </div>
    </div>
    {props.children}
  </div>
);
