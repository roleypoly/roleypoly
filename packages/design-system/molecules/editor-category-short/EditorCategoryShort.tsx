import { Category } from '@roleypoly/types';
import { DragEventHandler, MouseEventHandler } from 'react';
import { GoEyeClosed, GoGrabber, GoKebabHorizontal } from 'react-icons/go';
import {
  Container,
  Flags,
  GrabberBox,
  Name,
  Opener,
  Void,
} from './EditorCategoryShort.styled';

type ShortProps = {
  category: Category;
  onDrag?: DragEventHandler;
  onOpen?: MouseEventHandler;
};

export const EditorCategoryShort = (props: ShortProps) => (
  <Container onClick={props.onOpen} role="menuitem">
    <GrabberBox onDrag={props.onDrag} role="button">
      <GoGrabber />
    </GrabberBox>
    <Name>{props.category.name}</Name>
    <Flags>{props.category.hidden && <GoEyeClosed data-tip="Hidden to Members" />}</Flags>
    <Void />
    <Opener role="button">
      <GoKebabHorizontal />
    </Opener>
  </Container>
);
