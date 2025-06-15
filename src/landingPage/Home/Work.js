import React from 'react';
function Work() {
    return ( 
        <>
            <div className='container my-4'>
                <h2 className='text-center mb-4'> How Does It Work?</h2>
                <div className='row text-center'>
                    <div className='col-md-4'>
                        <div className='p-3'>
                            <i className="fas fa-user-plus fa-3x text-primary mb-3"></i>
                            <h5>Step 1: Sign Up</h5>
                            <p>Create an account to start tracking your expenses.</p>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='p-3'>
                        <i className="fas fa-edit fa-3x text-success mb-3"></i>
            <h5>Step 2: Add Expenses</h5>
            <p>Manually enter your expenses or categorize them easily.</p>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='p-3'>
                        <i className="fas fa-chart-line fa-3x text-warning mb-3"></i>
                        <h5>Step 3: Analyze & Save</h5>
                        <p>Get insights, set budgets, and start saving smartly.</p>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}

export default Work;