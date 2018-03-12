import React from 'react'
import styled from 'styled-components'

import { Loading } from 'components'

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    margin-top: 200px;
  }
`

function PageLoading() {
  return (
    <LoadingWrapper>
      <Loading />
    </LoadingWrapper>
  )
}

export default PageLoading
