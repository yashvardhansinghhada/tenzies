import React from 'react'

function Modal(props) {
    function clickHandler() {
        if (props.name === "") {
            alert("Please enter a name");
        }
        else {
            props.toggle()
        }
    }
    return (
        <div id="myModal" className="fixed top-0 left-0 w-full h-full overflow-auto bg-slate-800/80 flex items-center justify-center">


            <div className="bg-white flex flex-col w-full max-w-[400px] ">
                <div className='flex justify-center text-2xl border border-b-2 p-2'>
                    <h1 className=''>Enter your name</h1>

                </div>
                <div className='p-2 flex flex-col items-center space-y-2'>

                    <input value={props.name} onChange={props.eventHandler} className='w-full border border-1 border-black rounded-sm' type="text" name="name" placeholder='Name' />

                    <button
                        type='submit'
                        onClick={clickHandler}
                        className="bg-[#5035FF] shadow-md text-white rounded-lg px-2 py-1 active:shadow-inner active:shadow-black focus:outline-none"
                    >Save</button>
                </div>
            </div>

        </div>
    )
}

export default Modal