import React from 'react';
function Features() {
    return ( 
        <>
            <section id='features' className='container'>
                <h2 className='text-center mb-4'>Our Features</h2>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='card'>
                            <img className='card-img-top' src='media/images/feature1.jpg'></img>
                            <div className='card-body'>
                                <h5 className='card-title'>Track Your Spending</h5>
                                <p className="card-text mb-5">Monitor all your expenses and keep track of your spending habits.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 mb-5'>
                        <div className='card'>
                            <img className='card-img-top' src='media/images/feature2.jpg'></img>
                            <div className='card-body'>
                                <h5 className='card-title'>Expanse Report</h5>
                                <p className="card-text">Generate detailed reports to get insights into your financial progress.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card'>
                            <img className='card-img-top' src='media/images/feature3.jpg'></img>
                            <div className='card-body'>
                                <h5 className='card-title'>Budget Planning</h5>
                                <p className="card-text mb-4">Set budgets for different categories and stay within your financial goals.</p>                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>    
    );
}

export default Features;