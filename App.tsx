import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  MobileStepper,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { BarChart } from '@mui/x-charts/BarChart'
import { LineChart } from '@mui/x-charts/LineChart'
import { PieChart } from '@mui/x-charts/PieChart'
import antiImg from './assets/anti.webp'
import cmImg from './assets/cm.webp'
import dotaLogoImg from './assets/dota2_logo.jpg'
import phantomImg from './assets/fantom.jpg'
import legionImg from './assets/legion.jpg'
import lionImg from './assets/lion.webp'
import earthshakerImg from './assets/sheyker.jpg'
import voidImg from './assets/void.png'
import Testing from './testing/Testing'

// ─── данные ───────────────────────────────────────────────────────────────────

type PrimaryAttribute = 'Сила' | 'Ловкость' | 'Интеллект'
type BattleType = 'Ближний бой' | 'Дальний бой'

type Hero = {
  id: string
  name: string
  roles: string[]
  primaryAttribute: PrimaryAttribute
  battleType: BattleType
  strength: number
  agility: number
  intellect: number
  image: string
  short: string
  description: string
}

const heroes: Hero[] = [
  {
    id: "anti-mage",
    name: "Anti-Mage",
    roles: ["Керри"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 21,
    agility: 24,
    intellect: 15,
    image: antiImg,
    short: "Керри. Ловкость.",
    description: "Anti-Mage быстро фармит, мобильный и силён против магов. Его главная задача — набрать предметы, пережить начало игры и выйти в сильную позднюю стадию.",
  },
  {
    id: "legion-commander",
    name: "Legion Commander",
    roles: ["Керри", "Инициатор"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 25,
    agility: 18,
    intellect: 20,
    image: legionImg,
    short: "Керри, Инициатор. Сила.",
    description: "Legion Commander — бесстрашный командир, который раскрывается через честный поединок. Герой хорошо подходит для инициации, дуэлей и давления на ключевые цели противника.",
  },
  {
    id: "lion",
    name: "Lion",
    roles: ["Саппорт", "Контролер", "Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 18,
    agility: 15,
    intellect: 22,
    image: lionImg,
    short: "Саппорт, Контролер, Нукер. Интеллект.",
    description: "Lion — саппорт с сильным контролем и большим магическим уроном. Он полезен за счёт станов, превращения и способности быстро добивать важные цели.",
  },
  {
    id: "crystal-maiden",
    name: "Crystal Maiden",
    roles: ["Саппорт", "Контролер", "Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 19,
    agility: 16,
    intellect: 21,
    image: cmImg,
    short: "Саппорт, Контролер, Нукер. Интеллект.",
    description: "Crystal Maiden помогает команде контролем, замедлением и восстановлением маны. Ей важно правильно выбирать позицию, потому что герой уязвим в ближнем бою.",
  },
  {
    id: "invoker",
    name: "Invoker",
    roles: ["Керри", "Нукер", "Контролер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 19,
    agility: 14,
    intellect: 22,
    image: dotaLogoImg,
    short: "Керри, Нукер, Контролер. Интеллект.",
    description: "Invoker — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: керри, нукер, контролер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "earthshaker",
    name: "Earthshaker",
    roles: ["Саппорт", "Инициатор", "Контролер"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 22,
    agility: 12,
    intellect: 18,
    image: earthshakerImg,
    short: "Саппорт, Инициатор, Контролер. Сила.",
    description: "Earthshaker силён в массовых драках и инициации. Его способности позволяют перекрывать проходы, оглушать врагов и резко менять исход сражения.",
  },
  {
    id: "juggernaut",
    name: "Juggernaut",
    roles: ["Керри"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 20,
    agility: 26,
    intellect: 14,
    image: dotaLogoImg,
    short: "Керри. Ловкость.",
    description: "Juggernaut — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: керри. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "pudge",
    name: "Pudge",
    roles: ["Контролер", "Инициатор", "Танк"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 25,
    agility: 14,
    intellect: 16,
    image: dotaLogoImg,
    short: "Контролер, Инициатор, Танк. Сила.",
    description: "Pudge — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: контролер, инициатор, танк. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "shadow-fiend",
    name: "Shadow Fiend",
    roles: ["Керри", "Нукер"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 19,
    agility: 20,
    intellect: 18,
    image: dotaLogoImg,
    short: "Керри, Нукер. Ловкость.",
    description: "Shadow Fiend — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: керри, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "storm-spirit",
    name: "Storm Spirit",
    roles: ["Керри", "Нукер", "Побег"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 21,
    agility: 22,
    intellect: 23,
    image: dotaLogoImg,
    short: "Керри, Нукер, Побег. Интеллект.",
    description: "Storm Spirit — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: керри, нукер, побег. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "phantom-assassin",
    name: "Phantom Assassin",
    roles: ["Керри"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 19,
    agility: 23,
    intellect: 15,
    image: phantomImg,
    short: "Керри. Ловкость.",
    description: "Phantom Assassin — керри с высоким физическим уроном и сильными критическими атаками. Ей важно быстро получить основные предметы и выбирать правильную цель.",
  },
  {
    id: "riki",
    name: "Riki",
    roles: ["Керри", "Побег"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 18,
    agility: 23,
    intellect: 14,
    image: dotaLogoImg,
    short: "Керри, Побег. Ловкость.",
    description: "Riki — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: керри, побег. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "sniper",
    name: "Sniper",
    roles: ["Керри", "Нукер"],
    primaryAttribute: "Ловкость",
    battleType: "Дальний бой",
    strength: 19,
    agility: 27,
    intellect: 15,
    image: dotaLogoImg,
    short: "Керри, Нукер. Ловкость.",
    description: "Sniper — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: керри, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "templar-assassin",
    name: "Templar Assassin",
    roles: ["Керри", "Нукер"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 21,
    agility: 23,
    intellect: 16,
    image: dotaLogoImg,
    short: "Керри, Нукер. Ловкость.",
    description: "Templar Assassin — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: керри, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "ursa",
    name: "Ursa",
    roles: ["Керри", "Танк"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 24,
    agility: 18,
    intellect: 16,
    image: dotaLogoImg,
    short: "Керри, Танк. Ловкость.",
    description: "Ursa — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: керри, танк. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "lina",
    name: "Lina",
    roles: ["Керри", "Саппорт", "Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 20,
    agility: 23,
    intellect: 30,
    image: dotaLogoImg,
    short: "Керри, Саппорт, Нукер. Интеллект.",
    description: "Lina — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: керри, саппорт, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "windranger",
    name: "Windranger",
    roles: ["Керри", "Саппорт", "Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 18,
    agility: 17,
    intellect: 22,
    image: dotaLogoImg,
    short: "Керри, Саппорт, Нукер. Интеллект.",
    description: "Windranger — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: керри, саппорт, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "zeus",
    name: "Zeus",
    roles: ["Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 19,
    agility: 11,
    intellect: 22,
    image: dotaLogoImg,
    short: "Нукер. Интеллект.",
    description: "Zeus — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "slark",
    name: "Slark",
    roles: ["Керри", "Побег"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 21,
    agility: 21,
    intellect: 16,
    image: dotaLogoImg,
    short: "Керри, Побег. Ловкость.",
    description: "Slark — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: керри, побег. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "faceless-void",
    name: "Faceless Void",
    roles: ["Керри", "Контролер"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 20,
    agility: 19,
    intellect: 15,
    image: voidImg,
    short: "Керри, Контролер. Ловкость.",
    description: "Faceless Void — керри с сильным контролем через Chronosphere. Герой особенно опасен в командных драках, когда команда готова реализовать купол.",
  },
  {
    id: "queen-of-pain",
    name: "Queen of Pain",
    roles: ["Керри", "Нукер", "Побег"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 18,
    agility: 22,
    intellect: 25,
    image: dotaLogoImg,
    short: "Керри, Нукер, Побег. Интеллект.",
    description: "Queen of Pain — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: керри, нукер, побег. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "wraith-king",
    name: "Wraith King",
    roles: ["Керри", "Саппорт", "Танк"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 22,
    agility: 16,
    intellect: 18,
    image: dotaLogoImg,
    short: "Керри, Саппорт, Танк. Сила.",
    description: "Wraith King — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: керри, саппорт, танк. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "drow-ranger",
    name: "Drow Ranger",
    roles: ["Керри"],
    primaryAttribute: "Ловкость",
    battleType: "Дальний бой",
    strength: 16,
    agility: 21,
    intellect: 15,
    image: dotaLogoImg,
    short: "Керри. Ловкость.",
    description: "Drow Ranger — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: керри. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "mirana",
    name: "Mirana",
    roles: ["Керри", "Саппорт", "Побег"],
    primaryAttribute: "Ловкость",
    battleType: "Дальний бой",
    strength: 18,
    agility: 24,
    intellect: 22,
    image: dotaLogoImg,
    short: "Керри, Саппорт, Побег. Ловкость.",
    description: "Mirana — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: керри, саппорт, побег. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "nyx-assassin",
    name: "Nyx Assassin",
    roles: ["Контролер", "Нукер", "Инициатор"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 17,
    agility: 21,
    intellect: 21,
    image: dotaLogoImg,
    short: "Контролер, Нукер, Инициатор. Ловкость.",
    description: "Nyx Assassin — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: контролер, нукер, инициатор. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "bounty-hunter",
    name: "Bounty Hunter",
    roles: ["Побег", "Нукер"],
    primaryAttribute: "Ловкость",
    battleType: "Ближний бой",
    strength: 20,
    agility: 21,
    intellect: 22,
    image: dotaLogoImg,
    short: "Побег, Нукер. Ловкость.",
    description: "Bounty Hunter — герой Dota 2 с основным атрибутом «Ловкость». В игре выполняет роли: побег, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "clockwerk",
    name: "Clockwerk",
    roles: ["Инициатор", "Контролер", "Танк"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 26,
    agility: 13,
    intellect: 18,
    image: dotaLogoImg,
    short: "Инициатор, Контролер, Танк. Сила.",
    description: "Clockwerk — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: инициатор, контролер, танк. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "omniknight",
    name: "Omniknight",
    roles: ["Саппорт", "Танк"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 23,
    agility: 15,
    intellect: 16,
    image: dotaLogoImg,
    short: "Саппорт, Танк. Сила.",
    description: "Omniknight — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: саппорт, танк. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "enigma",
    name: "Enigma",
    roles: ["Контролер", "Инициатор", "Лесник"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 21,
    agility: 14,
    intellect: 19,
    image: dotaLogoImg,
    short: "Контролер, Инициатор, Лесник. Интеллект.",
    description: "Enigma — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: контролер, инициатор, лесник. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "tinker",
    name: "Tinker",
    roles: ["Керри", "Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 19,
    agility: 13,
    intellect: 30,
    image: dotaLogoImg,
    short: "Керри, Нукер. Интеллект.",
    description: "Tinker — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: керри, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "nature-s-prophet",
    name: "Nature's Prophet",
    roles: ["Керри", "Лесник", "Пушер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 21,
    agility: 22,
    intellect: 23,
    image: dotaLogoImg,
    short: "Керри, Лесник, Пушер. Интеллект.",
    description: "Nature's Prophet — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: керри, лесник, пушер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "dark-seer",
    name: "Dark Seer",
    roles: ["Инициатор", "Лесник", "Побег"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 22,
    agility: 12,
    intellect: 21,
    image: dotaLogoImg,
    short: "Инициатор, Лесник, Побег. Интеллект.",
    description: "Dark Seer — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: инициатор, лесник, побег. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "axe",
    name: "Axe",
    roles: ["Инициатор", "Танк", "Контролер"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 25,
    agility: 20,
    intellect: 18,
    image: dotaLogoImg,
    short: "Инициатор, Танк, Контролер. Сила.",
    description: "Axe — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: инициатор, танк, контролер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "bristleback",
    name: "Bristleback",
    roles: ["Керри", "Танк", "Инициатор"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 22,
    agility: 17,
    intellect: 14,
    image: dotaLogoImg,
    short: "Керри, Танк, Инициатор. Сила.",
    description: "Bristleback — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: керри, танк, инициатор. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "centaur-warrunner",
    name: "Centaur Warrunner",
    roles: ["Инициатор", "Танк", "Контролер"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 27,
    agility: 15,
    intellect: 15,
    image: dotaLogoImg,
    short: "Инициатор, Танк, Контролер. Сила.",
    description: "Centaur Warrunner — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: инициатор, танк, контролер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "timbersaw",
    name: "Timbersaw",
    roles: ["Танк", "Нукер", "Побег"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 25,
    agility: 16,
    intellect: 19,
    image: dotaLogoImg,
    short: "Танк, Нукер, Побег. Сила.",
    description: "Timbersaw — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: танк, нукер, побег. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "sand-king",
    name: "Sand King",
    roles: ["Инициатор", "Контролер", "Саппорт"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 22,
    agility: 19,
    intellect: 19,
    image: dotaLogoImg,
    short: "Инициатор, Контролер, Саппорт. Сила.",
    description: "Sand King — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: инициатор, контролер, саппорт. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "tidehunter",
    name: "Tidehunter",
    roles: ["Инициатор", "Танк", "Контролер"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 27,
    agility: 15,
    intellect: 18,
    image: dotaLogoImg,
    short: "Инициатор, Танк, Контролер. Сила.",
    description: "Tidehunter — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: инициатор, танк, контролер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "slardar",
    name: "Slardar",
    roles: ["Керри", "Танк", "Инициатор"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 21,
    agility: 17,
    intellect: 15,
    image: dotaLogoImg,
    short: "Керри, Танк, Инициатор. Сила.",
    description: "Slardar — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: керри, танк, инициатор. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "spirit-breaker",
    name: "Spirit Breaker",
    roles: ["Инициатор", "Контролер", "Танк"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 28,
    agility: 17,
    intellect: 14,
    image: dotaLogoImg,
    short: "Инициатор, Контролер, Танк. Сила.",
    description: "Spirit Breaker — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: инициатор, контролер, танк. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "lycan",
    name: "Lycan",
    roles: ["Керри", "Пушер", "Лесник"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 26,
    agility: 16,
    intellect: 23,
    image: dotaLogoImg,
    short: "Керри, Пушер, Лесник. Сила.",
    description: "Lycan — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: керри, пушер, лесник. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "chaos-knight",
    name: "Chaos Knight",
    roles: ["Керри", "Контролер", "Танк"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 22,
    agility: 18,
    intellect: 18,
    image: dotaLogoImg,
    short: "Керри, Контролер, Танк. Сила.",
    description: "Chaos Knight — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: керри, контролер, танк. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "kunkka",
    name: "Kunkka",
    roles: ["Керри", "Саппорт", "Контролер"],
    primaryAttribute: "Сила",
    battleType: "Ближний бой",
    strength: 24,
    agility: 14,
    intellect: 18,
    image: dotaLogoImg,
    short: "Керри, Саппорт, Контролер. Сила.",
    description: "Kunkka — герой Dota 2 с основным атрибутом «Сила». В игре выполняет роли: керри, саппорт, контролер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "dazzle",
    name: "Dazzle",
    roles: ["Саппорт", "Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 18,
    agility: 20,
    intellect: 25,
    image: dotaLogoImg,
    short: "Саппорт, Нукер. Интеллект.",
    description: "Dazzle — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: саппорт, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "witch-doctor",
    name: "Witch Doctor",
    roles: ["Саппорт", "Нукер", "Контролер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 18,
    agility: 13,
    intellect: 22,
    image: dotaLogoImg,
    short: "Саппорт, Нукер, Контролер. Интеллект.",
    description: "Witch Doctor — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: саппорт, нукер, контролер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "lich",
    name: "Lich",
    roles: ["Саппорт", "Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 20,
    agility: 15,
    intellect: 24,
    image: dotaLogoImg,
    short: "Саппорт, Нукер. Интеллект.",
    description: "Lich — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: саппорт, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "ancient-apparition",
    name: "Ancient Apparition",
    roles: ["Саппорт", "Контролер", "Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 20,
    agility: 15,
    intellect: 25,
    image: dotaLogoImg,
    short: "Саппорт, Контролер, Нукер. Интеллект.",
    description: "Ancient Apparition — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: саппорт, контролер, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "shadow-shaman",
    name: "Shadow Shaman",
    roles: ["Саппорт", "Контролер", "Пушер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 23,
    agility: 16,
    intellect: 25,
    image: dotaLogoImg,
    short: "Саппорт, Контролер, Пушер. Интеллект.",
    description: "Shadow Shaman — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: саппорт, контролер, пушер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "ogre-magi",
    name: "Ogre Magi",
    roles: ["Саппорт", "Танк", "Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 23,
    agility: 14,
    intellect: 15,
    image: dotaLogoImg,
    short: "Саппорт, Танк, Нукер. Интеллект.",
    description: "Ogre Magi — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: саппорт, танк, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "rubick",
    name: "Rubick",
    roles: ["Саппорт", "Контролер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 21,
    agility: 23,
    intellect: 28,
    image: dotaLogoImg,
    short: "Саппорт, Контролер. Интеллект.",
    description: "Rubick — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: саппорт, контролер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "disruptor",
    name: "Disruptor",
    roles: ["Саппорт", "Контролер", "Нукер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 21,
    agility: 15,
    intellect: 20,
    image: dotaLogoImg,
    short: "Саппорт, Контролер, Нукер. Интеллект.",
    description: "Disruptor — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: саппорт, контролер, нукер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "jakiro",
    name: "Jakiro",
    roles: ["Саппорт", "Нукер", "Пушер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 25,
    agility: 10,
    intellect: 28,
    image: dotaLogoImg,
    short: "Саппорт, Нукер, Пушер. Интеллект.",
    description: "Jakiro — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: саппорт, нукер, пушер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "silencer",
    name: "Silencer",
    roles: ["Керри", "Саппорт", "Контролер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 19,
    agility: 22,
    intellect: 25,
    image: dotaLogoImg,
    short: "Керри, Саппорт, Контролер. Интеллект.",
    description: "Silencer — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: керри, саппорт, контролер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "necrophos",
    name: "Necrophos",
    roles: ["Керри", "Нукер", "Танк"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 18,
    agility: 12,
    intellect: 21,
    image: dotaLogoImg,
    short: "Керри, Нукер, Танк. Интеллект.",
    description: "Necrophos — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: керри, нукер, танк. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  },
  {
    id: "death-prophet",
    name: "Death Prophet",
    roles: ["Керри", "Нукер", "Пушер"],
    primaryAttribute: "Интеллект",
    battleType: "Дальний бой",
    strength: 21,
    agility: 14,
    intellect: 24,
    image: dotaLogoImg,
    short: "Керри, Нукер, Пушер. Интеллект.",
    description: "Death Prophet — герой Dota 2 с основным атрибутом «Интеллект». В игре выполняет роли: керри, нукер, пушер. Подходит для анализа характеристик, роли в команде и сравнения с другими героями.",
  }
]

const carouselHeroes = heroes.filter(hero => ['anti-mage', 'legion-commander', 'lion', 'crystal-maiden', 'earthshaker'].includes(hero.id))
const smallItems = heroes.filter(hero => ['anti-mage', 'legion-commander'].includes(hero.id))
const bigItems = heroes.filter(hero => ['lion', 'crystal-maiden', 'earthshaker'].includes(hero.id))
const smallItems2 = heroes.filter(hero => ['phantom-assassin', 'faceless-void'].includes(hero.id))

const attributeColor: Record<PrimaryAttribute, 'error' | 'success' | 'info'> = {
  Сила: 'error',
  Ловкость: 'success',
  Интеллект: 'info',
}

// ─── роутинг без дополнительных зависимостей ─────────────────────────────────

type Route =
  | { page: 'home' }
  | { page: 'table' }
  | { page: 'chart' }
  | { page: 'testing' }
  | { page: 'hero'; id: string }

type PageKey = Route['page']

function getRoute(): Route {
  const path = window.location.hash.replace(/^#\/?/, '').split('?')[0]
  const [page, id] = path.split('/')

  if (page === 'table') return { page: 'table' }
  if (page === 'chart') return { page: 'chart' }
  if (page === 'testing') return { page: 'testing' }
  if (page === 'heroes' && id) return { page: 'hero', id }

  return { page: 'home' }
}

function getHeroById(id: string) {
  return heroes.find(hero => hero.id === id)
}

// ─── общие компоненты ─────────────────────────────────────────────────────────

function Navbar({ activePage }: { activePage: PageKey }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [search, setSearch] = useState('')

  const goToSearchResult = () => {
    const value = search.trim().toLowerCase()
    if (!value) return

    const found = heroes.find(hero =>
      [hero.name, hero.primaryAttribute, hero.battleType, hero.short, ...hero.roles].some(field =>
        field.toLowerCase().includes(value),
      ),
    )

    if (found) {
      window.location.hash = `#/heroes/${found.id}`
      setSearch('')
    } else {
      window.location.hash = `#/table?search=${encodeURIComponent(value)}`
    }
  }

  const navButtonSx = {
    fontWeight: 700,
    borderRadius: 999,
    px: 2,
  }

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: '#f8f9fa' }}>
      <Toolbar sx={{ gap: 1, flexWrap: 'wrap' }}>
        <Typography variant="h6" component="div" sx={{ mr: 1, fontWeight: 900, color: '#1b2838' }}>
          Dota 2 Heroes
        </Typography>

        <Button href="#/" color={activePage === 'home' ? 'primary' : 'inherit'} sx={navButtonSx}>
          Главная
        </Button>
        <Button href="#/table" color={activePage === 'table' ? 'primary' : 'inherit'} sx={navButtonSx}>
          Таблица
        </Button>
        <Button href="#/chart" color={activePage === 'chart' ? 'primary' : 'inherit'} sx={navButtonSx}>
          Диаграмма
        </Button>
        <Button href="#/testing" color={activePage === 'testing' ? 'primary' : 'inherit'} sx={navButtonSx}>
          Проверь себя
        </Button>

        <Button
          color={activePage === 'hero' ? 'primary' : 'inherit'}
          onClick={event => setAnchorEl(event.currentTarget)}
          endIcon={<span style={{ fontSize: 10 }}>▼</span>}
          sx={navButtonSx}
        >
          Герои
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {carouselHeroes.map(hero => (
            <MenuItem
              key={hero.id}
              component="a"
              href={`#/heroes/${hero.id}`}
              onClick={() => setAnchorEl(null)}
            >
              {hero.name}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem component="a" href="#/table" onClick={() => setAnchorEl(null)}>
            Все герои в таблице
          </MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />

        <TextField
          size="small"
          placeholder="Найти героя"
          value={search}
          onChange={event => setSearch(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') goToSearchResult()
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ ml: 0.5, minWidth: 'auto', px: 1.5 }}
                    onClick={goToSearchResult}
                  >
                    Поиск
                  </Button>
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: { xs: '100%', sm: 280 } }}
        />
      </Toolbar>
    </AppBar>
  )
}

function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box sx={{ py: { xs: 4, md: 5 }, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 820, mx: 'auto' }}>
        {subtitle}
      </Typography>
    </Box>
  )
}

function Footer() {
  return (
    <Box component="footer" sx={{ textAlign: 'center', py: 2.5, mt: 4, borderTop: '1px solid #e0e0e0' }}>
      <Typography variant="body2" color="text.secondary">
        © 2025 | МОАиС | Капитонов Илья
      </Typography>
    </Box>
  )
}

// ─── главная страница ─────────────────────────────────────────────────────────

function Carousel() {
  const [active, setActive] = useState(0)
  const total = carouselHeroes.length
  const next = useCallback(() => setActive(current => (current + 1) % total), [total])
  const prev = () => setActive(current => (current - 1 + total) % total)

  useEffect(() => {
    const id = setInterval(next, 3500)
    return () => clearInterval(id)
  }, [next])

  return (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 360, md: 500 }, overflow: 'hidden', bgcolor: '#000' }}>
      {carouselHeroes.map((hero, index) => (
        <Box
          key={hero.id}
          component="a"
          href={`#/heroes/${hero.id}`}
          aria-label={`Открыть страницу героя ${hero.name}`}
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: index === active ? 1 : 0,
            pointerEvents: index === active ? 'auto' : 'none',
            transition: 'opacity 0.6s ease',
          }}
        >
          <Box component="img" src={hero.image} alt={hero.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.78))' }} />
          <Box sx={{ position: 'absolute', left: { xs: 24, md: 64 }, bottom: { xs: 42, md: 64 }, color: '#fff' }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {hero.name}
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 620, mt: 1 }}>
              {hero.short}
            </Typography>
          </Box>
        </Box>
      ))}

      <IconButton
        onClick={prev}
        sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={next}
        sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
      >
        <KeyboardArrowRight />
      </IconButton>

      <MobileStepper
        variant="dots"
        steps={total}
        position="static"
        activeStep={active}
        nextButton={null}
        backButton={null}
        sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', bgcolor: 'transparent', '& .MuiMobileStepper-dot': { bgcolor: 'rgba(255,255,255,0.5)' }, '& .MuiMobileStepper-dotActive': { bgcolor: '#fff' } }}
      />
    </Box>
  )
}

function ImageMosaic() {
  const left = heroes.filter(hero => ['anti-mage', 'crystal-maiden'].includes(hero.id))
  const right = heroes.filter(hero => ['legion-commander', 'earthshaker', 'lion'].includes(hero.id))

  return (
    <Container sx={{ py: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 1.5,
          alignItems: 'stretch',
        }}
      >
        <Box sx={{ display: 'grid', gap: 1.5, gridTemplateRows: { xs: 'repeat(2, 180px)', md: 'repeat(2, 210px)' } }}>
          {left.map(hero => (
            <Box
              key={hero.id}
              component="a"
              href={`#/heroes/${hero.id}`}
              sx={{ display: 'block', borderRadius: 3, overflow: 'hidden' }}
            >
              <Box component="img" src={hero.image} alt={hero.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'grid', gap: 1.5, gridTemplateRows: { xs: 'repeat(3, 150px)', md: '130px 270px 130px' } }}>
          {right.map(hero => (
            <Box
              key={hero.id}
              component="a"
              href={`#/heroes/${hero.id}`}
              sx={{ display: 'block', borderRadius: 3, overflow: 'hidden' }}
            >
              <Box component="img" src={hero.image} alt={hero.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

function SmallItems({ items }: { items: Hero[] }) {
  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={3} sx={{ justifyContent: 'space-evenly' }}>
        {items.map(hero => (
          <Grid key={hero.id} size={{ xs: 12, sm: 5 }}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Box component="a" href={`#/heroes/${hero.id}`} sx={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}>
                <Box component="img" src={hero.image} alt={hero.name} sx={{ height: 92, width: 150, objectFit: 'cover', borderRadius: 2, mb: 1, transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.04)' } }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>{hero.name}</Typography>
              <Typography variant="body2" color="text.secondary">{hero.short}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

function BigItems() {
  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {bigItems.map(hero => (
          <Grid key={hero.id} size={{ xs: 12, sm: 4 }}>
            <Card sx={{ bgcolor: '#1b2838', color: '#fff', height: '100%' }}>
              <CardActionArea component="a" href={`#/heroes/${hero.id}`} sx={{ height: '100%', color: 'inherit' }}>
                <CardMedia component="img" image={hero.image} alt={hero.name} sx={{ height: 210, objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 800 }}>{hero.name}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>{hero.short}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, textDecoration: 'underline', textAlign: 'right' }}>
                    Подробнее
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

function AboutBlock() {
  return (
    <Container sx={{ py: 3 }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, bgcolor: '#f4f6f8' }}>
        <Box component="img" src={dotaLogoImg} alt="Dota 2" sx={{ width: '100%', height: { xs: 150, md: 220 }, objectFit: 'cover', borderRadius: 3, mb: 3 }} />
        <Typography variant="h4" component="h2" sx={{ fontWeight: 900, mb: 2, textAlign: 'center' }}>
          Почему Dota 2?
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 900, mx: 'auto', lineHeight: 1.8 }}>
          Dota 2 — это стратегическая командная MOBA, где каждый герой отличается ролью, атрибутом, типом боя и стилем игры. В этой версии лабораторной данные вынесены в типизированный массив TypeScript, а страницы, фильтры, таблица и диаграмма работают как React-компоненты.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3, justifyContent: 'center' }}>
          <Button variant="contained" href="#/table">Открыть каталог</Button>
          <Button variant="outlined" href="https://www.dota2.com" target="_blank" rel="noreferrer">Официальный сайт</Button>
        </Stack>
      </Paper>
    </Container>
  )
}

function HomePage() {
  return (
    <>
      <Carousel />
      <ImageMosaic />
      <SmallItems items={smallItems} />
      <BigItems />
      <AboutBlock />
      <SmallItems items={smallItems2} />
    </>
  )
}

// ─── таблица с фильтрацией, сортировкой и настройкой столбцов ─────────────────

type Order = 'asc' | 'desc'
type ColumnId = 'image' | 'name' | 'roles' | 'primaryAttribute' | 'battleType' | 'strength' | 'agility' | 'intellect' | 'total'
type SortColumnId = Exclude<ColumnId, 'image' | 'roles'>

type Column = {
  id: ColumnId
  label: string
  sortable?: boolean
  align?: 'left' | 'right' | 'center'
  render: (hero: Hero) => ReactNode
}

function totalStats(hero: Hero) {
  return hero.strength + hero.agility + hero.intellect
}

const columns: Column[] = [
  {
    id: 'image',
    label: 'Фото',
    render: hero => (
      <Box component="a" href={`#/heroes/${hero.id}`} sx={{ display: 'inline-flex' }}>
        <Box component="img" src={hero.image} alt={hero.name} sx={{ width: 88, height: 58, objectFit: 'cover', borderRadius: 1 }} />
      </Box>
    ),
  },
  { id: 'name', label: 'Герой', sortable: true, render: hero => <strong>{hero.name}</strong> },
  { id: 'roles', label: 'Роль', render: hero => hero.roles.join(', ') },
  { id: 'primaryAttribute', label: 'Атрибут', sortable: true, render: hero => <Chip size="small" label={hero.primaryAttribute} color={attributeColor[hero.primaryAttribute]} /> },
  { id: 'battleType', label: 'Тип боя', sortable: true, render: hero => hero.battleType },
  { id: 'strength', label: 'Сила', sortable: true, align: 'right', render: hero => hero.strength },
  { id: 'agility', label: 'Ловкость', sortable: true, align: 'right', render: hero => hero.agility },
  { id: 'intellect', label: 'Интеллект', sortable: true, align: 'right', render: hero => hero.intellect },
  { id: 'total', label: 'Сумма', sortable: true, align: 'right', render: hero => totalStats(hero) },
]

function getSortValue(hero: Hero, orderBy: SortColumnId): string | number {
  if (orderBy === 'total') return totalStats(hero)
  return hero[orderBy]
}

function TablePage() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] ?? '')
  const initialSearch = params.get('search') ?? ''
  const [query, setQuery] = useState(initialSearch)
  const [roleFilter, setRoleFilter] = useState('all')
  const [attributeFilter, setAttributeFilter] = useState('all')
  const [battleFilter, setBattleFilter] = useState('all')
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<SortColumnId>('name')
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnId, boolean>>({
    image: true,
    name: true,
    roles: true,
    primaryAttribute: true,
    battleType: true,
    strength: true,
    agility: true,
    intellect: true,
    total: true,
  })

  const roleOptions = useMemo(() => Array.from(new Set(heroes.flatMap(hero => hero.roles))).sort((a, b) => a.localeCompare(b, 'ru')), [])
  const attributeOptions = useMemo(() => Array.from(new Set(heroes.map(hero => hero.primaryAttribute))), [])
  const battleOptions = useMemo(() => Array.from(new Set(heroes.map(hero => hero.battleType))), [])

  const filteredHeroes = useMemo(() => {
    const value = query.trim().toLowerCase()

    return heroes
      .filter(hero => roleFilter === 'all' || hero.roles.includes(roleFilter))
      .filter(hero => attributeFilter === 'all' || hero.primaryAttribute === attributeFilter)
      .filter(hero => battleFilter === 'all' || hero.battleType === battleFilter)
      .filter(hero => {
        if (!value) return true

        return [hero.name, hero.primaryAttribute, hero.battleType, hero.short, hero.description, ...hero.roles]
          .some(field => field.toLowerCase().includes(value))
      })
      .sort((first, second) => {
        const a = getSortValue(first, orderBy)
        const b = getSortValue(second, orderBy)
        const result = typeof a === 'number' && typeof b === 'number'
          ? a - b
          : String(a).localeCompare(String(b), 'ru')

        return order === 'asc' ? result : -result
      })
  }, [attributeFilter, battleFilter, order, orderBy, query, roleFilter])

  const shownColumns = columns.filter(column => visibleColumns[column.id])
  const visibleCount = Object.values(visibleColumns).filter(Boolean).length

  const toggleColumn = (id: ColumnId) => {
    setVisibleColumns(current => {
      if (current[id] && visibleCount <= 1) return current
      return { ...current, [id]: !current[id] }
    })
  }

  const handleSort = (id: SortColumnId) => {
    const isAsc = orderBy === id && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(id)
  }

  const resetFilters = () => {
    setQuery('')
    setRoleFilter('all')
    setAttributeFilter('all')
    setBattleFilter('all')
    setOrder('asc')
    setOrderBy('name')
  }

  return (
    <Container sx={{ py: 3 }}>
      <PageTitle
        title={`Каталог героев Dota 2 — ${heroes.length} героев`}
        subtitle="Таблица сделана на TypeScript: данные типизированы, строки фильтруются, столбцы можно скрывать, а сортировка работает по клику на заголовки."
      />

      <Paper sx={{ p: 2, mb: 3 }} variant="outlined">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Поиск"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Название, роль, атрибут..."
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2.5 }}>
            <TextField fullWidth select label="Роль" value={roleFilter} onChange={event => setRoleFilter(event.target.value)}>
              <MenuItem value="all">Все</MenuItem>
              {roleOptions.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2.5 }}>
            <TextField fullWidth select label="Атрибут" value={attributeFilter} onChange={event => setAttributeFilter(event.target.value)}>
              <MenuItem value="all">Все</MenuItem>
              {attributeOptions.map(attribute => <MenuItem key={attribute} value={attribute}>{attribute}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <TextField fullWidth select label="Тип боя" value={battleFilter} onChange={event => setBattleFilter(event.target.value)}>
              <MenuItem value="all">Все</MenuItem>
              {battleOptions.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => undefined}>Применить фильтры</Button>
          <Button variant="outlined" onClick={resetFilters}>Сбросить</Button>
          <Button variant="text" href="#/chart">Открыть диаграмму</Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
          Управление столбцами
        </Typography>
        <FormGroup row>
          {columns.map(column => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  checked={visibleColumns[column.id]}
                  onChange={() => toggleColumn(column.id)}
                  disabled={visibleColumns[column.id] && visibleCount <= 1}
                />
              }
              label={column.label}
            />
          ))}
        </FormGroup>
      </Paper>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 2, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}>
        <Typography variant="body1" color="text.secondary">
          Найдено героев: <strong>{filteredHeroes.length}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Фото и имена ведут на динамические страницы героев.
        </Typography>
      </Stack>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              {shownColumns.map(column => (
                <TableCell key={column.id} align={column.align ?? 'left'} sx={{ fontWeight: 800 }}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id as SortColumnId)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHeroes.map(hero => (
              <TableRow key={hero.id} hover>
                {shownColumns.map(column => (
                  <TableCell key={column.id} align={column.align ?? 'left'}>
                    {column.render(hero)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {!filteredHeroes.length && (
              <TableRow>
                <TableCell colSpan={shownColumns.length} align="center" sx={{ py: 6 }}>
                  Ничего не найдено. Измените фильтры или поисковый запрос.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

// ─── динамическая страница по клику на рисунки ────────────────────────────────

function HeroPage({ id }: { id: string }) {
  const hero = getHeroById(id)

  if (!hero) {
    return (
      <Container sx={{ py: 6 }}>
        <PageTitle title="Герой не найден" subtitle="Такой страницы нет. Можно вернуться к таблице и выбрать героя из списка." />
        <Button variant="contained" href="#/table">Перейти к таблице</Button>
      </Container>
    )
  }

  const stats = [
    { label: 'Роль', value: hero.roles.join(', ') },
    { label: 'Основной атрибут', value: hero.primaryAttribute },
    { label: 'Тип боя', value: hero.battleType },
    { label: 'Сила', value: hero.strength },
    { label: 'Ловкость', value: hero.agility },
    { label: 'Интеллект', value: hero.intellect },
    { label: 'Сумма характеристик', value: totalStats(hero) },
  ]

  return (
    <Box>
      <Box
        sx={{
          minHeight: { xs: 380, md: 540 },
          display: 'flex',
          alignItems: 'flex-end',
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.82)), url(${hero.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
        }}
      >
        <Container sx={{ py: { xs: 5, md: 7 } }}>
          <Chip label="Динамическая страница" sx={{ bgcolor: 'rgba(255,255,255,0.9)', mb: 2 }} />
          <Typography variant="h2" component="h1" sx={{ fontWeight: 900, mb: 1 }}>
            {hero.name}
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 720 }}>
            {hero.short}
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 900, mb: 2 }}>
                Описание героя
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                {hero.description}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                Роли
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {hero.roles.map(role => <Chip key={role} label={role} color="primary" variant="outlined" />)}
              </Stack>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 900, mb: 2 }}>
                Характеристики
              </Typography>
              <Stack spacing={1.5}>
                {stats.map(stat => (
                  <Box key={stat.label} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Typography color="text.secondary">{stat.label}</Typography>
                    <Typography sx={{ fontWeight: 800, textAlign: 'right' }}>{stat.value}</Typography>
                  </Box>
                ))}
              </Stack>
              <Divider sx={{ my: 3 }} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button fullWidth variant="contained" href="#/table">К таблице</Button>
                <Button fullWidth variant="outlined" href="#/chart">К диаграмме</Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

// ─── страница с диаграммой ────────────────────────────────────────────────────

type ChartGroupBy = 'Герой' | 'Атрибут' | 'Тип боя' | 'Роль'
type ChartKind = 'bar' | 'line' | 'pie'
type ChartMetricKey = 'strength' | 'agility' | 'intellect' | 'total'

type ChartRow = {
  id: number
  group: string
  strength: number
  agility: number
  intellect: number
  total: number
  count: number
}

const chartMetricLabels: Record<ChartMetricKey, string> = {
  strength: 'Сила',
  agility: 'Ловкость',
  intellect: 'Интеллект',
  total: 'Сумма характеристик',
}

function averageBy(items: Hero[], getter: (hero: Hero) => number) {
  if (!items.length) return 0

  const value = items.reduce((sum, hero) => sum + getter(hero), 0) / items.length
  return Math.round(value * 10) / 10
}

function buildChartRows(source: Hero[], groupBy: ChartGroupBy): ChartRow[] {
  const groups = new Map<string, Hero[]>()

  source.forEach(hero => {
    if (groupBy === 'Роль') {
      hero.roles.forEach(role => {
        groups.set(role, [...(groups.get(role) ?? []), hero])
      })
      return
    }

    const key =
      groupBy === 'Герой'
        ? hero.name
        : groupBy === 'Атрибут'
          ? hero.primaryAttribute
          : hero.battleType

    groups.set(key, [...(groups.get(key) ?? []), hero])
  })

  return Array.from(groups.entries())
    .map(([group, items], index) => ({
      id: index + 1,
      group,
      strength: averageBy(items, hero => hero.strength),
      agility: averageBy(items, hero => hero.agility),
      intellect: averageBy(items, hero => hero.intellect),
      total: averageBy(items, hero => totalStats(hero)),
      count: items.length,
    }))
    .sort((a, b) => b.total - a.total)
}

function ChartPage() {
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [attributeFilter, setAttributeFilter] = useState('all')
  const [battleFilter, setBattleFilter] = useState('all')
  const [groupBy, setGroupBy] = useState<ChartGroupBy>('Атрибут')
  const [chartType, setChartType] = useState<ChartKind>('bar')
  const [visibleMetrics, setVisibleMetrics] = useState<Record<ChartMetricKey, boolean>>({
    strength: true,
    agility: true,
    intellect: true,
    total: false,
  })

  const roleOptions = useMemo(
    () => Array.from(new Set(heroes.flatMap(hero => hero.roles))).sort((a, b) => a.localeCompare(b, 'ru')),
    [],
  )

  const attributeOptions = useMemo(
    () => Array.from(new Set(heroes.map(hero => hero.primaryAttribute))),
    [],
  )

  const battleOptions = useMemo(
    () => Array.from(new Set(heroes.map(hero => hero.battleType))),
    [],
  )

  const filteredHeroes = useMemo(() => {
    const value = query.trim().toLowerCase()

    return heroes
      .filter(hero => roleFilter === 'all' || hero.roles.includes(roleFilter))
      .filter(hero => attributeFilter === 'all' || hero.primaryAttribute === attributeFilter)
      .filter(hero => battleFilter === 'all' || hero.battleType === battleFilter)
      .filter(hero => {
        if (!value) return true

        return [
          hero.name,
          hero.primaryAttribute,
          hero.battleType,
          hero.short,
          hero.description,
          ...hero.roles,
        ].some(field => field.toLowerCase().includes(value))
      })
  }, [query, roleFilter, attributeFilter, battleFilter])

  const chartRows = useMemo(
    () => buildChartRows(filteredHeroes, groupBy),
    [filteredHeroes, groupBy],
  )

  const displayedChartRows = groupBy === 'Герой'
    ? chartRows.slice(0, 15)
    : chartRows

  const activeSeries = (Object.keys(chartMetricLabels) as ChartMetricKey[])
    .filter(key => visibleMetrics[key])
    .map(key => ({
      dataKey: key,
      label: chartMetricLabels[key],
    }))

  const safeSeries = activeSeries.length
    ? activeSeries
    : [{ dataKey: 'total', label: chartMetricLabels.total }]

  const pieMetric = safeSeries[0].dataKey as ChartMetricKey
  const pieData = displayedChartRows.map(item => ({
    id: item.id,
    value: Number(item[pieMetric]),
    label: item.group,
  }))

  const toggleMetric = (key: ChartMetricKey) => {
    setVisibleMetrics(current => ({
      ...current,
      [key]: !current[key],
    }))
  }

  const resetFilters = () => {
    setQuery('')
    setRoleFilter('all')
    setAttributeFilter('all')
    setBattleFilter('all')
    setGroupBy('Атрибут')
    setChartType('bar')
    setVisibleMetrics({
      strength: true,
      agility: true,
      intellect: true,
      total: false,
    })
  }

  return (
    <Container sx={{ py: 3 }}>
      <PageTitle
        title="Диаграммы героев Dota 2"
        subtitle="Диаграммы строятся по текущей выборке. Фильтры, группировка, тип диаграммы и набор показателей меняют результат сразу на странице."
      />

      <Paper sx={{ p: 2, mb: 3 }} variant="outlined">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Поиск"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Название, роль, атрибут..."
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <TextField
              fullWidth
              select
              label="Роль"
              value={roleFilter}
              onChange={event => setRoleFilter(event.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {roleOptions.map(role => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <TextField
              fullWidth
              select
              label="Атрибут"
              value={attributeFilter}
              onChange={event => setAttributeFilter(event.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {attributeOptions.map(attribute => (
                <MenuItem key={attribute} value={attribute}>{attribute}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <TextField
              fullWidth
              select
              label="Тип боя"
              value={battleFilter}
              onChange={event => setBattleFilter(event.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {battleOptions.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              select
              label="Группировать"
              value={groupBy}
              onChange={event => setGroupBy(event.target.value as ChartGroupBy)}
            >
              <MenuItem value="Герой">По героям</MenuItem>
              <MenuItem value="Атрибут">По атрибуту</MenuItem>
              <MenuItem value="Тип боя">По типу боя</MenuItem>
              <MenuItem value="Роль">По роли</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
              Тип диаграммы
            </Typography>

            <RadioGroup
              value={chartType}
              onChange={event => setChartType(event.target.value as ChartKind)}
            >
              <FormControlLabel value="bar" control={<Radio />} label="Гистограмма" />
              <FormControlLabel value="line" control={<Radio />} label="Линейная" />
              <FormControlLabel value="pie" control={<Radio />} label="Круговая" />
            </RadioGroup>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
              На диаграмме показать
            </Typography>

            <FormGroup row>
              {(Object.keys(chartMetricLabels) as ChartMetricKey[]).map(key => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={visibleMetrics[key]}
                      onChange={() => toggleMetric(key)}
                    />
                  }
                  label={chartMetricLabels[key]}
                />
              ))}
            </FormGroup>

            <Typography variant="body2" color="text.secondary">
              Для круговой диаграммы используется первый выбранный показатель. Если группировка по героям, выводятся первые 15 значений, чтобы график не был перегружен.
            </Typography>
          </Grid>
        </Grid>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={resetFilters}>
            Сбросить настройки
          </Button>
          <Button variant="text" href="#/table">
            Вернуться к таблице
          </Button>
        </Stack>
      </Paper>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        После фильтрации найдено героев: <strong>{filteredHeroes.length}</strong>
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 3, overflow: 'hidden' }}>
        {displayedChartRows.length ? (
          chartType === 'bar' ? (
            <BarChart
              dataset={displayedChartRows}
              xAxis={[{ scaleType: 'band' as const, dataKey: 'group' }]}
              yAxis={[{ label: 'Среднее значение' }]}
              series={safeSeries}
              height={420}
              slotProps={{
                legend: {
                  position: {
                    vertical: 'bottom',
                    horizontal: 'center',
                  },
                },
              }}
            />
          ) : chartType === 'line' ? (
            <LineChart
              dataset={displayedChartRows}
              xAxis={[{ scaleType: 'band' as const, dataKey: 'group' }]}
              yAxis={[{ label: 'Среднее значение' }]}
              series={safeSeries}
              height={420}
              slotProps={{
                legend: {
                  position: {
                    vertical: 'bottom',
                    horizontal: 'center',
                  },
                },
              }}
            />
          ) : (
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 35,
                  paddingAngle: 2,
                },
              ]}
              height={420}
              slotProps={{
                legend: {
                  position: {
                    vertical: 'bottom',
                    horizontal: 'center',
                  },
                },
              }}
            />
          )
        ) : (
          <Typography sx={{ py: 6, textAlign: 'center' }}>
            Нет данных для построения диаграммы. Измени фильтры.
          </Typography>
        )}
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
          Сводная таблица по диаграмме
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Группа</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>Количество</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>Сила</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>Ловкость</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>Интеллект</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>Сумма</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {chartRows.map(row => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.group}</TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                  <TableCell align="right">{row.strength}</TableCell>
                  <TableCell align="right">{row.agility}</TableCell>
                  <TableCell align="right">{row.intellect}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}

              {!chartRows.length && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    Нет данных
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute)

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [route])

  return (
    <Box id="top" sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      <Navbar activePage={route.page} />
      {route.page === 'home' && <HomePage />}
      {route.page === 'table' && <TablePage />}
      {route.page === 'chart' && <ChartPage />}
      {route.page === 'testing' && <Testing />}
      {route.page === 'hero' && <HeroPage id={route.id} />}
      <Footer />
    </Box>
  )
}
