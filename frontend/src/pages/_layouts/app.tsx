import { Outlet } from 'react-router-dom'
import BottomBar from '../../components/bottom-bar'
import styled from '@emotion/styled'

const Container = styled.div`
  margin-bottom: 56px;
`

export function AppLayout() {
  return (
    <>
      <BottomBar />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
