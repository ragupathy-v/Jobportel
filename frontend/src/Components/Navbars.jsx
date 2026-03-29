import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Styles/Navbar.css'
import imag from '../Assert/logo/PortelLogo.png'
import { Link } from 'react-router-dom';

import useUser from '../hooks/UseUser';
import { AuthContex } from '../Context/AuthProvider';
import { useContext } from 'react';

function Navbars() {
  const { setIsLoggedIn } = useContext(AuthContex)
  const user = useUser()

  const logout = () => {
    localStorage.removeItem('accesstoken')
    localStorage.removeItem('refreshtoken')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav className='header'>
        <div className="bgcolor d-flex justify-content-around align-items-center d-sm-none d-lg-block">
          {user?.user_type == 'employee'
            ? <Link to='/job' className='about'>Jobs</Link>
            : <Link to='/jobpost' className='about'>Post Job</Link>}
          {user?.user_type == 'employee'
            ? <Link className='explore' to='/companies'>Companies</Link>
            : <Link className='explore' to='/job'>Review Application</Link>}
           {user?.user_type==='employee'&& <Link className='explore' to='/applicationstatus'>Application Status</Link>}
        </div>

        <div>
          <img alt='logo' className='img' src={imag} />
        </div>

        <div className='bgcolor'>
          <Link to='/home' className='explore'>Home</Link>
          <Link to='/Companyregister' className='explore'>
            {user?.user_type == 'employee' ? 'Create Company' : 'Profile'}
          </Link>
          {user?.user_type == 'employee' && (
            <Link className='login' to='/user'>Profile</Link>
          )}
          {/* Logout — distinct red outlined button */}
          <Link className='logout-btn' onClick={logout} to='/'>Logout</Link>
        </div>
      </nav>

      {/* ── Mobile Navbar (Bootstrap) ── */}
      <Navbar collapseOnSelect id='nav' expand="lg" fixed='top' className="d-lg-none">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <img className="img" src={imag} alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

              <Nav.Link as={Link} to="/home">Home</Nav.Link>

              {user?.user_type == 'employee'
                ? <Nav.Link as={Link} to="/job">Jobs</Nav.Link>
                : <Nav.Link as={Link} to="/jobpost">Post Job</Nav.Link>}

              {user?.user_type == 'employee'
                ? <Nav.Link as={Link} to="/companies">Companies</Nav.Link>
                : <Nav.Link as={Link} to="/job">Review Application</Nav.Link>}

              {user?.user_type==='employee'&&<Nav.Link as={Link} to="/job">Application status</Nav.Link>} 
                
              <Nav.Link as={Link} to="/Companyregister">
                {user?.user_type == 'employee' ? 'Create Company' : 'Profile'}
              </Nav.Link>

              {user?.user_type == 'employee' && (
                <Nav.Link as={Link} to="/user">Profile</Nav.Link>
              )}

              {/* Mobile logout — red tinted */}
              <Nav.Link
                as={Link}
                to="/"
                className="logout-mobile"
                onClick={logout}
              >
                Logout
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navbars