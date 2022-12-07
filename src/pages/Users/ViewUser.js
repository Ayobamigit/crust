import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useMatch, useNavigate } from 'react-router'
import Layout from '../../components/layout/Layout'
import SubmitLoader from '../../components/submitloader/SubmitLoader'
import withTimeout from '../../hoc/withTimeout'
import axios from '../../plugins/axios'
import swal from '../../plugins/swal'
import { updateUser, viewUsers } from '../../plugins/url'

const ViewUser = () => {
  const navigate = useNavigate()
  const match = useMatch('/user/:id');
  const id = match ?  match.params.id : ''
  const [state, setState] = useState({
    firstname:'',
    lastname:'',
    username:'',
    email:'',
    clientId:'',
    loading: false,
    readOnly: true
  })

  const {loading, firstname, lastname, email, username, readOnly} = state;

  const onChange =(e)=>{
    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
  }

  const onClickEdit = () =>{
    setState(state=>({
      ...state,
      readOnly: !readOnly
    }))
  }

  useEffect(()=>{
    axios({
      method: 'get',
      url:`${viewUsers}/${id}`,
    }).then(res=>{
      if(res.data.respCode === '00'){
        const {firstname, lastname, email, username} = res.data.respBody;
        setState(state=>({
          ...state,
          firstname,
          lastname,
          email,
          username
        }))
      }
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const onUpdateUser = (e) =>{
    e.preventDefault();
    setState(state=>({
      ...state,
      loading: true
    }))

    let reqbody = {
      firstname,
      lastname,
      email,
    }

    axios({
      method: 'patch',
      url:`${updateUser}`,
      data: reqbody
    }).then(res=>{
      setState(state=>({
        ...state,
        loading: false
      }))
      if(res.data.respCode === '00'){
        swal.fire({
          // type:'success',
          title: 'Successful....',
          icon: 'success',
          text: `User updated successfully`
      })
        navigate('/users')
      }
    }).catch(err=>{
      console.log(err)
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`,
    })
    })
  }
  return (
    <Layout title="Users">
      <Container>
        <div className="TableList" style={{width:"70%"}}>
        
        <Row className='align-items-center'>
          <Col lg={9}>
          <h6 className="crust-dark-blue-light pt-25 ml-25 mb-20">
              User Information
          </h6>
          </Col>
          
          {/* <Col lg={3}>
              <button className="button-primary" onClick={onClickEdit}>
                  Edit Information 
              </button>
          </Col> */}
        </Row>

          <div className="line"></div>

          <form className="form-body" onSubmit={onUpdateUser}>

            <div className="info-body">

              <Row className="formgroup">

                <Col xl={6} lg={6}>
                  <label>First Name</label>
                  <div className="input-group">
                    <input  
                      className="formcontrol" 
                      type="text" 
                      name="firstname"
                      onChange = {onChange}
                      value={firstname}
                      disabled = {readOnly}
                    />
                  </div>
                </Col>  

                <Col lg={6}>
                      <label>Last Name:</label>
                      <div className="input-group">
                        <input 
                            type="text" 
                            className="formcontrol"  
                            onChange={onChange}
                            name="lastname"
                            value={lastname}
                            disabled = {readOnly}
                          />
                      </div>
                </Col>
              </Row>
              <Row className="formgroup">
                <Col lg={6}>
                      <label>User Name:</label>
                      <div className="input-group">
                        <input 
                            type="text" 
                            className="formcontrol" 
                            onChange={onChange}
                            name="username"
                            value={username}
                            disabled
                          />
                      </div>
                </Col>

                <Col lg={6}>
                      <label>Email:</label>
                      <div className="input-group">
                        <input 
                        type="text" 
                        className="formcontrol"
                        onChange={onChange}
                        name="email"
                        value={email}
                        disabled = {readOnly}
                        />
                      </div>
                </Col>
              </Row>


              {/* <Row className="formgroup">
                <Col lg={6}>
                      <label>Client:</label>
                      <div className="input-group">
                        <select 
                          type="text" 
                          className="formcontrol"
                          onChange={onChange}
                          name = "clientId"
                          value={clientId}
                          disabled = {readOnly} 
                        >
                          <option>Select Client</option>
                        </select>
                      </div>
                </Col>
              </Row> */}

            </div>

            { !readOnly&& <div className="textend" style={{padding:"30px"}}>
              <button
                  type='submit' 
                  className="button-primary px-9 py-04" 
                  disabled={loading}
              >
                  {
                    loading ?
                    <SubmitLoader />
                    :
                    'Update User'
                  }
              </button>
            </div>}
          </form>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(ViewUser)