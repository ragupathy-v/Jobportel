

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Styles/Navbar.css'
import imag from '../Assert/logo/PortelLogo.png'
import { Link } from 'react-router-dom';

import useUser from '../hooks/UseUser';
function Navbars() {
   
    const user=useUser()

  return (
    <>
    <nav className='header'>
      <div className="bgcolor d-flex justify-content-around align-items-center d-sm-none d-lg-block">   
       {user?.user_type=='employee' ? <Link to='/job'className='about'>Jobs</Link>: <Link to='/jobpost'className='about'>Post job</Link>}
       {user?.user_type=='employee'? <Link className='explore' to='/companies'>Companies</Link> :  <Link className='explore' to='/job'>review application</Link>}
      </div>
      <div>
      <img alt='logo' className='img' src={imag}></img>
      </div>
      <div className='bgcolor'>
        <Link to='/home' className='explore' > Home</Link>
        <Link to='/Companyregister' className='explore' >{user?.user_type=='employee'?'create company':'company'}</Link>
       {user?.user_type=='employee' && <Link className='login' to='/user'>profile</Link>}
      </div>
      </nav>

      <Navbar collapseOnSelect id='nav' expand="lg" fixed='top' className="d-lg-none">
        <Container>
          <Navbar.Brand href="#">
            <img  className="img" src='ww' alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="align-items-center">
            <Nav className="w-100">
              <Nav.Link href="#" className="about">About LetsUpgrade</Nav.Link>
              <Nav.Link href="#" className="explore">Explore Program</Nav.Link>
              <Nav.Link href="#" className="refer">Refer & Earn</Nav.Link>
              <Nav.Link href="#" className="login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navbars