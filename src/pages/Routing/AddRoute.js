import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Layout from '../../components/layout/Layout'
import SubmitLoader from '../../components/submitloader/SubmitLoader'
import withTimeout from '../../hoc/withTimeout'
import axios from '../../plugins/axios'
import swal from '../../plugins/swal'
import { createRoute, createUser, viewClients, viewSchemes, viewStations } from '../../plugins/url'

const AddRoute = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    id:'',
    type:'',
    clientsId:'',
    minimumAmount:'',
    maximumAmount:'',
    scheme:'',
    stationId:'',
    precedence:'',
    schemes:[],
    stations:[],
    clients:[],
    loading: false,
  })

  const {loading, id, type, clientsId, minimumAmount, maximumAmount, scheme, stationId, precedence, clientList, clients, stations, schemes} = state;

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
          clients: res.data.respBody.content,
        }))
      }
    }).catch(err=>{
      console.log(err)
    })
  
  }

  const getAllStations = () =>{
    let reqBody = {
      pageNo: 0,
      pageSize:100,
      sortBy: 'id'
    }
  
    axios({
      method: 'post',
      url:`${viewStations}`,
      data:reqBody
    }).then(res=>{
      if(res.data.respCode === '00'){
        setState(state=>({
          ...state,
          stations: res.data.respBody.content,
        }))
      }
    }).catch(err=>{
      console.log(err)
    })
  
  }

  const getAllSchemes = () =>{
    let reqBody = {
      pageNo: 0,
      pageSize:100,
      sortBy: 'id'
    }
  
    axios({
      method: 'post',
      url:`${viewSchemes}`,
      data:reqBody
    }).then(res=>{
      if(res.data.respCode === '00'){
        setState(state=>({
          ...state,
          schemes: res.data.respBody.content,
        }))
      }
    }).catch(err=>{
      console.log(err)
    })
  
  }


  useEffect(()=>{
    getAllClients();
    getAllSchemes();
    getAllStations();
  },[])

const onCreateRoute = (e) =>{
  e.preventDefault();
  setState(state=>({
    ...state,
    loading: true
  }))

  let reqbody = {
    id,
    type,
    clientsId,
    minimumAmount,
    maximumAmount,
    scheme,
    stationId,
    precedence
  }

  axios({
    method: 'post',
    url:`${createRoute}`,
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
        text: `Route created successfully`
    })
      navigate('/routes')
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
    <Layout title="Add Route">
        <Container>
        <div className="TableList" style={{width:"70%"}}>
        
          <h6 className="crust-dark-blue-light pt-25 ml-25 mb-20">
              Route Details
          </h6>

          <div className="line"></div>

          <form className="form-body" onSubmit={onCreateRoute}>

            <div className="info-body">

              <Row className="formgroup">

                <Col xl={6} lg={6}>
                  <label>Type</label>
                  <div className="input-group">
                    <input  
                      className="formcontrol" 
                      type="text" 
                      name="type"
                      onChange = {onChange}
                      required
                    />
                  </div>
                </Col>  

                <Col lg={6}>
                      <label>Precedence</label>
                      <div className="input-group">
                        <input 
                            type="text" 
                            className="formcontrol" 
                            required 
                            onChange={onChange}
                            name="precedence"
                          />
                      </div>
                </Col>
              </Row>
              <Row className="formgroup">
                <Col lg={6}>
                      <label>Minimum Amount</label>
                      <div className="input-group">
                        <input 
                            type="text" 
                            className="formcontrol" 
                            onChange={onChange}
                            name="minimumAmount"
                            required 
                          />
                      </div>
                </Col>

                <Col lg={6}>
                      <label>Maximun Amount</label>
                      <div className="input-group">
                        <input 
                        type="text" 
                        className="formcontrol"
                        onChange={onChange}
                        name="maximumAmount"
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
                          name = "clientsId"
                          required 
                        >
                          <option>Select Client</option>
                          {
                            clients ?
                            clients.map((client, i)=>{
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

                <Col lg={6}>
                      <label>Station</label>
                      <div className="input-group">
                        <select 
                          type="text" 
                          className="formcontrol"
                          onChange={onChange}
                          name = "stationId"
                          required 
                        >
                          <option>Select Station</option>
                          {
                            stations ?
                            stations.map((station, i)=>{
                              return (
                              <option value={station.id} key={i}>
                                {station.name}
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

              <Row className="formgroup">
                <Col lg={6}>
                      <label>Scheme</label>
                      <div className="input-group">
                        <select 
                          type="text" 
                          className="formcontrol"
                          onChange={onChange}
                          name = "scheme"
                          required 
                        >
                          <option>Select scheme</option>
                          {
                            schemes ?
                            schemes.map((scheme, i)=>{
                              return (
                              <option value={scheme.name} key={i}>
                                {scheme.name}
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
                    'Create Route'
                  }
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(AddRoute)