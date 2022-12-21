import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { viewTransactions, viewTransactionsParam } from '../../plugins/url'
import { Container, Table, Row, Col } from 'react-bootstrap'
import axios from '../../plugins/axios'
import NoResultFound from '../../components/noresultfound/NoResultFound'
import {RiDownloadCloudFill} from 'react-icons/ri';
import {BiChevronDown} from 'react-icons/bi';
import withTimeout from '../../hoc/withTimeout'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'
import SubmitLoader from '../../components/submitloader/SubmitLoader'

const Transactions = () => {
    const [state, setState] = useState({
        transactionList:[],
        pageNo:0,
        pageSize:20,
        totalPages: 1,
        sortBy:"id",
        terminalID:"",
        transactionReference:"",
        loading:false,
        processing: false,
    })

    const {pageNo, pageSize, sortBy, transactionList, totalPages, loading, processing, terminalID, transactionReference} = state
    useEffect(()=>{ 
        getAllTransactions()
      
      },[])

      const getAllTransactions = (value) =>{
        //  This is to handle incase a value was never passed or id 0 was passed to the getAgents function
        let page = 0
        if(isNaN(value)){
            page = pageNo
        }else{
            page = value
        }
        setState(state=>({
          ...state,
          submit: true
        }))

        let reqBody = {
          pageNo: page,
          pageSize,
          sortBy
        }
      
        axios({
          method: 'post',
          url:`${viewTransactions}`,
          data:reqBody
        }).then(res=>{
          if(res.data.respCode === '00'){
            const {content, totalPages} = res.data.respBody;
            setState(state=>({
              ...state,
              transactionList:content,
              totalPages
            }))
          }
        }).catch(err=>{
          console.log(err)
        })
      
      }
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

      const searchTransaction = () =>{
       
        setState(state=>({
          ...state,
          loading:true,
        }))

        let reqBody = {
          pageNo,
          pageSize,
          sortBy,
          param:{
            terminalID: terminalID? terminalID : undefined,
            transactionReference : transactionReference ? transactionReference : undefined,
          }
        }
      
        axios({
          method: 'post',
          url:`${viewTransactionsParam}`,
          data:reqBody
        }).then(res=>{
          if(res.data.respCode === '00'){
            const {content, totalPages} = res.data.respBody;
            setState(state=>({
              ...state,
              loading:false,
              transactionList:content,
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


    const onChange =(e)=>{
      setState(state=>({
          ...state,
        [ e.target.name]: e.target.value
      }))
    }
    
      const changeCurrentPage = (data) => {
        Promise.resolve()
            .then(() => {
                setState(state=>({
                    ...state,
                    pageNo: data.selected
                }))
            })
            getAllTransactions(data.selected)
      }
  return (
    <Layout title="Transactions">
         <Container>
        <div className="TableList">
        <div className="d-flex justify-content-between">
            <div>
                <h6 className="crust-dark-blue-light">All Transactions</h6>
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
                    <ReactHtmlTableToExcel
                      id="test-table-xls-button"
                      className="button-export display-none table-xls-button"
                      table="AllTransactions"
                      filename="All Transactions"
                      sheet="tablexls"
                      buttonText="Export"
                      disabled={processing}
                      style={{padding:"5px", margin:"5px"}}
                      
                    />
                  </span>
                </span>
            </div>
          </div>

          <div className="mt-30">
              <Row>
                  <Col lg={5}>
                      <div className="filterItem">
                        <label className="label">Terminal ID:</label>
                        <input className="formcontrol" type="text" placeholder="Search by terminal Id" name="terminalID" onChange = {onChange}/>
                      </div>
                  </Col>
                  <Col lg={4}>
                      <div className="filterItem">
                        <label className="label">RRN:</label>
                        <input className="formcontrol" type="text" placeholder="Search by rrn" name="transactionReference" onChange = {onChange}/>
                      </div>
                  </Col>
                  <Col lg={1}>
                      <div>
                          <button className="button-export" onClick={searchTransaction}>
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
                <Table responsive borderless className="bg-inherit"  id="AllTransactions">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Reference Id</th>
                            <th>Amount</th>
                            <th>Terminal Type</th>
                            <th>Terminal ID</th>
                            <th>Processed by</th>
                            <th>Created At</th>
                            <th>Payment Code</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          transactionList?.length === 0 ?
                          <NoResultFound />
                          :
                          transactionList.map((transaction, i)=>{
                            const{de37, de41, terminals, createdAt, paymentStatus, de4, id, responsecode, processedBy} = transaction;
                            let status = ''
                            const statusClass = () =>{
                                if(responsecode === '00'){
                                  status = 'Approved'
                                  return 'tabactive'
                                } 
                                else if(responsecode === '96'){
                                    status = 'System Malfunction'
                                    return 'tabinactive'
                                }else if(responsecode === '91'){
                                    status = 'Issuer or Switch Inoperative'
                                    return 'tabpending'
                                }
                                else if(responsecode === '55'){
                                    status = 'Incorrect PIN'
                                    return 'tabinactive'
                                }
                                else if(responsecode === '12'){
                                    status = 'Invalid Transaction'
                                    return 'tabinactive'
                                }
                                else{
                                    status = 'Failed'
                                    return 'tabinactive'
                                }
                            }

                            const getAmount = () =>{
                                let amount = 0.00
                                if(de4){
                                    let res = parseFloat(de4);
                                    amount = res/100
                                }
                                return amount;
                            }
                            return(
                                <tr key={i}>
                                <td>{i+1}</td>
                                <td>{de37}</td>
                                <td><CurrencyFormat value={getAmount() || "0"} displayType={'text'} thousandSeparator={true} prefix={'₦ '} decimalScale={2} fixedDecimalScale={true} /></td>
                                <td>{terminals?.terminalType}</td>
                                <td>{de41}</td>
                                <td>{processedBy}</td>
                                <td>{createdAt ? moment(new Date(createdAt)).format('D/MM/YYYY') : 'N/A'}</td>
                                <td>{responsecode}</td>
                                <td><span className={`${statusClass()}`}>{status}</span></td>
                                {/* <td><span className="tabtransparent" onClick={()=>{navigate(`/transaction/${id}`)}}>View More</span></td> */}
                            </tr>
                            )
                          })
                        }

                    </tbody>

                </Table>

              <div className="pagination  justify-content-center" style={transactionList.length > 0 ? { display: "block", paddingTop: "10px" } : { display: "none" }}>
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

export default withTimeout(Transactions)