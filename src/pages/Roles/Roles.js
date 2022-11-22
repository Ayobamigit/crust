import React, { useEffect, useState } from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'
import { Container, Table } from 'react-bootstrap'
import {RiAddBoxFill, RiDeleteBin5Line} from 'react-icons/ri';
import {FiEdit} from 'react-icons/fi'
import Modal from '../../components/modal/Modal';
import AddRole from '../../components/configcomponents/AddRole';
import axios from '../../plugins/axios';
import { roles } from '../../plugins/url';

const Roles = () => {
  const [state, setState] = useState({
    add:'',
    pageNo:0,
    pageSize:20,
    loading:false
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

const getAllRoles = () =>{
  let reqBody = {
    pageNo,
    pageSize
  }

  axios({
    method: 'post',
    url: `${roles}`,
    data:reqBody
  }).then(res=>{

  }).catch(err=>{
    console.log(err)
  })

}

const onCreateRole = () =>{

}

const onEditRole = () =>{
  
}

useEffect(()=>{
  getAllRoles()
},[])

  return (
    <Layout title="Roles">
      <Modal 
        show = {add} 
        clicked={showModal} 
        title={modalValue === 'add' ? 'Add New Role' : 'Edit Role'}
        action={modalValue === 'add' ? 'Add Role' : 'Update Role'}
        submit={modalValue === 'add' ? onCreateRole : onEditRole}
        loading={loading}
      >
      <AddRole 
          onChange={onChange} 
      />
      </Modal>
      <Container>
        <div className="TableList">
            <div className="d-flex justify-content-between">
                <div>
                    <h6 className="camp-dark-blue-light">User Roles</h6>
                </div>
                                    
                <div>

                    <span className="m-06">
                        <button className="button-primary" onClick={()=>showModal('add')}>
                            <RiAddBoxFill size={18} className="mr-07" />Add New Role
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
                        <td><FiEdit onClick={()=>showModal('edit')} size={20} className="crust-grey mr-15" />< RiDeleteBin5Line size={20}  className="crust-danger"/></td>
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

export default withTimeout(Roles)