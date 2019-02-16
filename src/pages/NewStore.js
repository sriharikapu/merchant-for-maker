import React, { Component } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import logo from '../logo.svg'

export default class NewStore extends Component {
    render() {
        return <div className='full-height d-flex flex-column justify-content-center w-100'>
            <div style={{maxWidth: '640px', margin: '0 auto'}}>
                <img src={logo} className='mb-3' />                
                <h5>CREATE YOUR STORE</h5>
                <div className='p-3 border rounded shadow'>
                    <Form onSubmit={this.createStore.bind(this)}>
                        <FormGroup>
                            <label>Name</label>
                            <Input onChange={this.setName.bind(this)}
                                placeholder="Buffi's Cafe" />
                        </FormGroup>
                        <FormGroup>
                            <label>Store Picture</label>
                            <Input type='file'
                                onChange={this.setImage.bind(this)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Button type='submit' color='primary' block={true}>Submit</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    }

    setName(e) {
        this.setState({ name: e.target.value })
    }

    setImage(e) {
        this.setState({ image: e.target.files[0] })
    }

    createStore(e) {
        e.preventDefault()

        const fr = new FileReader();
        const { name } = this.state

        fr.onload = () => {
            this.setStore({
                name,
                image: fr.result,
                address: '0xb3C44Ca4e31820974015af3Ba0b29ca32E7b0d93'
            })
            this.props.history.replace('/menu/manage')
        };

        fr.readAsDataURL(this.state.image)
        return false
    }

    setStore(store) {
        localStorage.setItem('store', JSON.stringify(store))
    }
}