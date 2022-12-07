import React, { useEffect, useState } from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'
import { Container, Table } from 'react-bootstrap'
import {RiAddBoxFill, RiDeleteBin5Line} from 'react-icons/ri';
import {FiEdit} from 'react-icons/fi'
import Modal from '../../components/modal/Modal';
import axios from '../../plugins/axios'
import swal from '../../plugins/swal';
import AddStation from '../../components/configcomponents/AddStation';
import { createStation, deleteStation, updateStation, viewStations } from '../../plugins/url';
import moment from 'moment';
import NoResultFound from '../../components/noresultfound/NoResultFound';

const Stations = () => {
  const [state, setState] = useState({
    add:'',
    pageNo:0,
    pageSize:20,
    sortBy:"id",
    loading:false,
    name:'',
    status:'',
    zmk:'',
    zpk:'',
    zmkKcv:'',
    zpkKcv:'',
    stationlist:[]
  })

  const {add, modalValue, pageNo, pageSize, loading, sortBy, name, status, zmk, zmkKcv, zpk, zpkKcv, stationlist} = state;


  const showModal = (value, data) =>{
    if(!add){
        setState(state=>({
            ...state,
            add: true,
            modalValue: value,
            name: data ? data.name : '',
            status: data ? data.status : '',
            zmk: data ? data.zmk : '',
            zpk: data ? data.zpk : '',
            zmkKcv: data ? data.zmkKcv : '',
            zpkKcv: data ? data.zpkKcv : '',
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

const getAllStations = () =>{
  let reqBody = {
    pageNo,
    pageSize,
    sortBy
  }

  axios({
    method: 'post',
    url:`${viewStations}`,
    data:reqBody
  }).then(res=>{
    if(res.data.respCode === '00'){
      const {content} = res.data.respBody;
      setState(state=>({
        ...state,
        stationlist:content
      }))
    }
  }).catch(err=>{
    console.log(err)
  })

}

const onCreateStation = () =>{
  setState(state=>({
    ...state,
    loading: true
  }))

  let reqBody = {
    name, 
    status,
    zmk,
    zpk,
    zmkKcv,
    zpkKcv
  }

  axios({
    method: 'post',
    url:`${createStation}`,
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
        text: `Station created successfully`
    })
      getAllStations()
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
      text: `Error creating Station`
    })
  })
}

const onEditStation= () =>{
  setState(state=>({
    ...state,
    loading: true
  }))

  let reqBody = {
    name, 
    status,
    zmk,
    zpk,
    zmkKcv,
    zpkKcv
  }

  axios({
    method: 'post',
    url:`${updateStation}`,
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
        text: `Station updated successfully`
    })
      getAllStations()
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
      text: `Error updating Station`
  })
  })
}

const onDelete = (id) =>{
  swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this station!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes' 
  })
  .then(remove=>{
      if(remove.isConfirmed){

          axios({
              method: 'delete',
              url: `${deleteStation}/${id}`,
          })
          .then(res=>{
              // if(res.data.respCode === '00'){
              swal.fire({
                  // type:'success',
                  title: 'Successful....',
                  icon: 'success',
                  text: `Station deleted successfully`
              })
              getAllStations()
          })
          .catch(err => {
              swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: `Error deleting station`,
                  // footer: 'Please contact support'
              })
          });
      }
  })
}

useEffect(()=>{
  getAllStations()
},[])
  return (
    <Layout title="Stations">
      <Modal 
        show = {add} 
        clicked={showModal} 
        title={modalValue === 'add' ? 'Add Station' : 'Edit Station'}
        action={modalValue === 'add' ? 'Add Station' : 'Update Station'}
        submit={modalValue === 'add' ? onCreateStation : onEditStation}
        loading={loading}
      >
      <AddStation 
          onChange={onChange} 
          state={state}
      />
      </Modal>
      <Container>
        <div className="TableList">
            <div className="d-flex justify-content-between">
                <div>
                    <h6 className="camp-dark-blue-light">Stations</h6>
                </div>
                                    
                <div>

                    <span className="m-06">
                        <button className="button-primary" onClick={()=>showModal('add')}>
                            <RiAddBoxFill size={18} className="mr-07" />Add Station
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
                            <th>zmk</th>
                            <th>zpk</th>
                            <th>zmkKcv</th>
                            <th>zpkkcv</th>
                            <th>date created</th>
                            <th>status</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stationlist?.length === 0 ?
                            <NoResultFound />
                            :
                            stationlist.map((station, i)=>{
                                const{name,status, zmk, zmkKcv, zpk, zpkKcv, id, dateCreated} = station;
                                const statusClass = () =>{
                                    if(status.toLowerCase()==='active'){
                                        return 'tabactive'
                                    } 
                                    else{
                                        return 'tabinactive'
                                    }
                                }

                                return(
                                    <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{name}</td>
                                    <td>{zmk}</td>
                                    <td>{zpk}</td>
                                    <td>{zmkKcv}</td>
                                    <td>{zpkKcv}</td>
                                    <td>{dateCreated ? moment(new Date(dateCreated)).format('D/MM/YYYY') : 'N/A'}</td>
                                    <td><span className={`${statusClass()}`}>{status}</span></td>
                                    <td><FiEdit onClick={()=>showModal('edit', station)} size={20} className="crust-grey mr-15" />< RiDeleteBin5Line size={20}  className="crust-danger" onClick={()=>onDelete(id)}/></td>
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

export default withTimeout(Stations)