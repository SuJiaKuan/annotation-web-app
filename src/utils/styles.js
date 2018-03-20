import Color from 'color'
import * as colors from 'material-ui/styles/colors'

const MAIN_COLORS = [
  'red',
  'indigo',
  'teal',
  'yellow',
  'purple',
  'lime',
  'green',
  'amber',
  'pink',
  'lightBlue',
  'lightGreen',
  'deepPurple',
  'cyan',
  'deepOrange',
  'blue',
]

const SUB_COLORS = ['A400', '800', '300', '500', '400', '900', 'A200', '500', '200', '600', '700']

// Return a label color by the given number.
export function labelColor(num) {
  if (num >= MAIN_COLORS.length * SUB_COLORS.length) {
    return colors['grey500']
  }

  const mainColor = MAIN_COLORS[num % MAIN_COLORS.length]
  const subColor = SUB_COLORS[SUB_COLORS.length - num % SUB_COLORS.length - 1]
  const color = colors[`${mainColor}${subColor}`]

  return color
}

// Return RGBA string for a given RGB color and alpha.
export function rgba(color, alpha) {
  return Color(color)
    .alpha(alpha)
    .string()
}

// Return pixel string for a given number.
export function px(num) {
  return `${parseInt(num, 10)}px`
}
