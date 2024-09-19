import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <>
      <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand style={{ color: 'white' }} className='fs-5 fw-bolder'>
            <i className="fa-solid fa-address-book"></i>
            {' '}Employee Management App
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header