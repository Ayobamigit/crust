import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useMatch, useNavigate } from 'react-router'
import Layout from '../../components/layout/Layout'
import SubmitLoader from '../../components/submitloader/SubmitLoader'
import withTimeout from '../../hoc/withTimeout'
import axios from '../../plugins/axios'
import swal from '../../plugins/swal'
import { updateRoute, viewClients, viewRoutes, viewSchemes, viewStations } from '../../plugins/url'

const ViewRoute = () => {
  const navigate = useNavigate()
  const match = useMatch('/route/:id');
  const routeId = match ?  match.params.id : ''
  const [state, setState] = useState({
    id:'',
    type:'',
    clientsId:'',
    client:'',
    minimumAmount:'',
    maximumAmount:'',
    scheme:'',
    station:'',
    stationId:'',
    precedence:'',
    route:'',
    schemes:[],
    stations:[],
    clients:[],
    loading: false,
  })

  const {loading, id, type, clientsId, client, minimumAmount, maximumAmount, scheme, stationId, station, precedence, clients, stations, schemes} = state;

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

  const getRoute = () =>{
    axios({
      method: 'get',
      url:`${viewRoutes}/${routeId}`,
    }).then(res=>{
      if(res.data.respCode === '00'){
        const {id, type, precedence, minimumAmount, maximumAmount, clientsId, stationId, scheme} = res.data.respBody;
        setState(state=>({
          ...state,
          id,
          type,
          precedence,
          minimumAmount,
          maximumAmount,
          client:clientsId?.id,
          clientsId,
          scheme,
          stationId,
          station: stationId?.id,
        }))
      }
    }).catch(err=>{
      console.log(err)
    })
  
  }

  useEffect(()=>{
    getRoute()
    getAllClients();
    getAllSchemes();
    getAllStations();
  },[])

const onUpdateRoute = (e) =>{
  e.preventDefault();
  setState(state=>({
    ...state,
    loading: true
  }))

  let reqbody = {
    id,
    type,
    clientsId:client,
    minimumAmount,
    maximumAmount,
    scheme,
    stationId:station,
    precedence
  }

  axios({
    method: 'post',
    url:`${updateRoute}`,
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
        text: `Route updated successfully`
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
    <Layout title="Routes">
       <Container>
        <div className="TableList" style={{width:"70%"}}>
        
          <h6 className="crust-dark-blue-light pt-25 ml-25 mb-20">
              Route Details
          </h6>

          <div className="line"></div>

          <form className="form-body" onSubmit={onUpdateRoute}>

            <div className="info-body">

              <Row className="formgroup">

                <Col xl={6} lg={6}>
                  <label>Type</label>
                  <div className="input-group">
                    <input  
                      className="formcontrol" 
                      type="text" 
                      name="type"
                      value={type}
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
                            value={precedence}
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
                            value={minimumAmount}
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
                        value={maximumAmount}
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
                          name = "client"
                          required 
                        >
                          <option>{clientsId?.clientName}</option>
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
                          name = "station"
                          required 
                        >
                          <option>{stationId?.name}</option>
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
                          value={scheme}
                          required 
                        >
                          <option>{scheme}</option>
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
                    'Update Route'
                  }
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(ViewRoute)