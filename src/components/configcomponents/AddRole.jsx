import React from 'react'

const AddRole = (props) => {
    return (
        <form className="form-body col-md-12">
            <div className="formgroup">
                <label>Name:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="roleName"
                    value={props.roleName}
                    onChange={props.onChange}
                />
                 
            </div>
            <div className="formgroup">
                <label>Description:</label>
                <textarea 
                    className="formcontrol formcontrol-edit" 
                    type="text-area"
                    name="roleDescription"
                    value={props.roleDescription}
                    onChange={props.onChange}
                ></textarea>
                
            </div>

        </form>
    )
}

export default AddRole