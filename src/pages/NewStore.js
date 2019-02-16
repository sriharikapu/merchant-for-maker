import React, { Component } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'

export default class NewStore extends Component {
    render() {
        return <div className='w-100 mt-3'>
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
                image: fr.result
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