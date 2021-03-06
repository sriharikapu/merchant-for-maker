import React, { Component } from 'react'
import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Input
} from 'reactstrap'
import _ from 'lodash'
import ProfileSnippet from '../components/ProfileSnippet';
import MenuItem from '../components/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ManageMenu extends Component {
    constructor() {
        super()
        this.state = {
            menuItems: null,
            showModal: false,
            success: false
        }
    }

    componentWillMount() {
        const menuJSON = localStorage.getItem('menu') || '[]'
        const menuItems = JSON.parse(menuJSON)
        this.setState({ menuItems })
    }
    render() {
        const { menuItems, success } = this.state
        
        const menuRows = _.map(menuItems, (item, i) => {
            return <MenuItem item={item} key={i} icon='trash' onClick={this.deleteMenuItem.bind(this)} />
        })

        return <div>
            <ProfileSnippet />
            <div className='p-2 d-flex justify-content-between align-items-center'>
                <h3>Your Menu</h3>
                <Button color='primary' onClick={this.openModal.bind(this)}>Add Menu Item</Button>
            </div>

            {menuRows}

            <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggle}>New Menu Item</ModalHeader>
                {!success && <Form onSubmit={this.addMenuItem.bind(this)}>
                    <ModalBody>
                            <FormGroup>
                                <label>Item Name</label>
                                <Input name='name'
                                    onChange={this.setFormField.bind(this)} />
                            </FormGroup>
                            <FormGroup>
                                <label>Price</label>
                                <Input name='price' type='number' step='0.01'
                                    onChange={this.setFormField.bind(this)} />
                            </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="plain" onClick={this.hideModal.bind(this)}>Cancel</Button>
                        <Button type='submit' color="primary" >Create Item</Button>
                    </ModalFooter>
                </Form>}

                {success && <div>
                    <ModalBody>
                        <div className='m-5 text-center'>
                            <h1><FontAwesomeIcon icon='check-circle' /></h1>
                            <span>Successfully added menu item</span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="plain" onClick={this.hideModal.bind(this)}>Close</Button>
                        <Button onClick={this.showForm.bind(this)} color="primary" >Create Another Item</Button>
                    </ModalFooter>
                </div>}
            </Modal>
        </div>
    }

    deleteMenuItem(deleteItem) {
        const result = window.confirm('Are you sure you want to delete this menu item? This action cannot be undone!')
        if (result) {
            let { menuItems } = this.state

            menuItems = _.reject(menuItems, item => {
                return item === deleteItem
            })

            this.setState({ menuItems })
            localStorage.setItem('menu', JSON.stringify(menuItems))
        }
    }

    showForm() {
        this.setState({ success: false })
    }

    setFormField(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addMenuItem(e) {
        e.preventDefault()
        const { name, price, menuItems } = this.state
        menuItems.push({
            name,
            price,
            options: [],
            extras: []
        })

        localStorage.setItem('menu', JSON.stringify(menuItems))
        this.setState({ success: true })
        return false
    }

    openModal() {
        this.setState({
            showModal: true
        })
    }

    hideModal() {
        this.setState({
            showModal: false,
            name: null,
            price: null,
            success: false
        })
    }

    deleteStore() {
        localStorage.clear()
        const { history } = this.props
        history.replace('/')
    }
}