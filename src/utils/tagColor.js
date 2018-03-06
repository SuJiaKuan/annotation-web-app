import * as colors from 'material-ui/styles/colors'

const MAIN_COLORS = [
  'red',
  'indigo',
  'teal',
  'yellow',
  'pink',
  'blue',
  'green',
  'amber',
  'purple',
  'lightBlue',
  'lightGreen',
  'deepPurple',
  'cyan',
  'lime',
  'deepOrange',
]

const SUB_COLORS = ['A400', '800', '300', '500', '400', '900', 'A200', '500', '200', '600', '700']

// Return a tag color by the given tag index.
export default function tagColor(idx) {
  if (idx >= MAIN_COLORS.length * SUB_COLORS.length) {
    return colors['grey500']
  }

  const mainColor = MAIN_COLORS[idx % MAIN_COLORS.length]
  const subColor = SUB_COLORS[parseInt(idx / MAIN_COLORS.length, 10)]
  const color = colors[`${mainColor}${subColor}`]

  return color
}
