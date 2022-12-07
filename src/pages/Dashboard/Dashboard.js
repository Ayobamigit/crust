import React, { useEffect, useState } from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'
import axios from '../../plugins/axios'
import { dashboardData } from '../../plugins/url'
import { Container, Row, Col } from 'react-bootstrap'
import {MdOutlinePayment, MdPayments, MdPeople} from 'react-icons/md'
import {BsPhone} from 'react-icons/bs'
import {RiExchangeFill} from 'react-icons/ri'
import {FaMoneyBillWave} from 'react-icons/fa'
import { Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement, CategoryScale, Title, Tooltip, Legend} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import List from '../../components/iconjsx/List'

Chart.register(CategoryScale, ArcElement, Title, Tooltip, Legend, ChartDataLabels);
const Dashboard = () => {
  const [state, setState] = useState({
    clientsList: 0,
    merchantList: 0,
    usersList:0,
    stationList: 0,
    terminalsList : 0,
    interswitchSuccess:0,
    unifiedPayment:0,
    transactionFailureCount: 0,
    transactionSuccessCount :  0
  })
  const {clientsList, merchantList, stationList, terminalsList, transactionFailureCount, transactionSuccessCount, usersList, interswitchSuccess, unifiedPayment} = state
  useEffect(()=>{
    axios({
      url:`${dashboardData}`,
      method:'get'
    }).then(res=>{
      if(res.data.respCode === '00'){
        const {clientsList, merchantList, stationList, terminalsList, transactionFailureCount, transactionSuccessCount, usersList, stationSuccessPercentage} = res.data.respBody
        setState(state=>({
          ...state,
          clientsList,
          merchantList,
          usersList,
          stationList,
          terminalsList,
          interswitchSuccess: stationSuccessPercentage?.interswitchSuccess,
          unifiedPayment: stationSuccessPercentage?.unifiedPayment,
          transactionFailureCount,
          transactionSuccessCount
        }))
      }
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const value ={
    labels: [ 'Successful', 'Failed'],
    datasets:[
        {
            data:[ 10, 10],
            // data:[ transactionSuccessCount, transactionFailureCount],
            // borderColor:'transparent',
            backgroundColor:[
                '#1BC5BD',
                '#FF403B',
                
            ],
            hoverBackgroundColor: [
              '#1BC5BD',
              '#FF403B',
            ]
           
        }
    ]
  };

  const count ={
    labels: [ 'Unified Payment', 'Interswitch'],
    datasets:[
        {
            data:[ 50, 50],
            // data:[ unifiedPayment, interswitchSuccess],
            // borderColor:'transparent',
            backgroundColor:[
                '#1BC5BD',
                '#10A5CD',
                
            ],
            hoverBackgroundColor: [
              '#1BC5BD',
              '#10A5CD',
            ]
           
        }
    ]
  };
  return (
    <Layout title="Dashboard">
      <Container className='font-default'>
      <Row>
        <Col lg={3}>
          <div className="White">
              <div className="Card-body">
                  <div className="Icon-white">
                      <RiExchangeFill size={30}/>
                  </div>
                  <div className="Figure-white">{merchantList}</div>
                  <div className="Text-white">Total Merchants</div>
              </div>
          </div>
        </Col>
        <Col lg={8}>
          <Row>
              <Col>
                  <div className="Purple">
                      <div className="Card-body">
                          <div className="Icon">
                              <MdPeople size={30}/>
                          </div>
                          <div className="Figure">{usersList}</div>
                          <div className="Text">Total Users</div>
                      </div>
                  </div>
              </Col>
              <Col>
          <div className="Dark">
              <div className="Card-body">
                  <div className="Icon">
                      <MdPayments size={30}/>
                  </div>
                  <div className="Figure">{clientsList}</div>
                  <div className="Text">Total Clients</div>
              </div>
          </div>
        </Col>

        <Col>
          <div className="Teal">
              <div className="Card-body">
                  <div className="Icon">
                      <BsPhone size={30}/>
                  </div>
                  <div className="Figure">{terminalsList}</div>
                  <div className="Text">Total Terminals</div>
              </div>
          </div> 
        </Col>
        
        <Col>
          <div className="Dark">
              <div className="Card-body">
                  <div className="Icon">
                      <FaMoneyBillWave size={30}/>
                  </div>
                  <div className="Figure">{stationList}</div>
                  <div className="Text">Total Stations</div>
              </div>
          </div>
        </Col>

          </Row>
          
        </Col> 
      </Row>

      <Row className='mt-5'>

      <Col lg={6}>
        <div className='piechart-padding'>
          <div className='d-flex justify-content-between'>
            <h6 className='crust-dark-blue-light'>Transaction Performance</h6>
          </div>

          <div className='pt-2 py-5 px-9 d-flex justify-content-center'>
            <Doughnut 
              data={value} 
              width={250}
              height={250}
              options={{ 
                  responsive: false,
                  position: 'center',
                  cutout: '60%',
                  tooltips:{
                    enabled: true,
                  },
                  plugins:{
                    legend:{
                      display: false
                    },
                    datalabels: {
                        color:'#FFF',
                        font:{
                            family: "DM Sans",
                            size: 12,
                            weight: 600
                        },
                    }
                  }
              }}
            />
          </div>

          <div className='px-4 d-flex justify-content-center'>
            <div className='border-right px-4'>
              <p className='text-grey fs-12 mb-0'>
                <List className='fill-success mr-05'/>
                Successful Count
              </p>
              <h3 className='fs-14 text-heading fw-600 mt-08' style={{paddingLeft:'14px'}}>10</h3>
            </div>
            <div className='px-4'>
              <p className='text-grey fs-12 mb-0'>
                <List className='fill-danger mr-05'/>
                Failed Count
              </p>
              <h3 className='fs-14 text-heading fw-600 mt-08' style={{paddingLeft:'14px'}}>10</h3>
            </div>
          </div>
        </div>
      </Col>

      <Col lg={6}>
        <div className='piechart-padding'>
          <div className='d-flex justify-content-between'>
            <h6 className='crust-dark-blue-light'>Stations Success Percentage</h6>
          </div>

          <div className='pt-2 py-5 px-9 d-flex justify-content-center'>
            <Doughnut 
              data={count} 
              width={250}
              height={250}
              options={{ 
                  responsive: false,
                  position: 'center',
                  cutout: '60%',
                  tooltips:{
                    enabled: true,
                  },
                  plugins:{
                    legend:{
                      display: false,
                    },
                    datalabels: {
                        color:'#FFF',
                        font:{
                            family: "DM Sans", 
                            size: 12,
                            weight: 600
                        },
                    }
                  }
              }}
          
            />
          </div>

          <div className='px-4 d-flex justify-content-center'>
            <div className='border-right px-4'>
              <p className='text-grey fs-12 mb-0'>
                <List className='fill-blue mr-05'/>
                Interswitch Success %
              </p>
              <h3 className='fs-14 text-heading fw-600 mt-08' style={{paddingLeft:'14px'}}>10%</h3>
            </div>
            <div className='px-4'>
              <p className='text-grey fs-12 mb-0'>
                <List className='fill-success mr-05'/>
                Unified Payment Success %
              </p>
              <h3 className='fs-14 text-heading fw-600 mt-08' style={{paddingLeft:'14px'}}>10%</h3>
            </div>
          </div>
        </div>
      </Col>
    </Row>
      </Container>
    </Layout>
  )
}

export default withTimeout(Dashboard)