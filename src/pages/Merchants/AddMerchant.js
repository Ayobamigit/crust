import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Layout from '../../components/layout/Layout'
import SubmitLoader from '../../components/submitloader/SubmitLoader'
import withTimeout from '../../hoc/withTimeout'
import axios from '../../plugins/axios'
import swal from '../../plugins/swal'
import { createMerchant, viewClients } from '../../plugins/url'

const AddMerchant = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    merchantID:'',
    firstName:'',
    lastName:'',
    gender:'',
    merchantstate:'',
    countryCode:'',
    clientId:'',
    currencyCode:'',
    merchantNameAndLocation:'',
    address:'',
    merchantCategoryCode:'',
    clientList:[],
    loading: false
  })

  const {loading, merchantID, firstName, lastName, gender, merchantstate, countryCode, clientId, currencyCode,
    merchantNameAndLocation, address, merchantCategoryCode, clientList} = state;

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
  const onCreateMerchant = (e) =>{
    e.preventDefault();
    setState(state=>({
      ...state,
      loading: true
    }))

    let reqbody = {
      merchantID,
      firstName,
      lastName,
      gender,
      state:merchantstate,
      countryCode,
      clientId,
      currencyCode,
      address,
      merchantCategoryCode,
      merchantNameAndLocation,
    }

    axios({
      method: 'post',
      url:`${createMerchant}`,
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
          text: `Merchant created successfully`
      })
        navigate('/merchants')
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
    <Layout title="Add Merchant">
      <Container>
        <div className="TableList" style={{width:"80%"}}>
        
          <h6 className="crust-dark-blue-light pt-25 ml-25 mb-20">
              Merchant Details
          </h6>

          <div className="line"></div>

          <form className="form-body" onSubmit={onCreateMerchant}>

            <div className="info-body">

              <Row className="formgroup">

                <Col lg={4}>
                  <label>Merchant ID</label>
                  <div className="input-group">
                    <input  
                      className="formcontrol" 
                      type="text" 
                      name="merchantID"
                      onChange = {onChange}
                      required
                    />
                  </div>
                </Col>  

                <Col lg={4}>
                  <label>First Name:</label>
                  <div className="input-group">
                    <input 
                        type="text" 
                        className="formcontrol" 
                        onChange={onChange}
                        name="firstName"
                        required 
                      />
                  </div>
                </Col>

                <Col lg={4}>
                  <label>Last Name:</label>
                  <div className="input-group">
                    <input 
                        type="text" 
                        className="formcontrol" 
                        onChange={onChange}
                        name="lastName"
                        required 
                      />
                  </div>
                </Col>
              </Row>
              <Row className="formgroup">
                <Col lg={4}>
                  <label>Gender:</label>
                  <div className="input-group">
                    <select 
                        type="text" 
                        className="formcontrol" 
                        onChange={onChange}
                        name="gender"
                        required 
                      >
                        <option value="">Select gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
                  </div>
                </Col>

                <Col lg={4}>
                  <label>State:</label>
                  <div className="input-group">
                    <input 
                        type="text" 
                        className="formcontrol" 
                        onChange={onChange}
                        name="merchantstate"
                        required 
                      />
                  </div>
                </Col>

                <Col lg={4}>
                  <label>Country Code:</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "countryCode"
                      required 
                    />
                  </div>
                </Col>
              </Row>


              <Row className="formgroup">
                <Col lg={4}>
                  <label>Merchant Category Code:</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "merchantCategoryCode"
                      required 
                    />
                  </div>
                </Col>
                <Col lg={4}>
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
                <Col lg={4}>
                  <label>Currency Code:</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "currencyCode"
                      required 
                    />
                  </div>
                </Col>
              </Row>

              <Row className="formgroup">
                <Col lg={6}>
                  <label>Merchant name and location:</label>
                  <div className="input-group">
                    <textarea 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "merchantNameAndLocation"
                      required 
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <label>Address:</label>
                  <div className="input-group">
                    <textarea 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "address"
                      required 
                    />
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
                    'Create Merchant'
                  }
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(AddMerchant)