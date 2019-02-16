import React, { Component } from 'react'
import { Button } from 'reactstrap'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'

export default class Storefront extends Component {
    constructor() {
        super()
        this.state = {
            store: null,
            loaded: false,
            creatingStore: false
        }
    }

    componentWillMount() {
        this.setState({ storefront: this.getStorefront(), loaded: true })
    }

    render() {
        const { loaded, storefront, creatingStore, showStoreForm } = this.state

        return <div className='container'>
            {!loaded && <div>
                Loading...
            </div>}

            {loaded && storefront && <div>
                <h3>{storefront.name}</h3>
                <img height="100" className='' src={storefront.image} />
                <Link to='/settings'>Settings</Link>
            </div>}

            {/* {loaded && storefront === null && <div className='d-flex justify-content-center'>
                <div className='mt-5 p-3 border rounded shadow d-flex flex-column align-items-center'>
                    <img src={logo} />
                    {!creatingStore && !showStoreForm && <div>
                        <img src={'/payment.png'} />
                        <p>
                            <b>Start accepting USD payments with the Ethereum blockchain.</b>
                        </p>
                        <Button color='primary' size='lg' onClick={this.startCreateStore.bind(this)}>Create my store</Button>
                    </div>}
                    {creatingStore && <div>
                    </div>}
                </div>
            </div>} */}
        </div>
    }

    startCreateStore() {
        this.setState({ creatingStore: true })
        setTimeout(() => {
            this.setState({ creatingStore: false, showStoreForm: true })
        }, 500)
    }

    getStorefront() {
        const storefront = localStorage.getItem('store')
        if (storefront === null) {
            return null
        } else {
            try {
                return JSON.parse(storefront)
            } catch (e) {
                return null
            }
        }
    }
}