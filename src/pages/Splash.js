import React, { Component } from 'react'
import { Button } from 'reactstrap'
import logo from '../logo.svg'
import connect from '../lib/connect';

const slides = [
    { img: 'create-order', name: 'Create Order' },
    { img: 'charge-customer', name: 'Charge Customer' },
    { img: 'cash-out', name: 'Cash Out' }
]

export default class Splash extends Component {
    render() {
        return <div style={{minHeight: '100vh', backgroundImage: 'url("/geometry.png")'}}>
            <div className='full-height d-flex flex-column justify-content-between'>
                <div className='d-flex justify-content-around align-items-center m-3'>
                    {/* <div className='w-25 d-flex justify-content-between'>
                        <a href='#about'>About</a>
                        <a></a>
                    </div> */}
                    <img className='w-25' style={{minWidth: '250px'}} src={logo} />
                    {/* <div className='w-25 d-flex justify-content-between'>
                        <a onClick={this.signIn.bind(this)}>Connect to {process.env.REACT_APP_BURNER_NAME}</a>
                    </div> */}
                </div>
                {/* <div style={{maxWidth: '320px'}}>
                    <img className='w-100' src='/screenshots/create-order.png' />
                    Create an Order
                </div> */}
                <div className='d-flex justify-content-center flex-grow-1'>
                    <div className='text-center d-flex flex-grow flex-column justify-content-center'>
                        <div style={{maxWidth: '18em', margin: '0 auto'}} >
                            <h5 className='mb-4'>A seamless merchant experience the {process.env.REACT_APP_BURNER_NAME} burner wallet.</h5>
                            <div>
                                <Button color='primary' size='lg' onClick={this.signIn.bind(this)}>Connect with {process.env.REACT_APP_BURNER_NAME}</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-none d-lg-block bg-danger p-2 text-center text-white'>
                    <p>
                        It looks like you are on a desktop, and that's OK,
                        but we should inform you this site is best experienced
                        on a mobile device!
                    </p>
                </div>
            </div>

            <div className='bg-light pt-5 pb-5 pl-2 pr-2' id='about'>
                <div className='d-flex' style={{maxWidth: '640px', margin: '0 auto'}}>
                    <div className='mr-3'>
                        <img width='100px' src='/bufficorn.png' />
                    </div>
                    <div>
                        <h1>About Merchant</h1>
                        <p>
                            Merchant is a payment gateway for users of the <a href={process.env.REACT_APP_BURNER_URL} target='_blank'>{process.env.REACT_APP_BURNER_NAME} burner wallet.</a>
                        </p>
                        <p>
                            Merchant makes it incredibly easy to create a store, sell your stuff, and cash out.
                        </p>

                        <div>
                            <Button color='primary' size='lg'>Get Started</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    signIn() {
        connect()
        .then(() => {
            this.props.history.push('/store/new')
        })
    }
}