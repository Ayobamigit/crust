import React, { useEffect, useState } from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'
import { Container, Table, Row, Col } from 'react-bootstrap'
import {RiAddBoxFill, RiDeleteBin5Line} from 'react-icons/ri';
import {FiEdit} from 'react-icons/fi'
import Modal from '../../components/modal/Modal';
import axios from '../../plugins/axios'
import swal from '../../plugins/swal';
import {createTerminal, deleteTerminal, remapTerminal, updateTerminal, viewMerchants, viewTerminals, viewTerminalsParam } from '../../plugins/url';
import appNotification from '../../plugins/appNotification';
import NoResultFound from '../../components/noresultfound/NoResultFound';
import AddTerminal from '../../components/configcomponents/AddTerminal';
import SubmitLoader from '../../components/submitloader/SubmitLoader';

const Terminals = () => {
  const [state, setState] = useState({
    add:'',
    pageNo:0,
    pageSize:20,
    sortBy:"id",
    loading:false,
    merchantId:'',
    terminalID:'',
    terminalSerialNumber:'',
    terminalType:'',
    terminalList:[],
    merchantList:[]
  })

  const {add, modalValue, pageNo, pageSize, loading, sortBy, terminalList, merchantId, terminalID, merchantID, terminalSerialNumber, terminalType, merchantList} = state;


  const showModal = (value, data) =>{
    if(!add){
        setState(state=>({
            ...state,
            add: true,
            modalValue: value,
            terminalID: data ? data.terminalID : '',
            terminalSerialNumber: data ? data.terminalSerialNumber : '',
            terminalType: data ? data.terminalType : '',
            merchant: data ? data.merchant : '',
            merchantId: data ?.merchant ? data.merchant.merchantID : '',
        }))
    }else{
        setState(state=>({
            ...state,
            add: false,
        }))
    }    
}

const onChange =(e)=>{

    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
}


const getAllTerminals = () =>{
  let reqBody = {
    pageNo,
    pageSize,
    sortBy
  }

  axios({
    method: 'post',
    url:`${viewTerminals}`,
    data:reqBody
  }).then(res=>{
    if(res.data.respCode === '00'){
      const {content} = res.data.respBody;
      setState(state=>({
        ...state,
        terminalList:content
      }))
    }
  }).catch(err=>{
    console.log(err)
  })

}

const searchTerminal = () =>{
       
  setState(state=>({
    ...state,
    loading:true,
  }))

  let reqBody = {
    pageNo,
    pageSize,
    sortBy,
    param:{
      merchantID: merchantID? merchantID : undefined,
      terminalID: terminalID ? terminalID : undefined,
      terminalSerialNumber: terminalSerialNumber ? terminalSerialNumber : undefined
    }
  }

  axios({
    method: 'post',
    url:`${viewTerminalsParam}`,
    data:reqBody
  }).then(res=>{
    if(res.data.respCode === '00'){
      const {content, totalPages} = res.data.respBody;
      setState(state=>({
        ...state,
        loading:false,
        terminalList:content,
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

const onCreateTerminal = () =>{
  setState(state=>({
    ...state,
    loading: true
  }))

  let reqBody = {
    merchantId, 
    terminalID,
    terminalSerialNumber,
    terminalType
  }
  axios({
    method: 'post',
    url:`${createTerminal}`,
    data:reqBody
  }).then(res=>{
    if(res.data.respCode === '00'){
      setState(state=>({
        ...state,
        loading:false,
        add:false
      }))
      swal.fire({
        // type:'success',
        title: 'Successful....',
        icon: 'success',
        text: `Terminal created successfully`
    })
      getAllTerminals()
    }
  }).catch(err=>{
    setState(state=>({
      ...state,
      loading:false
    }))
    swal.fire({
      // type:'success',
      title: 'Error',
      icon: 'error',
      text: `Error creating Terminals`
    })
  })
}

const onEditTerminal = () =>{
  setState(state=>({
    ...state,
    loading: true
  }))

  let reqBody = {
    merchantId, 
    terminalID,
    terminalSerialNumber,
    terminalType
  }
  axios({
    method: 'post',
    url:`${updateTerminal}`,
    data:reqBody
  }).then(res=>{
    if(res.data.respCode === '00'){
      setState(state=>({
        ...state,
        loading:false,
        add:false
      }))
      swal.fire({
        // type:'success',
        title: 'Successful....',
        icon: 'success',
        text: `Terminal updated successfully`
      })
      getAllTerminals()
    }
  }).catch(err=>{
    setState(state=>({
      ...state,
      loading:false
    }))
    swal.fire({
      // type:'success',
      title: 'Error',
      icon: 'error',
      text: `Error updating Terminals`
    })
  })
}

const onRemapTerminal = () =>{
  setState(state=>({
    ...state,
    loading: true
  }))

  let reqBody = {
    merchantId, 
    terminalID,
    terminalSerialNumber,
    terminalType
  }
  axios({
    method: 'post',
    url:`${remapTerminal}`,
    data:reqBody
  }).then(res=>{
    if(res.data.respCode === '00'){
      setState(state=>({
        ...state,
        loading:false,
        add:false
      }))
      swal.fire({
        // type:'success',
        title: 'Successful....',
        icon: 'success',
        text: `Terminal re-mapped successfully`
      })
      getAllTerminals()
    }
  }).catch(err=>{
    setState(state=>({
      ...state,
      loading:false
    }))
    swal.fire({
      // type:'success',
      title: 'Error',
      icon: 'error',
      text: `Error updating Terminals`
    })
  })
}

const onDelete = (id) =>{
  swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this terminal!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes' 
  })
  .then(remove=>{
    if(remove.isConfirmed){

        axios({
            method: 'delete',
            url: `${deleteTerminal}/${id}`,
        })
        .then(res=>{
            if(res.data.respCode === '00'){
              swal.fire({
                // type:'success',
                title: 'Successful....',
                icon: 'success',
                text: `Terminal deleted successfully`
              })
              getAllTerminals()
            }else{
              swal.fire({
                // type:'success',
                title: 'Error',
                icon: 'error',
                text: `Error deleting Terminals`
              })
            }
        })
        .catch(err => {
          swal.fire({
            // type:'success',
            title: 'Error',
            icon: 'error',
            text: `Error deleting Terminals`
          })
        });
    }
  })
}

useEffect(()=>{
  getAllTerminals()

  let reqBody = {
    pageNo:0,
    pageSize:1000,
    sortBy:'id'
  }

  axios({
    method: 'post',
    url:`${viewMerchants}`,
    data:reqBody
  }).then(res=>{
    if(res.data.respCode === '00'){
      setState(state=>({
        ...state,
        merchantList: res.data.respBody.content,
      }))
    }
  }).catch(err=>{
    console.log(err)
  })
},[])
  return (
    <Layout title="Terminals">
       <Modal 
        show = {add} 
        clicked={showModal} 
        title={modalValue === 'add' ? 'Add Terminal' : modalValue === 'map' ? 'Remap Terminal'  : 'Edit Terminal'}
        action={modalValue === 'add' ? 'Add Terminal' : modalValue === 'map' ? 'Remap Terminal'  : 'Update Terminal'}
        submit={modalValue === 'add' ? onCreateTerminal : modalValue === 'map' ? onRemapTerminal : onEditTerminal}
        loading={loading}
      >
      <AddTerminal 
          onChange={onChange} 
          merchants={merchantList}
          state={state}
      />
      </Modal>
      <Container>
        <div className="TableList">
            <div className="d-flex justify-content-between">
                <div>
                    <h6 className="camp-dark-blue-light">All Terminals</h6>
                </div>
                                    
                <div>

                    <span className="m-06">
                        <button className="button-primary" onClick={()=>showModal('add')}>
                            <RiAddBoxFill size={18} className="mr-07" />Add Terminal
                        </button>
                    </span>
                </div>
            </div>

            <div className="mt-30">
              <Row>
                  <Col lg={3}>
                      <div className="filterItem">
                        <label className="label">Search:</label>
                        <input className="formcontrol" type="text" placeholder="Search by terminal ID" name="terminalID" onChange = {onChange}/>
                      </div>
                  </Col>

                  <Col lg={3}>
                      <div className="filterItem">
                        <input className="formcontrol" type="text" placeholder="Search by merchant ID" name="merchantID" onChange = {onChange}/>
                      </div>
                  </Col>

                  <Col lg={3}>
                      <div className="filterItem">
                        <input className="formcontrol" type="text" placeholder="Search by serial number" name="terminalSerialNumber" onChange = {onChange}/>
                      </div>
                  </Col>
                  <Col lg={1}>
                      <div>
                          <button className="button-export" onClick={searchTerminal}>
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
                            <th>terminal id</th>
                            <th>terminal type</th>
                            <th>terminal serial no</th>
                            <th>merchant name</th>
                            <th>merchant id</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          terminalList?.length === 0 ?
                          <NoResultFound />
                          :
                          terminalList.map((terminal, i)=>{
                              const{terminalID, terminalType,terminalSerialNumber, merchant} = terminal;

                              return(
                                  <tr key={i}>
                                  <td>{i+1}</td>
                                  <td>{terminalID}</td>
                                  <td>{terminalType}</td>
                                  <td>{terminalSerialNumber}</td>
                                  <td>{merchant?.firstName + ' ' + merchant?.lastName}</td>
                                  <td>{merchant?.merchantID}</td>
                                  <td><span className='tabgrey mr-15' onClick={()=>showModal('map', terminal)} >Remap</span><FiEdit onClick={()=>showModal('edit', terminal)} size={20} className="crust-grey mr-15" />< RiDeleteBin5Line size={20}  className="crust-danger" onClick={()=>{onDelete(terminalID)}} /></td>
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

export default withTimeout(Terminals)