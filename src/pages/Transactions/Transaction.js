import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'
import { useMatch, useNavigate } from 'react-router'
import Layout from '../../components/layout/Layout'
import SubmitLoader from '../../components/submitloader/SubmitLoader'
import TransactionDiv from '../../components/transactionComponent/TransactionDiv'
import withTimeout from '../../hoc/withTimeout'
import axios from '../../plugins/axios'
import {viewTransaction } from '../../plugins/url'

const Transaction = () => {
    const navigate = useNavigate()
    const match = useMatch('/transaction/:id');
    const id = match ?  match.params.id : ''
    const [state, setState] = useState({
      transactionDetails:''
    })
  
    const {transactionDetails} = state;
    const statusClass = () =>{
        let responsecode = transactionDetails?.responsecode
        let status = ''
        if(responsecode === '00'){
          status = 'Approved'
        } 
        else if(responsecode === '96'){
            status = 'System Malfunction'
        }else if(responsecode === '91'){
            status = 'Issuer or Switch Inoperative'
        }
        else if(responsecode === '55'){
            status = 'Incorrect PIN'
        }
        else if(responsecode === '12'){
            status = 'Invalid Transaction'
        }
        else{
            status = 'Failed'
        }
        return status
    }

    const getAmount = () =>{
        let amount = 0.00
        if(transactionDetails?.de4){
            let res = parseFloat(transactionDetails.de4);
            amount = res/100
        }
        return <CurrencyFormat value={amount || "0"} displayType={'text'} thousandSeparator={true} prefix={'₦ '} decimalScale={2} fixedDecimalScale={true} />;
    }

    const getTransaction = () =>{
        axios({
          method: 'get',
          url:`${viewTransaction}/${id}`,
        }).then(res=>{
          if(res.data.respCode === '00'){
            setState(state=>({
              ...state,
              transactionDetails:res.data.respBody
            }))
          }
        }).catch(err=>{
          console.log(err)
        })
      
      }
    
      useEffect(()=>{
        getTransaction();
      },[])  
  return (
    <Layout title="Transactions">
          <Container>
        <div className="TableList" style={{width:"50%"}}>
        
          <h6 className="crust-dark-blue-light pt-25 ml-25 mb-20">
              Transaction Details
          </h6>

          <div className="line"></div>

          <div className='transaction-details ml-25'>
            <TransactionDiv 
                title="Amount"
                value={getAmount()}
            />

            <TransactionDiv 
                title="Reference ID"
                value={transactionDetails?.de37}
            />

            <TransactionDiv 
                title="Terminal Type"
                value={transactionDetails?.terminals?.terminalType}
            />

            <TransactionDiv 
                title="Terminal ID"
                value={transactionDetails?.de41}
            />

            <TransactionDiv 
                title="Processed By"
                value={transactionDetails?.processedBy}
            />

            <TransactionDiv 
                title="Scheme"
                value={transactionDetails?.scheme}
            />

            <TransactionDiv 
                title="Card Pan"
                value={transactionDetails?.de2}
            />
            <TransactionDiv 
                title="Merchant Name and Location"
                value={transactionDetails?.de43}
            />

            <TransactionDiv 
                title="Merchant ID"
                value={transactionDetails?.de42}
            />
            <TransactionDiv 
                title="Client Name"
                value={transactionDetails?.terminals?.merchant?.clients.clientName}
            />

            <TransactionDiv 
                title="Date Created"
                value={transactionDetails?.createdAt ? moment(new Date(transactionDetails?.createdAt)).format('lll') : 'N/A'}
            />
            <TransactionDiv 
                title="Payment Code"
                value={transactionDetails?.responsecode}
            />

            <TransactionDiv 
                title="Payment Status"
                value={statusClass()}
            />

            
          </div>
            
        </div>
      </Container>
    </Layout>
  )
}

export default withTimeout(Transaction)