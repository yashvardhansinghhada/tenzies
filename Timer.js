import React from 'react'

function Timer({ timer }) {
    return (
        <div className='space-x-1 flex'>
            <h1>Time: </h1>
            <div>

                <span>{timer.min <= 9 ? "0" + timer.min : timer.min}</span>
                <span>
                    min
                </span>

            </div>
            <div>

                <span>{timer.sec <= 9 ? "0" + timer.sec : timer.sec}</span>
                <span>
                    sec
                </span>
            </div>
            <div>

                <span>{timer.count <= 9 ? "0" + timer.count : timer.count}</span>
                <span>ms</span>
            </div>

        </div>
    )
}

export default Timer