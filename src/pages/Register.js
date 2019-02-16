import React, { Component } from 'react'
import { Button, ListGroup, ListGroupItem, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap'
import ProfileSnippet from '../components/ProfileSnippet';
import _ from 'lodash'
import MenuItem from '../components/MenuItem';
import store from 'store'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QRCode from 'qrcode.react'

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            charging: false,
            modal: false,
            order: store.get('order', [])
        }
    }

    componentDidMount() {
        this.createChargeRequest()
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

        const grandTotal = _.sumBy(order, i => parseFloat(i.price))

        const orderBreakdown = <ListGroup>
            <ListGroupItem color='light'>
                <div className='d-flex justify-content-between'>
                    <b>GRAND TOTAL</b>
                    <b>${grandTotal}</b>
                </div>
            </ListGroupItem>
            {orderRows}
        </ListGroup>

        return <div>
            <ProfileSnippet leftButton={leftButton} />
            <ListGroup>
                {menuRows}
            </ListGroup>

            {<div className='d-flex align-items-center flex-column p-5'>
                <p>Need more menu items?</p>
                <Link to='/menu/manage'>Manage Your Menu</Link>
            </div>}

            <Modal centered={true} isOpen={this.state.modal} toggle={this.closeModal.bind(this)}>
                <ModalHeader toggle={this.closeModal.bind(this)}>
                    Order Summary
                </ModalHeader>
                <ModalBody>
                    {orderBreakdown}

                    <Button onClick={this.createChargeRequest.bind(this)} block color='primary' className='mt-2'>
                        <small><b>REQUEST {grandTotal}</b></small>
                    </Button>
                </ModalBody>
            </Modal>

            <Modal centered={true} isOpen={this.state.charging}>
                <ModalHeader>
                    Order Summary
                </ModalHeader>

                <ModalBody>
                    <div className='d-flex text-center align-items-center flex-column'>
                        <span><small><b>{store.get('store').name} requests ${grandTotal}</b></small></span>
                        <QRCode size='128' level='L' value={this.state.chargeURL} />
                        <span>
                            <small>
                                <b>
                                    Scan this code to complete your purchase.
                                </b>
                            </small>
                        </span>
                    </div>
                    {orderBreakdown}

                    <Button onClick={this.closeChargingModal.bind(this)} className='mt-3' color='primary' block={true}>Done</Button>
                </ModalBody>
            </Modal>
        </div>
    }

    closeChargingModal() {
        this.setState({ charging: false })
    }

    createChargeRequest() {
        const order = store.get('order', [])
        const grandTotal = _.sumBy(order, i => parseFloat(i.price))
        const { address } = store.get('store')
        let receipt = _.map(store.get('order'), itemReceiptLine).join("\n")
        receipt += "\n" + itemReceiptLine({ price: grandTotal.toString(), name: 'TOTAL' })
        receipt = encodeURIComponent(receipt)
        const chargeURL = process.env.REACT_APP_BURNER_WALLET_URL + `/${address.toLowerCase()};${grandTotal};${receipt}`
        console.log(chargeURL)
        const requests = store.get('requests', [])
        requests.push({
            url: chargeURL
        })
        this.setState({ chargeURL, charging: true })
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

function itemReceiptLine(item) {
    const bytesRemaining = 32 - item.price.length - 2
    const name = item.name.slice(0, bytesRemaining)
    const pad = bytesRemaining - name.length
    try {
        const padding = _.map(new Array(pad), () => ' ').join('')
        return `${name}${padding}${item.price}`
    } catch (e) {
        debugger
    }
}