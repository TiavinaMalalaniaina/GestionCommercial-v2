import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import API_CONFIG from 'src/apiconfig'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const [exception, setException] = useState('');
  const [visible, setVisible] = useState(false);
  const handleSubmit=(e)=>{
    e.preventDefault()
      const formData = new FormData(e.target)
      fetch(API_CONFIG.LOGIN + "?email="+formData.get("email")+"&password="+formData.get("password"))
      .then(res => res.json())
      .then(res => {
        if (res.exception == "" || res.exception == null || res.exception === 'null') {
          alert("Vous etes connected")
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          navigate('/dept/products/sended')
        } else {
          setException(res.exception)
          setVisible(true)
        }
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <CAlert color="danger" visible={visible}>
                      {exception}
                    </CAlert>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" name='email' required/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name='password'
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                      <CButton type='submit' lg>
                        LOGIN
                      </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
