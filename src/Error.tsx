
import React from 'react'

type ErrorProps = {
    msg: String
}

const Error: React.FC<ErrorProps> = (props) => {
    return (
        <div className="error">
            An error has been detected. <br />
            Error Type := {props.msg}
        </div>
    )
}

export default Error