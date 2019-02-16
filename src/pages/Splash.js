import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Splash extends Component {
    render() {
        return <div>
            hello!

            <Link to='/store/new'>Create a store</Link>
        </div>
    }
}