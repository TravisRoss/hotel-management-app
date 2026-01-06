import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"

const H1 = styled.h1`
  color: red;
`

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem;
`;

const StyledApp = styled.div`
  text-align: center;
`

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>hello world</H1>
        <Button>Click me</Button>
      </StyledApp>
    </>
  )
}

export default App
