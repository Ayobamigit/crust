import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Layout from '../../components/layout/Layout'
import SubmitLoader from '../../components/submitloader/SubmitLoader'
import withTimeout from '../../hoc/withTimeout'
import axios from '../../plugins/axios'
import swal from '../../plugins/swal'
import { updateClient, viewClients } from '../../plugins/url';
import { useMatch, useNavigate } from 'react-router'

const ViewClient = () => {
  const navigate = useNavigate()
  const match = useMatch('/client/:id');
  const id = match ?  match.params.id : ''
  const [state, setState] = useState({
    clientEmail:'',
    clientName:'',
    clientPhone:'',
    ctmk:'',
    interswitchUniqueMID:'',
    interswitchUniqueRID:'',
    interswitchUniqueSettlementAccount:'',
    interswitchUniqueTID:'',
    upUniqueMID:'',
    upUniqueRID:'',
    upUniqueSettlementAccount:'',
    upUniqueTID:'',
    callBackUrl:'',
    loading: false,
    readOnly: true
  })

  const {loading, clientEmail, clientName, clientPhone, ctmk, interswitchUniqueRID, interswitchUniqueMID, interswitchUniqueSettlementAccount, interswitchUniqueTID,
  upUniqueMID, upUniqueRID, upUniqueSettlementAccount, upUniqueTID, callBackUrl, readOnly} = state;

  const onChange =(e)=>{
    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
  }

  const onClickEdit = () =>{
    setState(state=>({
      ...state,
      readOnly: !readOnly
    }))
  }

  useEffect(()=>{
    axios({
      method: 'post',
      url:`${viewClients}/${id}`,
    }).then(res=>{
      if(res.data.respCode === '00'){
        const {clientEmail, clientName, clientPhone, ctmk, interswitchUniqueRID, interswitchUniqueMID, interswitchUniqueSettlementAccount, 
          interswitchUniqueTID, upUniqueMID, upUniqueRID, upUniqueSettlementAccount, upUniqueTID, callBackUrl} = res.data.respBody
        setState(state=>({
          ...state,
          clientEmail, 
          clientName, 
          clientPhone, 
          ctmk, 
          interswitchUniqueRID, 
          interswitchUniqueMID, 
          interswitchUniqueSettlementAccount, 
          interswitchUniqueTID, 
          upUniqueMID, 
          upUniqueRID, 
          upUniqueSettlementAccount, 
          upUniqueTID, 
          callBackUrl
        }))

      }
    }).catch(err=>{
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`,
      })
    })
  },[])

  const onUpdateClient = (e) =>{
    e.preventDefault();
    setState(state=>({
      ...state,
      loading: true
    }))

    let reqbody = {
      clientEmail,
      clientName,
      clientPhone,
      ctmk,
      interswitchUniqueMID,
      interswitchUniqueRID,
      interswitchUniqueSettlementAccount,
      interswitchUniqueTID,
      upUniqueMID,
      upUniqueRID,
      upUniqueSettlementAccount,
      upUniqueTID,
      callBackUrl
    }

    axios({
      method: 'post',
      url:`${updateClient}/${id}`,
      data: reqbody
    }).then(res=>{
      setState(state=>({
        ...state,
        loading: false
      }))
      if(res.data.respCode === '00'){
        swal.fire({
          // type:'success',
          title: 'Successful....',
          icon: 'success',
          text: `Client updated successfully`
      })
        navigate('/clients')
      }
    }).catch(err=>{
      setState(state=>({
        ...state,
        loading: false
      }))
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`,
    })
    })
  }
  return (
    <Layout title="Clients">
      <Container>
        <div className="TableList" style={{width:"80%"}}>
          <Row className='align-items-center'>
            <Col lg={9}>
            <h6 className="crust-dark-blue-light pt-25 ml-25 mb-20">
                Client Details
            </h6>
            </Col>
            
            <Col lg={3}>
                <button className="button-primary" onClick={onClickEdit}>
                    Edit Information 
                </button>
            </Col>
          </Row>

          <div className="line"></div>

          <form className="form-body" onSubmit={onUpdateClient}>

            <div className="info-body">

              <Row className="formgroup">

                <Col lg={4}>
                  <label>Client Name</label>
                  <div className="input-group">
                    <input  
                      className="formcontrol" 
                      type="text" 
                      name="clientName"
                      value={clientName}
                      disabled={readOnly}
                      onChange = {onChange}
                    />
                  </div>
                </Col>  

                <Col lg={4}>
                  <label>Client Email:</label>
                  <div className="input-group">
                    <input 
                        type="text" 
                        className="formcontrol" 
                        required 
                        onChange={onChange}
                        name="clientEmail"
                        value={clientEmail}
                        disabled={readOnly}
                      />
                  </div>
                </Col>

                <Col lg={4}>
                  <label>Phone number:</label>
                  <div className="input-group">
                    <input 
                        type="text" 
                        className="formcontrol" 
                        onChange={onChange}
                        name="clientPhone"
                        value={clientPhone}
                        disabled={readOnly} 
                      />
                  </div>
                </Col>
              </Row>
              <Row className="formgroup">
                <Col lg={4}>
                  <label>Interswitch MID:</label>
                  <div className="input-group">
                    <input 
                        type="text" 
                        className="formcontrol" 
                        onChange={onChange}
                        name="interswitchUniqueMID"
                        value={interswitchUniqueMID}
                        disabled={readOnly} 
                      />
                  </div>
                </Col>

                <Col lg={4}>
                  <label>Interswitch RID:</label>
                  <div className="input-group">
                    <input 
                        type="text" 
                        className="formcontrol" 
                        onChange={onChange}
                        name="interswitchUniqueRID"
                        value={interswitchUniqueRID}
                        disabled={readOnly} 
                      />
                  </div>
                </Col>

                <Col lg={4}>
                  <label>Interswitch TID:</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "interswitchUniqueTID"
                      value={interswitchUniqueTID}
                      disabled={readOnly} 
                    />
                  </div>
                </Col>
              </Row>


              <Row className="formgroup">
                <Col lg={4}>
                  <label>Unified Payment TID:</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "upUniqueTID"
                      value={upUniqueTID}
                      disabled={readOnly} 
                    />
                  </div>
                </Col>
                <Col lg={4}>
                  <label>Unified Payment MID:</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "upUniqueMID"
                      value={upUniqueMID}
                      disabled={readOnly} 
                    />
                  </div>
                </Col>
                <Col lg={4}>
                  <label>Unified Payment RID:</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "upUniqueRID"
                      value={upUniqueRID}
                      disabled={readOnly} 
                    />
                  </div>
                </Col>
              </Row>

              <Row className="formgroup">
                <Col lg={6}>
                  <label>Interswitch Settlement Account:</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "interswitchUniqueSettlementAccount"
                      value={interswitchUniqueSettlementAccount}
                      disabled={readOnly} 
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <label>UP Settlement Account:</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="formcontrol"
                      onChange={onChange}
                      name = "upUniqueSettlementAccount"
                      value={upUniqueSettlementAccount}
                      disabled={readOnly} 
                    />
                  </div>
                </Col>
              </Row>
              <Row className="formgroup">
                <Col lg={6}>
                  <label>CMTK:</label>
                  <div className="input-group">
                    <input 
                    type="text" 
                    className="formcontrol"
                    onChange={onChange}
                    name="ctmk"
                    value={ctmk}
                    disabled={readOnly}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <label>Callback Url:</label>
                  <div className="input-group">
                    <input 
                    type="text" 
                    className="formcontrol"
                    onChange={onChange}
                    name="callBackUrl"
                    value={callBackUrl}
                    disabled={readOnly}
                    />
                  </div>
                </Col>
              </Row>

            </div>

           { !readOnly&& <div className="textend" style={{padding:"30px"}}>
              <button
                  type='submit' 
                  className="button-primary px-9 py-04" 
                  disabled={loading}
              >
                  {
                    loading ?
                    <SubmitLoader />
                    :
                    'Update Client'
                  }
              </button>
            </div>}
          </form>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(ViewClient)