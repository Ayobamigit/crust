import React from 'react'

const AddStation = (props) => {
    return (
        <form className="form-body col-md-12">
            <div className="formgroup">
                <label>Name:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="name"
                    value={props.state?.name}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>ZMK:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="zmk"
                    value={props.state?.zmk}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>ZMKKCV:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="zmkKcv"
                    value={props.state?.zmkKcv}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>ZPK:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="zpk"
                    value={props.state?.zpk}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>ZPKKCV:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="zpkKcv"
                    value={props.state?.zpkKcv}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>Status:</label>
                <select 
                    className="formcontrol" 
                    type="text"   
                    name="status"
                    value={props.state?.status}
                    onChange={props.onChange}
                    required
                >
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    
                </select>
                
            </div>
        </form>
    )
}

export default AddStation