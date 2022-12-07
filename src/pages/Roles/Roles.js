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
import NoResultFound from '../../components/noresultfound/NoResultFound';

const Roles = () => {
  const [state, setState] = useState({
    add:'',
    pageNo:0,
    pageSize:20,
    sortBy: "id",
    roleList:[],
    loading:false
  })

  const {add, modalValue, pageNo, pageSize, loading, sortBy, roleList} = state;


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
    pageSize,
    sortBy
  }

  axios({
    method: 'post',
    url: `${roles}`,
    data:reqBody
  }).then(res=>{
    setState(state=>({
      ...state,
      roleList: res.data.content
    }))
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
            </div>

            <div className="mt-30">
                <Table responsive borderless className="bg-inherit">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roleList?.length === 0 ?
                            <NoResultFound />
                            :
                            roleList.map((role, i)=>{
                                const{roleName,roleDescription} = role;

                                return(
                                    <tr key={i}>
                                      <td>{i+1}</td>
                                      <td>{roleName}</td>
                                      <td>{roleDescription}</td>
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

export default withTimeout(Roles)