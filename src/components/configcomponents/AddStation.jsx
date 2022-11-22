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
                    value={props.name}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>ZMK:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="zmk"
                    value={props.zmk}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>ZMKKCV:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="zmkKcv"
                    value={props.zmkKcv}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>ZPK:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="zpk"
                    value={props.zpk}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>ZPKKCV:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="zpkKcv"
                    value={props.zpkKcv}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>Status:</label>
                <select 
                    className="formcontrol" 
                    type="text"   
                    name="status"
                    value={props.status}
                    onChange={props.onChange}
                    required
                >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">In-Active</option>
                    
                </select>
                
            </div>
        </form>
    )
}

export default AddStation