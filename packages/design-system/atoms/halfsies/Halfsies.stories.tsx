import * as React from 'react';
import { HalfsiesContainer, HalfsiesItem } from './Halfsies';

export default {
  title: 'Atoms/Halfsies',
};

export const Container = () => (
  <HalfsiesContainer>
    <HalfsiesItem>Lefty doo</HalfsiesItem>
    <HalfsiesItem>Righty doo</HalfsiesItem>
  </HalfsiesContainer>
);
