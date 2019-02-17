import React, { Component } from 'react'
import { Button, ListGroup, ListGroupItem, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap'
import ProfileSnippet from '../components/ProfileSnippet';
import _ from 'lodash'
import MenuItem from '../components/MenuItem';
import store from 'store'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QRCode from 'qrcode.react'
import web3 from '../lib/web3';
import decoder from 'abi-decoder'
import abi from 'ethereumjs-abi'
import * as utils from 'web3-utils'

decoder.addABI([
    {"inputs": [{"type": "address", "name": ""}, { type: 'uint256', name: ''}, { type: 'string', name: ''}], "constant": false, "name": "transfer", "payable": false, "outputs": [{"type": "bool", "name": ""}], "type": "function"}])

console.log(decoder.decodeMethod('0x2535f762000000000000000000000000e3d2c458dcf6a3614d50e358f675f6474f73a721000000000000000000000000000000000000000000000000002386f26fc100000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000003d4368656170696520202020202020202020202020202020202020302e30310a544f54414c202020202020202020202020202020202020202020302e3031000000'))

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            charging: false,
            modal: false,
            order: store.get('order', []),
            payment: null,
            paidOrder: null,
            request: null
        }
    }

    componentWillMount() {
        console.log('initialize filter for transactions to ', store.get('address'))
        let blockNumber

        web3.eth.getTransactionCount(store.get('address'), console.log)
        web3.eth.getBlockNumber((err, num) => {
            this.setState({ blockNumber })
            blockNumber = num

            this.poll = setInterval(() => {
                web3.eth.getBlock(blockNumber + 1, (err, data) => {
                    if (err)
                        console.error(err)

                    if (data) {
                        blockNumber += 1
                    }

                    if (err || data == null || data.transactions.length === 0) {
                        return
                    }

                    const { request } = this.state
                    if (this.state.charging)
                        _.each(data.transactions, tx => {
                            web3.eth.getTransaction(tx, (err, transaction) => {
                                if (err)
                                    console.error(err)

                                const receiptHex = utils.utf8ToHex(this.state.request.receipt)
                                const value = web3.toWei(request.grandTotal)
                                const encoded = '0x' + abi.simpleEncode('transferWithData(address,uint256,bytes):(bool)', store.get('address'), value, Buffer.from(receiptHex.slice(2), 'hex')).toString('hex')
                                if (transaction.input === encoded && transaction.to.toLowerCase() === ('0x3E50BF6703Fc132A94E4BAfF068db2055655f11B').toLowerCase()) {
                                    const requests = store.get('requests')
                                    const i = _.findIndex(requests, r => utils.utf8ToHex(r.receipt) === receiptHex)
                                    requests[i].payment = transaction
                                    store.set('requests', requests)
                                    store.set('order', [])
                                    this.setState({ order: [], paidOrder: this.state.order, payment: transaction })
                                }
                            })
                        })
                })
            }, 3000)
        })
        // this.filter = web3.eth.filter({ fromBlock: 'latest' }).watch((err, tx) => {
        //     if (err) console.error(err)
        //     if (tx)
        //         web3.eth.getTransaction(tx, (err, data) => {
        //             console.log(data)
        //         })
        // })
    }

    componentWillUnmount() {
        clearInterval(this.poll)
    }

    render() {
        const menuItems = _.sortBy(store.get('menu', []), 'name')

        const menuRows = _.map(menuItems, (item, i) => {
            return <MenuItem icon='plus-square' item={item} key={i} onClick={this.addItem.bind(this)} />
        })

        const { order, payment, charging, request, paidOrder } = this.state
        const ordersLength = order.length

        const activeOrder = paidOrder || order

        const orderRows = _.map(activeOrder, (item, i) => {
            const onClick = !charging && this.removeItem.bind(this, i)
            return <MenuItem item={item} icon='trash' key={i} onClick={onClick} />
        })

        const leftButton = <Button onClick={this.openModal.bind(this)} style={{fontSize: '1em'}} className='text-light' color='plain'>
            <FontAwesomeIcon icon='cash-register' />
                {ordersLength > 0 && <sub style={{marginLeft: '-0.5em'}}><Badge color='danger'>{ordersLength}</Badge></sub>}
            </Button>

        // TODO use a proper math library
        const grandTotal = calculateTotal(activeOrder)
        console.log(activeOrder, grandTotal)
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
                    {activeOrder.length > 0 && <div>
                        {orderBreakdown}

                        <Button onClick={this.createChargeRequest.bind(this)} block color='primary' className='mt-2'>
                            <small><b>REQUEST ${grandTotal}</b></small>
                        </Button>
                    </div>}

                    {activeOrder.length === 0 && <div className='text-center'>
                        <h3>Order Is Empty</h3>
                        <h1>
                            <FontAwesomeIcon icon='exclamation-circle' />
                        </h1>
                        <span>Add some items to this order to get started.</span>
                    </div>}
                </ModalBody>
            </Modal>

            <Modal centered={true} isOpen={this.state.charging}>
                <ModalHeader>
                    Order Summary
                </ModalHeader>

                <ModalBody>
                    {<div className='d-flex text-center align-items-center flex-column'>
                        {payment === null && <div className='d-flex text-center align-items-center flex-column'>
                            <span><small><b>{store.get('store').name} requests ${grandTotal}</b></small></span>
                            <QRCode size={128} level='L' value={this.state.chargeURL} />
                            <span>
                                <small>
                                    <b>
                                        Scan this code to complete your purchase.
                                    </b>
                                </small>
                            </span>
                        </div>}

                        {payment !== null && <div>
                            <h3>Success!</h3>
                            <h1 className='text-success'>
                                <FontAwesomeIcon icon='check-circle' />
                            </h1>
                            <span>
                                <small>
                                    <b>
                                        Completed payment of ${request.grandTotal}.
                                    </b>
                                    <br />
                                    <a href={`https://blockscout.com/poa/dai/tx/${payment.hash}`} target='_blank'>View on BlockScout</a>
                                </small>
                            </span>
                        </div>}
                    </div>}

                    {orderBreakdown}

                    <Button onClick={this.closeChargingModal.bind(this)} className='mt-3' color='primary' block={true}>Done</Button>
                </ModalBody>
            </Modal>
        </div>
    }

    closeChargingModal() {
        store.set('order', [])
        this.setState({ order: [], payment: null, charging: false, paidOrder: null })
    }

    createChargeRequest() {
        this.closeModal()
        const order = store.get('order', [])
        const requests = store.get('requests', [])
        const id = (10000 + requests.length).toString()
        const grandTotal = calculateTotal(order)
        const address = store.get('address')
        let receipt = _.map(store.get('order'), itemReceiptLine).join("\n")
        receipt += "\n" + itemReceiptLine({ price: grandTotal.toString(), name: 'TOTAL' })
        receipt += `\n#${id}`
        const receiptURL = encodeURIComponent(receipt)
        const chargeURL = process.env.REACT_APP_BURNER_URL + `/${address.toLowerCase()};${grandTotal};${receiptURL}`

        const request = {
            id,
            url: chargeURL,
            receipt,
            grandTotal
        }
        requests.push(request)
        store.set('requests', requests)
        this.setState({ chargeURL, request, charging: true })
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

function calculateTotal(order) {
    let bn = web3.toBigNumber(0)
    _.each(order, o => {
        bn = bn.add(parseFloat(o.price))
    })
    return bn.toFixed(2)
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