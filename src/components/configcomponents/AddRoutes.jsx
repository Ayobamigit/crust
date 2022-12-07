import React from 'react'

const AddRoutes = (props) => {
  return (
    <form className="form-body col-md-12">
    <div className="formgroup">
        <label>Type:</label>
        <input 
            className="formcontrol" 
            type="text"   
            name="type"
            value={props.type}
            onChange={props.onChange}
        />
         
    </div>
    <div className="formgroup">
        <label>Maximum amount:</label>
        <input 
            className="formcontrol" 
            type="text"   
            name="maximumAmount"
            value={props.maximumAmount}
            onChange={props.onChange}
        />
         
    </div>
    <div className="formgroup">
        <label>Minimum amount:</label>
        <input 
            className="formcontrol" 
            type="text"   
            name="minimumAmount"
            value={props.minimumAmount}
            onChange={props.onChange}
        />
         
    </div>
    <div className="formgroup">
        <label>Client:</label>
        <select 
            className="formcontrol" 
            type="text"   
            name="client"
            value={props.client}
            onChange={props.onChange}
            required
        >
            <option value="">Select client</option>
            <option value="active">Active</option>
            <option value="inactive">In-Active</option>
            
        </select>
        
    </div>
    <div className="formgroup">
        <label>Scheme:</label>
        <select 
            className="formcontrol" 
            type="text"   
            name="scheme"
            value={props.scheme}
            onChange={props.onChange}
            required
        >
            <option value="">Select scheme</option>
            <option value="active">Active</option>
            <option value="inactive">In-Active</option>
            
        </select>
        
    </div>
    <div className="formgroup">
        <label>Station:</label>
        <select 
            className="formcontrol" 
            type="text"   
            name="station"
            value={props.station}
            onChange={props.onChange}
            required
        >
            <option value="">Select station</option>
            <option value="active">Active</option>
            <option value="inactive">In-Active</option>
            
        </select>
        
    </div>
    <div className="formgroup">
        <label>Precedence:</label>
        <input 
            className="formcontrol" 
            type="text"   
            name="precedence"
            value={props.precedence}
            onChange={props.onChange}
        />
         
    </div>
    </form>
  )
}

export default AddRoutes