import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import type { QuizTask } from '../quizData'
import SortableList from './SortableList'

type MatchingProps = {
  index: number
  tasks: QuizTask[]
}

function Matching({ index, tasks }: MatchingProps) {
  const answers = tasks.map(item => item.answer)

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <List dense sx={{ pt: 0 }}>
          {tasks.map((item, itemIndex) => (
            <ListItem key={`${item.question}-${itemIndex}`} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                sx={{
                  border: '1px solid #9e9e9e',
                  borderRadius: 1.5,
                  textAlign: 'right',
                  bgcolor: '#f8f9fa',
                }}
              >
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <SortableList index={index} answers={answers} />
      </Grid>
    </Grid>
  )
}

export default Matching
