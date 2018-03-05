import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  :visited,
  :hover,
  :active {
    color: inherit;
  }
`

export default StyledLink
