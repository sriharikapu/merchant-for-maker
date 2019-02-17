import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ProfileSnippet extends Component {
    render() {
        const { leftButton } = this.props
        const store = JSON.parse(localStorage.getItem('store'))
        const { image, name } = store
        return <div>
            <div style={{
                height: '120px',
                background: '#222'
            }}>
                <div className='d-flex justify-content-between p-2' style={{fontSize: '2em'}}>
                    <div className='d-flex'>
                        {!leftButton && <Link to='/register' className='text-light'><FontAwesomeIcon icon='cash-register'></FontAwesomeIcon></Link>}
                        {leftButton && leftButton}
                        <Link to='/orders' className='text-light ml-3'>
                        <FontAwesomeIcon icon='history'></FontAwesomeIcon></Link>
                    </div>
                    <Link to='/settings' className='text-light'><FontAwesomeIcon icon='cog'></FontAwesomeIcon></Link>
                </div>
            </div>
            <div className='d-flex flex-column align-items-center' style={{marginTop: '-50px'}}>
                <img className='shadow rounded-circle border-info' width='100' src={image} />
                <h5>{name}</h5>
            </div>
        </div>
    }
}