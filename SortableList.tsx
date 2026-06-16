import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import List from '@mui/material/List';
import { useDispatch, useSelector } from 'react-redux';
import { setDraggedItems } from './quizSlice';
import { RootState } from '../../store';
import { SortableItem } from '../components/SortableItem';

interface ComponentProps {
  index: number;
  items: string[];
}

function SortableList({ index, items }: ComponentProps) {
  const dispatch = useDispatch();
  const listFromStore = useSelector((state: RootState) => state.lists.lists[index]);
  const draggedItems = listFromStore && listFromStore.length ? listFromStore : items;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);
    const oldIndex = draggedItems.indexOf(activeId);
    const newIndex = draggedItems.indexOf(overId);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newList = arrayMove(draggedItems, oldIndex, newIndex);
    dispatch(setDraggedItems({ index, items: newList }));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={draggedItems} strategy={verticalListSortingStrategy}>
        <List sx={{ width: '100%' }}>
          {draggedItems.map((item) => (
            <SortableItem key={item} item={item} />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}

export default SortableList;
