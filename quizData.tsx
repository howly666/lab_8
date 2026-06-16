export type QuizTask = {
  question: string
  answer: string
}

export type QuizType = 'M' | 'S'

export type QuizItem = {
  id: number
  type: QuizType
  title: string
  tasks: QuizTask[]
}

export const quiz: QuizItem[] = [
  {
    id: 1,
    type: 'M',
    title: 'Сопоставьте героя Dota 2 и его основной атрибут.',
    tasks: [
      {
        question: 'Anti-Mage',
        answer: 'Ловкость',
      },
      {
        question: 'Legion Commander',
        answer: 'Сила',
      },
      {
        question: 'Lion',
        answer: 'Интеллект',
      },
    ],
  },
  {
    id: 2,
    type: 'M',
    title: 'Сопоставьте героя и наиболее характерную роль на сайте.',
    tasks: [
      {
        question: 'Crystal Maiden',
        answer: 'Саппорт',
      },
      {
        question: 'Earthshaker',
        answer: 'Инициатор',
      },
      {
        question: 'Phantom Assassin',
        answer: 'Керри',
      },
      {
        question: 'Pudge',
        answer: 'Танк',
      },
    ],
  },
  {
    id: 3,
    type: 'S',
    title: 'Отсортируйте героев по убыванию показателя ловкости.',
    tasks: [
      {
        question: 'Sniper',
        answer: '1',
      },
      {
        question: 'Juggernaut',
        answer: '2',
      },
      {
        question: 'Anti-Mage',
        answer: '3',
      },
      {
        question: 'Phantom Assassin',
        answer: '4',
      },
      {
        question: 'Storm Spirit',
        answer: '5',
      },
    ],
  },
]

export function shuffleArray<T>(items: T[]) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

export function getInitialItemsForQuiz(item: QuizItem) {
  if (item.type === 'M') {
    return shuffleArray(item.tasks.map(task => task.answer))
  }

  return shuffleArray(item.tasks.map(task => task.question))
}

export function getShuffledQuizLists() {
  return quiz.map(item => getInitialItemsForQuiz(item))
}
