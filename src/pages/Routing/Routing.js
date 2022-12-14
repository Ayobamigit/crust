import React, { useEffect, useState } from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'
import { deleteRoute, viewRoutes } from '../../plugins/url'
import {RiAddBoxFill} from 'react-icons/ri';
import {FiEdit} from 'react-icons/fi'
import { Container, Table } from 'react-bootstrap'
import axios from '../../plugins/axios'
import swal from '../../plugins/swal';
import { useNavigate } from 'react-router'
import appNotification from '../../plugins/appNotification';
import NoResultFound from '../../components/noresultfound/NoResultFound';

const Routing = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    routeList:[],
    pageNo:0,
    pageSize:20,
    sortBy: "id",
    loading:false
  })

  const {routeList, pageNo, pageSize, sortBy} = state

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
                <Table responsive borderless className="bg-inherit">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>type</th>
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
                                const{type,maximumAmount, minimumAmount, id} = route;

                                return(
                                    <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{type}</td>
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