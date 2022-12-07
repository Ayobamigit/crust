import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Layout from '../../components/layout/Layout'
import SubmitLoader from '../../components/submitloader/SubmitLoader'
import withTimeout from '../../hoc/withTimeout'
import axios from '../../plugins/axios'
import swal from '../../plugins/swal'
import { createClient } from '../../plugins/url'

const AddClient = () => {
  const navigate = useNavigate()
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
    loading: false
  })

  const {loading, clientEmail, clientName, clientPhone, ctmk, interswitchUniqueRID, interswitchUniqueMID, interswitchUniqueSettlementAccount, interswitchUniqueTID,
  upUniqueMID, upUniqueRID, upUniqueSettlementAccount, upUniqueTID, callBackUrl} = state;

  const onChange =(e)=>{
    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
  }

  const onCreateClient = (e) =>{
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
      url:`${createClient}`,
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
          text: `Client created successfully`
      })
        navigate('/clients')
      }
    }).catch(err=>{
      console.log(err)
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`,
      })
    })
  }
    return (
    <Layout title="Add Client">
      <Container>
        <div className="TableList" style={{width:"80%"}}>
        
          <h6 className="crust-dark-blue-light pt-25 ml-25 mb-20">
              Client Details
          </h6>

          <div className="line"></div>

          <form className="form-body" onSubmit={onCreateClient}>

            <div className="info-body">

              <Row className="formgroup">

                <Col lg={4}>
                  <label>Client Name</label>
                  <div className="input-group">
                    <input  
                      className="formcontrol" 
                      type="text" 
                      name="clientName"
                      onChange = {onChange}
                      required
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
                        required 
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
                        required 
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
                        required 
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
                      required 
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
                      required 
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
                      required 
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
                      required 
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
                      required 
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
                      required 
                    />
                  </div>
                </Col>
              </Row>
              <Row className="formgroup">
                <Col lg={6}>
                  <label>CTMK:</label>
                  <div className="input-group">
                    <input 
                    type="text" 
                    className="formcontrol"
                    onChange={onChange}
                    name="ctmk"
                    required
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
                    required
                    />
                  </div>
                </Col>
              </Row>

            </div>

            <div className="textend" style={{padding:"30px"}}>
              <button
                  type='submit' 
                  className="button-primary px-9 py-04" 
                  disabled={loading}
              >
                  {
                    loading ?
                    <SubmitLoader />
                    :
                    'Create Client'
                  }
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(AddClient)