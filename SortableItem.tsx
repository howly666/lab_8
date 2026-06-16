import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

type SortableItemProps = {
  item: string
}

export function SortableItem({ item }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.55 : 1,
    zIndex: isDragging ? 10 : 'auto',
  }

  return (
    <ListItem ref={setNodeRef} style={style} disablePadding sx={{ mb: 1 }} {...attributes} {...listeners}>
      <ListItemButton
        sx={{
          border: '1px solid #9e9e9e',
          borderRadius: 1.5,
          bgcolor: '#ffffff',
          cursor: 'grab',
          '&:active': {
            cursor: 'grabbing',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 34 }}>
          <DragIndicatorIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={item} />
      </ListItemButton>
    </ListItem>
  )
}
