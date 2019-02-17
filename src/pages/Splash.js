import React, { Component } from 'react'
import { Button } from 'reactstrap'
import logo from '../logo.svg'
import connect from '../lib/connect';

export default class Splash extends Component {
    render() {
        return <div style={{minHeight: '100vh'}}>
            <div className='full-height d-flex flex-column pb-5'>
                <div className='mb-5 d-flex justify-content-around align-items-center m-3'>
                    <div className='w-25 d-flex justify-content-between'>
                        <a href='#about'>About</a>
                        <a></a>
                    </div>
                    <img className='w-25' style={{minWidth: '250px'}} src={logo} />
                    <div className='w-25 d-flex justify-content-between'>
                        <a onClick={this.signIn.bind(this)}>Connect to {process.env.REACT_APP_BURNER_NAME}</a>
                    </div>
                </div>
                <div className='d-flex justify-content-center flex-column h-100'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-6 offset-lg-3 col-md-12'>
                                <div className='mt-5 text-center d-flex flex-grow flex-column justify-content-center'>
                                    <h5>A seamless merchant experience for {process.env.REACT_APP_BURNER_NAME}</h5>
                                    <div>
                                        <Button color='primary' size='lg' onClick={this.signIn.bind(this)}>Connect with {process.env.REACT_APP_BURNER_NAME}</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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