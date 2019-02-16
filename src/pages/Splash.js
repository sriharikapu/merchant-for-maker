import React, { Component } from 'react'
import { Button } from 'reactstrap'
import signIn from 'sign-in-with-burner'
import store from 'store'

export default class Splash extends Component {
    render() {
        return <div className='d-flex h-100'>
            <Button color='primary' size='lg' onClick={this.signIn.bind(this)}>Sign in with {process.env.REACT_APP_BURNER_NAME}</Button>
        </div>
    }

    signIn() {
        signIn({
            burnerUrl: process.env.REACT_APP_BURNER_URL,
            siteName: `Merchant for ${process.env.REACT_APP_BURNER_NAME}`
        })
        .then(address => {
            store.set('address', address)
        })
        .catch(e => {

        })
    }
}