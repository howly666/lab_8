import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { List } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { SortableItem } from '../components/SortableItem'
import { setDraggedItems } from './quizSlice'

type SortableListProps = {
  index: number
  answers: string[]
}

function SortableList({ index, answers }: SortableListProps) {
  const dispatch = useDispatch()
  const draggedItems = useSelector((state: RootState) => state.quiz.lists[index] ?? answers)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = draggedItems.indexOf(String(active.id))
    const newIndex = draggedItems.indexOf(String(over.id))

    if (oldIndex === -1 || newIndex === -1) return

    const newList = arrayMove(draggedItems, oldIndex, newIndex)
    dispatch(setDraggedItems({ index, items: newList }))
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={draggedItems} strategy={verticalListSortingStrategy}>
        <List dense sx={{ pt: 0 }}>
          {draggedItems.map(item => (
            <SortableItem key={item} item={item} />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  )
}

export default SortableList
