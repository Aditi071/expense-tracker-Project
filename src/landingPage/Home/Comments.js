import React from 'react';
function Comments() {
    return ( 
        <>
            <div className='container mt-5 my-5'>
            <h2 className='text-center mb-4'>What Our Customers Say</h2>
                <div className='row text-center mt-4'>
                    <div className='col-md-3'>
                        <div className='card p-3 shadow'>
                            <p className='comments'>"This app is amazing for tracking expenses!"</p>
                            <h5 className='m'>- Anil Gupta</h5>
                        </div>
                    </div>
                    <div className='col-md-3 mb-5'>
                        <div className='card p-3 shadow'>
                        <p className='comments'>"Helps me manage my budget efficiently!"</p>
                        <h5 className='m'>- Ramesh Kumar</h5>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card p-3 shadow'>
                            <p className='comments'>"This app makes budgeting so easy and easy to use!"</p>
                            <h5 className='m'>- Sneha Verma</h5>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card p-3 shadow'>
                        <p className='comments'>" I love the simple design and easy-to-use features."</p>
                        <h5 className='m'>- Priya Sharma</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>    
    );
}

export default Comments;