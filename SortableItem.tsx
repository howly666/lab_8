import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface SortableItemProps {
  item: string;
}

export function SortableItem({ item }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.55 : 1,
    zIndex: isDragging ? 2 : 1,
  };

  return (
    <ListItem ref={setNodeRef} style={style} {...attributes} {...listeners} disablePadding sx={{ mb: 1 }}>
      <ListItemButton
        sx={{
          border: '1px solid gray',
          borderRadius: '5px',
          bgcolor: 'background.paper',
          cursor: 'grab',
          '&:active': {
            cursor: 'grabbing',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>
          <DragIndicatorIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={item} />
      </ListItemButton>
    </ListItem>
  );
}
