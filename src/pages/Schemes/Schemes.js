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
import { deleteScheme, viewSchemes } from '../../plugins/url';
import { appNotification } from '../../plugins/appNotification';

const Schemes = () => {
  const [state, setState] = useState({
    add:'',
    pageNo:0,
    pageSize:20,
    loading:false,
    name:'',
    regex:''
  })

  const {add, modalValue, pageNo, pageSize, loading} = state;


  const showModal = (value, data) =>{
    if(!add){
        setState(state=>({
            ...state,
            add: true,
            modalValue: value,
            roleName: data?.roleName,
            roleDescription: data?.roleDescription,
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
    pageSize
  }

  axios({
    method: 'post',
    url:`${viewSchemes}`,
    data:reqBody
  }).then(res=>{

  }).catch(err=>{
    console.log(err)
  })

}

const onCreateScheme = () =>{

}

const onEditScheme = () =>{
  
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
            url: `${deleteScheme}/${id}/`,
        })
        .then(res=>{
            // if(res.data.status.toLowerCase() === 'success'){
              appNotification(res.message, 'Delete', 'success');
            //   getAllSchemes()
            // }else{
            //   appNotification(data.message, 'Registration', 'success');
            //   setTimeout(() => {
            //     appNotification('Please check your email to verify your account', 'Verify Account', 'success');
            //   }, [3000]);
            // }
        })
        .catch(err => {
          appNotification(err.message, 'Delete error', 'error');
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
                            <th>description</th>
                            <th>date created</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Super admin</td>
                        <td>Oversees</td>
                        <td>22/09/2010</td>
                        <td><FiEdit onClick={()=>showModal('edit')} size={20} className="crust-grey mr-15" />< RiDeleteBin5Line size={20}  className="crust-danger" onClick={()=>onDelete('1')}/></td>
                      </tr>
                        {/* {
                            typeList.length === 0 ?
                            <NoResultFound />
                            :
                            typeList.map((user, i)=>{
                                const{type,description, created_date, id} = user;

                                return(
                                    <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{type}</td>
                                    <td>{description}</td>
                                    <td>{created_date ? moment(new Date(created_date)).format('D/MM/YYYY') : 'N/A'}</td>
                                    <td><FiEdit onClick={()=>showModal('edit', user)} size={20} className="camp-grey mr-15" />< RiDeleteBin5Line size={20}  className="camp-danger" onClick={()=>{onDeleteType(id)}} /></td>
                                </tr>
                                )
                            })
                        } */}

                    </tbody>

                </Table>
            </div>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(Schemes)