import React from 'react'

const AddTerminal = (props) => {
  return (
    <form className="form-body col-md-12">
        <div className="formgroup">
            <label>Terminal ID:</label>
            <input 
                className="formcontrol" 
                type="text"   
                name="terminalID"
                value={props.state?.terminalID}
                onChange={props.onChange}
            />
            
        </div>
        <div className="formgroup">
            <label>Terminal Serial No:</label>
            <input 
                className="formcontrol" 
                type="text"   
                name="terminalSerialNumber"
                value={props.state?.terminalSerialNumber}
                onChange={props.onChange}
            />
            
        </div>
        <div className="formgroup">
            <label>Terminal Type:</label>
            <select 
                className="formcontrol" 
                type="text"   
                name="terminalType"
                value={props.state?.terminalType}
                onChange={props.onChange}
                required
            >
                <option value="">Select type</option>
                <option value="NEXGO">NEXGO</option>
                <option value="PAX">PAX</option>
                <option value="Topwise">Topwise</option>
                
            </select>
            
        </div>
        <div className="formgroup">
            <label>Merchant:</label>
            <select 
                className="formcontrol" 
                type="text"   
                name="merchantId"
                value={props.state?.merchantId}
                onChange={props.onChange}
                required
            >
                <option value="">Select Merchant</option>
                {
                    props.merchants ?
                    props.merchants.map((merchant, i)=>{
                        return (
                        <option value={merchant.id} key={i}>
                        {merchant.firstName + " " + merchant.lastName}
                        </option>
                        )
                    })
                    :
                    null
                }
            </select>
            
        </div>
    </form>
  )
}

export default AddTerminal