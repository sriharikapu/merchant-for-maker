import React, { Component } from 'react'
import { Button } from 'reactstrap'
import ProfileSnippet from '../components/ProfileSnippet';
import { Link } from 'react-router-dom'

export default class Settings extends Component {
    render() {
        return <div>
            <ProfileSnippet />
            <Link to='/menu/manage'>Manage Menu</Link>
            <div className='bg-light border-top border-bottom'>
                <b>DANGER ZONE</b>
            </div>
            <div className='p-1 border-bottom'>
                <Button outline block color='danger' onClick={this.deleteStore.bind(this)}>Delete my store</Button>
            </div>
        </div>
    }

    deleteStore() {
        localStorage.clear()
        const { history } = this.props
        history.replace('/')
    }
}