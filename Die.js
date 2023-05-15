import React from 'react'

function Die(props) {
    return (
        <div key={props.id}
            className={props.isHeld ? "bg-[#59E391] die flex items-center justify-center" : 'bg-white die flex items-center justify-center'}
            onClick={props.hold}
        > {props.value}</div >
    )
}

export default Die