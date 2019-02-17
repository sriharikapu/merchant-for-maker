import React, { Component } from 'react'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import ProfileSnippet from '../components/ProfileSnippet';
import { Link } from 'react-router-dom'
import store from 'store'
import connect from '../lib/connect';

export default class Settings extends Component {
    render() {
        return <div>
            <ProfileSnippet />
            <ListGroup>
                <ListGroupItem>
                    <Link to='/menu/manage'>Manage Menu</Link>
                </ListGroupItem>

                <ListGroupItem className='d-flex justify-content-between'>
                    <span><small><b>WALLET</b></small></span>
                    <div className='text-right'>
                        <div>
                            <span><small><b>{store.get('address').slice(0, 6)}...</b></small></span>
                        </div>
                        <Button color='link' size='sm' onClick={this.changeWallet.bind(this)}>Change wallet</Button>
                    </div>
                </ListGroupItem>
            </ListGroup>
            <div className='bg-light border-top border-bottom p-3'>
                <b>DANGER ZONE</b>
            </div>
            <div className='p-1 border-bottom'>
                <Button outline block color='danger' onClick={this.deleteStore.bind(this)}>Delete my store</Button>
            </div>
        </div>
    }

    changeWallet() {
        connect()
    }

    deleteStore() {
        if (window.confirm('Are you sure? Deleting your store is irreversible!')) {
            localStorage.clear()
            const { history } = this.props
            history.replace('/')
        }
    }
}