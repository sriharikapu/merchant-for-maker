import React, { Component } from 'react'
import store from 'store'
import ProfileSnippet from '../components/ProfileSnippet';
import { Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody } from 'reactstrap'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Orders extends Component {
    constructor() {
        super()
        this.state = {
            modal: false
        }
    }

    render() {
        const orders = store.get('requests', [])

        const orderRows = _.map(orders, (order, i) => {
            return <ListGroupItem key={i}>
                <div className='d-flex justify-content-between align-items-center'>
                    <b>TOTAL</b>
                    <div className='d-flex align-items-center'>
                        <b>{order.grandTotal}</b>
                        <Button onClick={this.viewPastOrder.bind(this, order)} color='plain'>
                            <FontAwesomeIcon icon='qrcode'></FontAwesomeIcon>
                        </Button>
                    </div>
                </div>
                <p>
                    <small>{order.receipt}</small>
                </p>
            </ListGroupItem>
        })

        const { order } = this.state
        return <div>
            <ProfileSnippet />

            <ListGroup>
                {orderRows}
            </ListGroup>

            {order && <Modal centered={true} isOpen={this.state.modal}>
                <ModalHeader toggle={this.closeModal.bind(this)}>Order Details</ModalHeader>
                <ModalBody>
                    <pre>{order.receipt}</pre>
                </ModalBody>
            </Modal>}
        </div>
    }

    viewPastOrder(order) {
        this.setState({ order, modal: true })
    }

    closeModal() {
        this.setState({
            modal: false
        })
    }
}