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
import { viewUsers } from '../../plugins/url';
import axios from '../../plugins/axios'
import { useNavigate } from 'react-router'

const ViewUsers = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
    processing: false,
    pageNo: 0,
    pageSize: 20,
    totalPages: 0,
    sortBy:"id",
    users:[]
  })

  const {loading, pageNo, pageSize, sortBy, users, totalPages, processing} = state;

  const onChange =(e)=>{
    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
  }

  const getAllUsers = () =>{
    let reqBody = {
      pageNo,
      pageSize,
      sortBy
    }
  
    axios({
      method: 'post',
      url:`${viewUsers}`,
      data:reqBody
    }).then(res=>{
      if(res.data.respCode === '00'){
        setState(state=>({
          ...state,
          users: res.data.respBody.content,
          totalPages: res.data.respBody.totalPages
        }))
      }
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  
  }


  useEffect(()=>{
    getAllUsers();
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
        getAllUsers(data.selected)
  }
  return (
    <Layout title="Users">
      <Container>
        <div className="TableList">
          <div className="d-flex justify-content-between">
            <div>
                <h6 className="crust-dark-blue-light">All Users</h6>
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
                  <NavLink to="/add-user">
                    <button className="button-primary">
                      <RiAddBoxFill size={18} className="mr-07" />Add New
                    </button>
                  </NavLink>
                </span>
            </div>
          </div>

          {/* <div className="mt-30">
              <Row>
                  <Col lg={4}>
                      <div className="filterItem">
                        <label className="label">Status:</label>
                        <select className="formcontrol" name="status" onChange={onChange}>
                            <option value="">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                  </Col>
                  <Col lg={4}>
                      <div className="filterItem">
                        <label className="label">Search:</label>
                        <input className="formcontrol" type="text" placeholder="Search by username" name="username" onChange = {onChange}/>
                      </div>
                  </Col>
                  <Col lg={1}>
                      <div>
                          <button className="button-export" onClick={getAllUsers}>
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
          </div> */}
          
          <div className="mt-30">
            <Table responsive borderless className="bg-inherit" id="AllAgents">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>name</th>
                        <th>email</th>
                        <th>user type</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?
                            users.length === 0 ?
                            <NoResultFound />
                            :
                            users.map((user, i)=>{
                                const{username, firstname, lastname, userType, enabled, email, id} = user;
                                let status
                                const statusClass = () =>{
                                    if(enabled){
                                      status = 'Active'
                                        return 'tabactive'
                                    } 
                                    else{
                                      status = 'In-active'
                                        return 'tabinactive'
                                    }
                                }

                                return(
                                    <tr key={i} onClick={() => {navigate(`/user/${id}`)}}>
                                    <td>{i+1}</td>
                                    <td>{username ? username : 'N/A'}</td>
                                    <td>{firstname + ' ' + lastname}</td>
                                    <td>{email ? email : 'N/A'}</td>
                                    <td>{userType ? userType : 'N/A'}</td>
                                    <td><span className={`${statusClass()}`}>{status}</span></td>
                                </tr>
                                )
                            })
                        :
                        <NoResultFound />
                    }

                </tbody>

            </Table>

            <div className="pagination  justify-content-center" style={users.length > 0 ? { display: "block", paddingTop: "10px" } : { display: "none" }}>
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

export default withTimeout(ViewUsers)