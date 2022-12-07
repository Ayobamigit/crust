import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useMatch, useNavigate } from 'react-router'
import Layout from '../../components/layout/Layout'
import SubmitLoader from '../../components/submitloader/SubmitLoader'
import withTimeout from '../../hoc/withTimeout'
import axios from '../../plugins/axios'
import swal from '../../plugins/swal'
import { createMerchant, updateMerchant, viewClients, viewMerchants } from '../../plugins/url'

const ViewMerchant = () => {
  const navigate = useNavigate()
  const match = useMatch('/merchant/:id');
  const id = match ?  match.params.id : ''
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
    loading: false,
    readOnly:true
  })

  const {loading, merchantID, firstName, lastName, gender, merchantstate, countryCode, clientId, currencyCode,
    merchantNameAndLocation, address, merchantCategoryCode, clientList, readOnly} = state;

  const onChange =(e)=>{
    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
  }

  useEffect(()=>{
    axios({
      method: 'get',
      url:`${viewMerchants}/${id}`,
    }).then(res=>{
      if(res.data.respCode === '00'){
        const {merchantID, firstName, lastName, gender, state, countryCode, clients, currencyCode,
          merchantNameAndLocation, address, merchantCategoryCode} = res.data.respBody;
        setState(oldState=>({
          ...oldState,
          merchantID,
          firstName,
          lastName,
          gender,
          merchantstate:state,
          countryCode,
          clientId: clients?.id,
          currencyCode,
          merchantNameAndLocation,
          address,
          merchantCategoryCode
        }))
      }
    }).catch(err=>{
      console.log(err)
    })
  },[])

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

  const onClickEdit = () =>{
    setState(state=>({
      ...state,
      readOnly: !readOnly
    }))
  }


  useEffect(()=>{
    getAllClients();
  },[])
  const onUpdateMerchant = (e) =>{
    e.preventDefault();
    setState(state=>({
      ...state,
      loading: true
    }))
    console.log(clientId)
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
      url:`${updateMerchant}`,
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
          text: `Merchant updated successfully`
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
    <Layout title="Merchants">
       <Container>
        <div className="TableList" style={{width:"80%"}}>
        
          <Row className='align-items-center'>
          <Col lg={9}>
          <h6 className="crust-dark-blue-light pt-25 ml-25 mb-20">
          Merchant Information
          </h6>
          </Col>
          
          <Col lg={3}>
              <button className="button-primary" onClick={onClickEdit}>
                  Edit Information 
              </button>
          </Col>
        </Row>

          <div className="line"></div>

          <form className="form-body" onSubmit={onUpdateMerchant}>

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
                      value={merchantID}
                      disabled={readOnly}
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
                        value={firstName}
                        disabled={readOnly} 
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
                        value={lastName}
                        disabled={readOnly} 
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
                        value={gender}
                        disabled={readOnly} 
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
                        value={merchantstate}
                        disabled={readOnly} 
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
                      value={countryCode}
                      disabled={readOnly} 
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
                      value={merchantCategoryCode}
                      disabled={readOnly} 
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
                      value={clientId}
                      disabled={readOnly} 
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
                      value={currencyCode}
                      disabled={readOnly}  
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
                      value={merchantNameAndLocation}
                      disabled={readOnly}  
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
                      value={address}
                      disabled={readOnly}  
                    />
                  </div>
                </Col>
              </Row>

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
                    'Update Merchant'
                  }
              </button>
            </div>}
          </form>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(ViewMerchant)