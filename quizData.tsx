export type tTasks = {
  question: string;
  answer: string;
}[];

export type tQuiz = {
  id: number;
  type: 'M' | 'S';
  title: string;
  tasks: tTasks;
};

export type tQuizzes = tQuiz[];

export const quiz: tQuizzes = [
  {
    id: 1,
    type: 'M',
    title: 'Сопоставьте сооружение и город, в котором оно расположено.',
    tasks: [
      {
        question: 'Бурдж-Халифа',
        answer: 'Дубай',
      },
      {
        question: 'Tokyo Skytree',
        answer: 'Токио',
      },
      {
        question: 'Си-Эн Тауэр',
        answer: 'Торонто',
      },
      {
        question: 'Останкинская башня',
        answer: 'Москва',
      },
      {
        question: 'Lotte World Tower',
        answer: 'Сеул',
      },
    ],
  },
  {
    id: 2,
    type: 'M',
    title: 'Сопоставьте сооружение и его высоту.',
    tasks: [
      {
        question: 'Бурдж-Халифа',
        answer: '828 м',
      },
      {
        question: 'Tokyo Skytree',
        answer: '634 м',
      },
      {
        question: 'Шанхайская башня',
        answer: '632 м',
      },
      {
        question: 'Останкинская башня',
        answer: '540.1 м',
      },
      {
        question: 'Эмпайр-стейт-билдинг',
        answer: '448.7 м',
      },
    ],
  },
  {
    id: 3,
    type: 'S',
    title: 'Отсортируйте сооружения по убыванию высоты.',
    tasks: [
      {
        question: 'Бурдж-Халифа',
        answer: '1',
      },
      {
        question: 'Варшавская радиомачта',
        answer: '2',
      },
      {
        question: 'Tokyo Skytree',
        answer: '3',
      },
      {
        question: 'Шанхайская башня',
        answer: '4',
      },
      {
        question: 'Телерадиомачта KVLY-TV',
        answer: '5',
      },
    ],
  },
];
