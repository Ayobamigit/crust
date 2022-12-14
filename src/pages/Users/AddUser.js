import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Layout from '../../components/layout/Layout'
import SubmitLoader from '../../components/submitloader/SubmitLoader'
import withTimeout from '../../hoc/withTimeout'
import axios from '../../plugins/axios'
import swal from '../../plugins/swal'
import { createUser, viewClients } from '../../plugins/url'

const AddUser = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    firstname:'',
    lastname:'',
    userType:'ADMIN',
    username:'',
    email:'',
    clientId:'',
    loading: false,
    clientList:[]
  })

  const {loading, firstname, lastname, userType, email, clientId, clientList, username} = state;

  const onChange =(e)=>{
    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
  }

  const getAllClients = () =>{
    let reqBody = {
      pageNo: 0,
      pageSize:100,
      sortBy: 'id'
    }
  
    axios({
      method: 'post',
      url:`${viewClients}`,
      data:reqBody
    }).then(res=>{
      if(res.data.respCode === '00'){
        setState(state=>({
          ...state,
          clientList: res.data.respBody.content,
        }))
      }
    }).catch(err=>{
      console.log(err)
    })
  
  }


  useEffect(()=>{
    getAllClients();
  },[])

const onCreateUser = (e) =>{
  e.preventDefault();
  setState(state=>({
    ...state,
    loading: true
  }))

  let reqbody = {
    firstname,
    lastname,
    userType,
    username,
    email,
    clientId
  }

  axios({
    method: 'post',
    url:`${createUser}`,
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
        text: `User created successfully`
    })
      navigate('/users')
    }
  }).catch(err=>{
    setState(state=>({
      ...state,
      loading: false
    }))
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${err.response.data.message}`,
  })
  })
}
  return (
    <Layout title="Add Users">
      <Container>
        <div className="TableList" style={{width:"70%"}}>
        
          <h6 className="crust-dark-blue-light pt-25 ml-25 mb-20">
              User Details
          </h6>

          <div className="line"></div>

          <form className="form-body" onSubmit={onCreateUser}>

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
                      required
                    />
                  </div>
                </Col>  

                <Col lg={6}>
                      <label>Last Name:</label>
                      <div className="input-group">
                        <input 
                            type="text" 
                            className="formcontrol" 
                            required 
                            onChange={onChange}
                            name="lastname"
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
                            required 
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
                        required
                        />
                      </div>
                </Col>
              </Row>


              <Row className="formgroup">
                <Col lg={6}>
                      <label>Client:</label>
                      <div className="input-group">
                        <select 
                          type="text" 
                          className="formcontrol"
                          onChange={onChange}
                          name = "clientId"
                          required 
                        >
                          <option>Select Client</option>
                          {
                            clientList ?
                            clientList.map((client, i)=>{
                              return (
                              <option value={client.id} key={i}>
                                {client.clientName}
                              </option>
                              )
                            })
                            :
                            null
                          }
                        </select>
                      </div>
                </Col>
              </Row>

            </div>

            <div className="textend" style={{padding:"30px"}}>
              <button
                  type='submit' 
                  className="button-primary px-9 py-04" 
                  disabled={loading}
              >
                  {
                    loading ?
                    <SubmitLoader />
                    :
                    'Create User'
                  }
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(AddUser)