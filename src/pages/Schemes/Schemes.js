import React, { useEffect, useState } from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'
import { Container, Table } from 'react-bootstrap'
import {RiAddBoxFill, RiDeleteBin5Line} from 'react-icons/ri';
import {FiEdit} from 'react-icons/fi'
import Modal from '../../components/modal/Modal';
import axios from '../../plugins/axios'
import AddScheme from '../../components/configcomponents/AddScheme';
import swal from '../../plugins/swal';
import { createScheme, deleteScheme, updateScheme, viewSchemes } from '../../plugins/url';
import appNotification from '../../plugins/appNotification';
import NoResultFound from '../../components/noresultfound/NoResultFound';

const Schemes = () => {
  const [state, setState] = useState({
    add:'',
    pageNo:0,
    pageSize:20,
    sortBy:"id",
    loading:false,
    id:'',
    name:'',
    regex:'',
    schemeList:[]
  })

  const {add, modalValue, pageNo, pageSize, loading, sortBy, schemeList, name, regex, id} = state;


  const showModal = (value, data) =>{
    if(!add){
        setState(state=>({
            ...state,
            add: true,
            modalValue: value,
            id: data? data.id:'',
            name: data? data.name:'',
            regex: data? data.regex:'',
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

const getAllSchemes = () =>{
  let reqBody = {
    pageNo,
    pageSize,
    sortBy
  }

  axios({
    method: 'post',
    url:`${viewSchemes}`,
    data:reqBody
  }).then(res=>{
    if(res.data.respCode === '00'){
      const {content} = res.data.respBody;
      setState(state=>({
        ...state,
        schemeList:content
      }))
    }
  }).catch(err=>{
    console.log(err)
  })

}

const onCreateScheme = () =>{
  setState(state=>({
    ...state,
    loading: true
  }))

  let reqBody = {
    name, 
    regex
  }

  axios({
    method: 'post',
    url:`${createScheme}`,
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
        text: `Scheme created successfully`
    })
      getAllSchemes()
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
      text: `Error creating Scheme`
  })
  })
}

const onEditScheme = () =>{
  setState(state=>({
    ...state,
    loading: true
  }))

  let reqBody = {
    id,
    name, 
    regex
  }

  axios({
    method: 'post',
    url:`${updateScheme}`,
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
        text: `Scheme updated successfully`
    })
      getAllSchemes()
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
      text: `Error updating Scheme`
  })
  })
}

const onDelete = (id) =>{
  swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this scheme!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes' 
  })
  .then(remove=>{
    if(remove.isConfirmed){

        axios({
            method: 'delete',
            url: `${deleteScheme}/${id}`,
        })
        .then(res=>{
            swal.fire({
                // type:'success',
                title: 'Successful....',
                icon: 'success',
                text: `Scheme deleted successfully`
            })
            getAllSchemes()
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.message}`,
            // footer: 'Please contact support'
        })
        });
    }
  })
}

useEffect(()=>{
  getAllSchemes()
},[])

  return (
    <Layout title="Schemes">
      <Modal 
        show = {add} 
        clicked={showModal} 
        title={modalValue === 'add' ? 'Add Scheme' : 'Edit Scheme'}
        action={modalValue === 'add' ? 'Add Scheme' : 'Update Scheme'}
        submit={modalValue === 'add' ? onCreateScheme : onEditScheme}
        loading={loading}
      >
      <AddScheme 
          onChange={onChange} 
          state={state}
      />
      </Modal>
      <Container>
        <div className="TableList">
            <div className="d-flex justify-content-between">
                <div>
                    <h6 className="camp-dark-blue-light">Schemes</h6>
                </div>
                                    
                <div>

                    <span className="m-06">
                        <button className="button-primary" onClick={()=>showModal('add')}>
                            <RiAddBoxFill size={18} className="mr-07" />Add Scheme
                        </button>
                    </span>
                </div>
            </div>

            <div className="mt-30">
                <Table responsive borderless className="bg-inherit">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>regex</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          schemeList?.length === 0 ?
                          <NoResultFound />
                          :
                          schemeList.map((scheme, i)=>{
                              const{name,regex, id} = scheme;

                              return(
                                  <tr key={i}>
                                  <td>{i+1}</td>
                                  <td>{name}</td>
                                  <td>{regex}</td>
                                  <td><FiEdit onClick={()=>showModal('edit', scheme)} size={20} className="crust-grey mr-15" />< RiDeleteBin5Line size={20}  className="crust-danger" onClick={()=>{onDelete(id)}} /></td>
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

export default withTimeout(Schemes)