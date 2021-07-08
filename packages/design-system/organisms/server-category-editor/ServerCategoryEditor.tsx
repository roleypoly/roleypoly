import { BreakpointText } from '@roleypoly/design-system/atoms/breakpoints';
import { Button } from '@roleypoly/design-system/atoms/button';
import { FaderOpacity } from '@roleypoly/design-system/atoms/fader';
import { LargeText } from '@roleypoly/design-system/atoms/typography';
import { EditorCategory } from '@roleypoly/design-system/molecules/editor-category';
import { CategoryContainer } from '@roleypoly/design-system/organisms/role-picker/RolePicker.styled';
import { Category, CategoryType, PresentableGuild, Role } from '@roleypoly/types';
import KSUID from 'ksuid';
import { sortBy } from 'lodash';
import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { CgReorder } from 'react-icons/cg';
import { GoArrowDown, GoArrowUp, GoCheck, GoGrabber, GoPlus } from 'react-icons/go';
import {
  CategoryActions,
  ReorderButton,
  ReorderCategoryContainer,
} from './ServerCategoryEditor.styled';

type Props = {
  guild: PresentableGuild;
  onChange: (categories: PresentableGuild['data']['categories']) => void;
};

const resetOrder = (categories: Category[]) =>
  sortBy(categories, ['position', 'id']).map((c, index) => ({ ...c, position: index }));

const forceOrder = (categories: Category[]) =>
  categories.map((c, index) => ({ ...c, position: index }));

export const ServerCategoryEditor = (props: Props) => {
  const [reorderMode, setReorderMode] = React.useState(false);

  const updateSingleCategory = (category: Category) => {
    const newCategories = props.guild.data.categories.map((c) => {
      if (c.id === category.id) {
        return category;
      }
      return c;
    });
    props.onChange(newCategories);
  };

  const createCategory = () => {
    // Reset order now that we're creating a new category
    const categories = resetOrder(props.guild.data.categories);

    const newCategory: Category = {
      id: KSUID.randomSync().string,
      name: 'New Category',
      type: CategoryType.Multi,
      position: categories.length,
      roles: [],
      hidden: false,
    };

    props.onChange([...categories, newCategory]);
  };

  const onReorder = (categories: Category[] | null) => {
    setReorderMode(false);
    if (categories === null) {
      return;
    }

    props.onChange(resetOrder(categories));
  };

  if (reorderMode) {
    return <ReorderMode {...props} exitReorderMode={onReorder} />;
  }

  return (
    <div>
      <CategoryActions>
        <Button color="muted" size="small" onClick={() => createCategory()}>
          Create New <GoPlus />
        </Button>
        <Button color="muted" size="small" onClick={() => setReorderMode(true)}>
          Change Order <CgReorder />
        </Button>
      </CategoryActions>
      {sortBy(props.guild.data.categories, ['position', 'id']).map((category, idx) => (
        <CategoryContainer key={idx}>
          <EditorCategory
            category={category}
            title={category.name}
            roles={
              category.roles
                .map((role) => props.guild.roles.find((r) => r.id === role))
                .filter((r) => r !== undefined) as Role[]
            }
            onChange={updateSingleCategory}
          />
        </CategoryContainer>
      ))}
    </div>
  );
};

const ReorderMode = (
  props: Props & { exitReorderMode: (final: Category[] | null) => void }
) => {
  const [categories, setCategories] = React.useState(props.guild.data.categories);

  React.useEffect(() => {
    setCategories(props.guild.data.categories);
  }, [props.guild.data.categories]);

  const handleReorder = (category: Category, direction: 'up' | 'down') => () => {
    const newCategories = [...categories];
    const index = newCategories.findIndex((c) => c.id === category.id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex > newCategories.length - 1) {
      return;
    }

    newCategories.splice(index, 1);
    newCategories.splice(newIndex, 0, category);
    setCategories(forceOrder(newCategories));
  };

  const handleDrop = (dropEvent: DropResult) => {
    const newCategories = [...categories];
    const { source, destination } = dropEvent;

    if (!destination || source.index === destination.index) {
      return;
    }

    newCategories.splice(source.index, 1);
    newCategories.splice(destination.index, 0, categories[source.index]);
    setCategories(forceOrder(newCategories));
  };

  return (
    <div>
      <CategoryActions right>
        <Button color="muted" size="small" onClick={() => props.exitReorderMode(null)}>
          Cancel
        </Button>
        <Button
          color="primary"
          size="small"
          onClick={() => props.exitReorderMode(categories)}
        >
          <BreakpointText small="Save" large="Save Order" /> <GoCheck />
        </Button>
      </CategoryActions>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="categories">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sortBy(categories, ['position', 'id']).map((category, idx) => (
                <Draggable key={category.id} index={idx} draggableId={category.id}>
                  {(provided, snapshot) => (
                    <ReorderCategoryContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <ReorderButton
                        data-tip="Drag to reorder"
                        style={{ cursor: 'grab' }}
                        {...provided.dragHandleProps}
                      >
                        <GoGrabber />
                      </ReorderButton>
                      <FaderOpacity isVisible={idx !== 0}>
                        <ReorderButton
                          onClick={handleReorder(category, 'up')}
                          data-tip="Move up"
                        >
                          <GoArrowUp />
                        </ReorderButton>
                      </FaderOpacity>
                      <FaderOpacity isVisible={categories.length - 1 !== idx}>
                        <ReorderButton
                          onClick={handleReorder(category, 'down')}
                          data-tip="Move down"
                        >
                          <GoArrowDown />
                        </ReorderButton>
                      </FaderOpacity>
                      <LargeText>{category.name}</LargeText>
                    </ReorderCategoryContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};