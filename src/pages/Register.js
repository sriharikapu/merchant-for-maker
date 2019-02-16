import React, { Component } from 'react'
import { Button, ListGroup, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap'
import ProfileSnippet from '../components/ProfileSnippet';
import _ from 'lodash'
import MenuItem from '../components/MenuItem';
import store from 'store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            modal: true,
            order: store.get('order', [])
        }
    }
    render() {
        const menuItems = JSON.parse(localStorage.menu)

        const menuRows = _.map(menuItems, (item, i) => {
            return <MenuItem icon='plus-square' item={item} key={i} onClick={this.addItem.bind(this)} />
        })

        const { order } = this.state
        const ordersLength = order.length

        const orderRows = _.map(order, (item, i) => {
            return <MenuItem item={item} icon='trash' key={i} onClick={this.removeItem.bind(this, i)} />
        })

        const leftButton = <Button onClick={this.openModal.bind(this)} style={{fontSize: '1em'}} className='text-light' color='plain'><FontAwesomeIcon icon='cash-register' /><sub><Badge color='secondary'>{ordersLength}</Badge></sub></Button>
        return <div>
            <ProfileSnippet leftButton={leftButton} />
            <ListGroup>
                {menuRows}
            </ListGroup>

            <Modal isOpen={this.state.modal} toggle={this.closeModal.bind(this)}>
                <ModalHeader toggle={this.closeModal.bind(this)}>
                    Order Total
                </ModalHeader>
                <ModalBody>
                    <img width='100%' src='/qrcode.png' />
                    <ListGroup>
                        {orderRows}
                    </ListGroup>
                </ModalBody>
            </Modal>
        </div>
    }

    openModal() {
        this.setState({ modal: true })
    }

    closeModal() {
        this.setState({ modal: false })
    }

    addItem(item) {
        const order = store.get('order', [])
        order.push(item)
        this.setState({ order })
        store.set('order', order)
    }

    removeItem(index) {
        const order = store.get('order')
        order.splice(index, 1)
        this.setState({ order })
        store.set('order', order)
    }

    deleteStore() {
        localStorage.clear()
        const { history } = this.props
        history.replace('/')
    }
}