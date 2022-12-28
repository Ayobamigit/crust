import React, { useEffect, useState } from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'
import { NavLink } from 'react-router-dom'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactPaginate from 'react-paginate'
import moment from "moment"
import SubmitLoader from '../../components/submitloader/SubmitLoader';
import {RiDownloadCloudFill, RiAddBoxFill} from 'react-icons/ri';
import {BiChevronDown} from 'react-icons/bi';
import {Table, Col, Row, Container} from 'react-bootstrap'
import NoResultFound from '../../components/noresultfound/NoResultFound';
import { viewClients, viewClientsParam } from '../../plugins/url';
import axios from '../../plugins/axios'
import { useNavigate } from 'react-router'

const ViewClient = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
    processing: false,
    pageNo: 0,
    pageSize: 20,
    totalPages: 0,
    clientEmail:'',
    clientName:'',
    sortBy:"id",
    clientList:[]
  })

  const {loading, pageNo, pageSize, sortBy, clientList, totalPages, processing, clientEmail, clientName} = state;

  const onChange =(e)=>{
    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
  }

  const getAllClients = () =>{
    let reqBody = {
      pageNo,
      pageSize,
      sortBy
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
          totalPages: res.data.respBody.totalPages
        }))
      }
    }).catch(err=>{
      console.log(err)
    })
  
  }

  const searchClient = () =>{
       
    setState(state=>({
      ...state,
      loading:true,
    }))

    let reqBody = {
      pageNo,
      pageSize,
      sortBy,
      param:{
        clientEmail: clientEmail? clientEmail : undefined,
        clientName: clientName ? clientName : undefined
      }
    }
  
    axios({
      method: 'post',
      url:`${viewClientsParam}`,
      data:reqBody
    }).then(res=>{
      if(res.data.respCode === '00'){
        const {content, totalPages} = res.data.respBody;
        setState(state=>({
          ...state,
          loading:false,
          clientList:content,
          totalPages
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
    getAllClients();
  },[])

  const exportTable = () => {
    setState({
        ...state,
        processing: !processing
    })
    document.getElementsByClassName("table-xls-button")[0].click()
    setTimeout(() => {
        setState({
            ...state,
            processing: false
        })
    }, 750);
  }

  const changeCurrentPage = (data) => {
    Promise.resolve()
        .then(() => {
            setState(state=>({
                ...state,
                pageNo: data.selected
            }))
        })
        getAllClients(data.selected)
  }
  return (
    <Layout title="Clients">
       <Container>
        <div className="TableList">
          <div className="d-flex justify-content-between">
            <div>
                <h6 className="crust-dark-blue-light">All Clients</h6>
            </div>

            <div>
                <span className="m-06">
                  <span>
                    <button className="button-export" onClick={exportTable}>
                      {processing?
                        <SubmitLoader/>
                        :
                        <span>
                            <RiDownloadCloudFill size={18} className="mr-03" /> Export <BiChevronDown size={20}/>
                        </span>
                      }
                    </button>
                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="button-export display-none table-xls-button"
                      table="AllAgents"
                      filename="All Agent data"
                      sheet="tablexls"
                      buttonText="Export"
                      disabled={processing}
                      style={{padding:"5px", margin:"5px"}}
                      
                    />
                  </span>
                </span>
                <span className="m-06">
                  <NavLink to="/add-client">
                    <button className="button-primary">
                      <RiAddBoxFill size={18} className="mr-07" />Add New
                    </button>
                  </NavLink>
                </span>
            </div>
          </div>

          <div className="mt-30">
              <Row>
                  <Col lg={4}>
                      <div className="filterItem">
                        <label className="label">Search:</label>
                        <input className="formcontrol" type="text" placeholder="Search by name" name="clientName" onChange = {onChange}/>
                      </div>
                  </Col>
                  <Col lg={4}>
                      <div className="filterItem">
                        <input className="formcontrol" type="text" placeholder="Search by email" name="clientEmail" onChange = {onChange}/>
                      </div>
                  </Col>
                  <Col lg={1}>
                      <div>
                          <button className="button-export" onClick={searchClient}>
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
            <Table responsive borderless className="bg-inherit" id="AllAgents">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>phone</th>
                        <th>email</th>
                        <th>date created</th>
                        <th>status</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientList?
                        clientList.length === 0 ?
                            <NoResultFound />
                            :
                            clientList.map((client, i)=>{
                                const{clientEmail, clientName, clientPhone, dateCreated, isActive, id} = client;
                                let status;
                                const statusClass = () =>{
                                    if(isActive){
                                      status = 'Active'
                                        return 'tabactive'
                                    } 
                                    else{
                                        status = 'In-Active'
                                        return 'tabinactive'
                                    }
                                }

                                return(
                                    <tr key={i} >
                                    <td>{i+1}</td>
                                    <td>{clientName}</td>
                                    <td>{clientPhone}</td>
                                    <td>{clientEmail}</td>
                                    <td>{dateCreated ? moment(new Date(dateCreated)).format('D/MM/YYYY') : 'N/A'}</td>
                                    <td><span className={`${statusClass()}`}>{status}</span></td>
                                    <td><span className='tabgrey mr-15' onClick={() => {navigate(`/client/${id}`)}}>View</span></td>
                                </tr>
                                )
                            })
                        :
                        <NoResultFound />
                    }

                </tbody>

            </Table>

            <div className="pagination  justify-content-center" style={clientList.length > 0 ? { display: "block", paddingTop: "10px" } : { display: "none" }}>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                // forcePage={pageNo}
                onPageChange={changeCurrentPage}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination justify-content-center'}
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(ViewClient)