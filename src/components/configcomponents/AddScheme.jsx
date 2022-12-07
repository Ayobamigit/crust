import React from 'react'

const AddScheme = (props) => {
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
                <label>Regex:</label>
                <input 
                    className="formcontrol" 
                    type="text"   
                    name="regex"
                    value={props.state?.regex}
                    onChange={props.onChange}
                />
                 
            </div>
        </form>
    )
}

export default AddScheme