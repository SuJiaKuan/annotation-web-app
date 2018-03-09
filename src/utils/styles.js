import Color from 'color'

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
