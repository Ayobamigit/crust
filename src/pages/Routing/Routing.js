import React, { useEffect, useState } from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'
import {viewRoutes, searchRoute } from '../../plugins/url'
import {RiAddBoxFill} from 'react-icons/ri';
import {FiEdit} from 'react-icons/fi'
import { Container, Table, Row, Col } from 'react-bootstrap'
import axios from '../../plugins/axios'
import { useNavigate } from 'react-router'
import NoResultFound from '../../components/noresultfound/NoResultFound';
import SubmitLoader from '../../components/submitloader/SubmitLoader';

const Routing = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    routeList:[],
    pageNo:0,
    pageSize:20,
    sortBy: "id",
    loading:false,
    scheme:'',
    client:'',
    station:''
  })

  const {routeList, pageNo, pageSize, sortBy, scheme, client, station, loading} = state

  const getAllRoutes = () =>{
    let reqBody = {
      pageNo,
      pageSize,
      sortBy
    }
  
    axios({
      method: 'post',
      url:`${viewRoutes}`,
      data:reqBody
    }).then(res=>{
      if(res.data.respCode === '00'){
        const {content} = res.data.respBody;
        setState(state=>({
          ...state,
          routeList :content
        }))
      }
    }).catch(err=>{
      console.log(err)
    })
  
  }

  const onChange =(e)=>{
    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
  }

  const searchRoutes = () =>{
       
    setState(state=>({
      ...state,
      loading:true,
    }))

    let reqBody = {
      pageNo,
      pageSize,
      sortBy,
      param:{
        scheme: scheme || undefined,
        countryCode: client || undefined,
        countryCode: station || undefined
      }
    }
  
    axios({
      method: 'post',
      url:`${searchRoute}`,
      data:reqBody
    }).then(res=>{
      if(res.data.respCode === '00'){
        const {content} = res.data.respBody;
        setState(state=>({
          ...state,
          loading:false,
          routeList:content,
        }))
      }
    }).catch(err=>{
      setState(state=>({
        ...state,
        loading:false
      }))
      console.log(err)
    })
  
  }
  useEffect(()=>{
    getAllRoutes()
  },[])

  return (
    <Layout title="Routes">
      <Container>
        <div className="TableList">
            <div className="d-flex justify-content-between">
                <div>
                    <h6 className="camp-dark-blue-light">Routes</h6>
                </div>
                                    
                <div>

                    <span className="m-06">
                        <button className="button-primary" onClick={()=>navigate('/add-route')}>
                            <RiAddBoxFill size={18} className="mr-07" />Add Route
                        </button>
                    </span>
                </div>
            </div>

            <div className="mt-30">
              <Row>
                  <Col lg={4}>
                      <div className="filterItem">
                        <label className="label">Search:</label>
                        <input className="formcontrol" type="text" placeholder="Search by scheme name" name="scheme" onChange = {onChange}/>
                      </div>
                  </Col>

                  <Col lg={3}>
                      <div className="filterItem">
                        <label className="label">Search:</label>
                        <input className="formcontrol" type="text" placeholder="Search by processor" name="station" onChange = {onChange}/>
                      </div>
                  </Col>
                  <Col lg={4}>
                      <div className="filterItem">
                        <label className="label">Search:</label>
                        <input className="formcontrol" type="text" placeholder="Search by client name" name="client" onChange = {onChange}/>
                      </div>
                  </Col>
                  <Col lg={1}>
                      <div>
                          <button className="button-export" onClick={searchRoutes}>
                            {
                              loading ?
                              <SubmitLoader />
                              :
                              'Search'
                            }
                          </button>   
                      </div>
                  </Col>
              </Row> 
          </div>

            <div className="mt-30">
                <Table responsive borderless className="bg-inherit">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>type</th>
                            <th>scheme name</th>
                            <th>processor</th>
                            <th>client</th>
                            <th>maximun amount</th>
                            <th>minimum amount</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            routeList.length === 0 ?
                            <NoResultFound/>
                            :
                            routeList.map((route, i)=>{
                                const{type,maximumAmount, minimumAmount, scheme, stationId, clientsId, id} = route;

                                return(
                                    <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{type}</td>
                                    <td>{scheme}</td>
                                    <td>{stationId?.name}</td>
                                    <td>{clientsId?.clientName}</td>
                                    <td>{maximumAmount}</td>
                                    <td>{minimumAmount}</td>
                                    <td><FiEdit onClick={()=>navigate(`/route/${id}`)} size={20} className="camp-grey mr-15" /></td>
                                </tr>
                                )
                            })
                        }

                    </tbody>

                </Table>
            </div>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(Routing)