import signIn from 'sign-in-with-burner'
import store from 'store'

function connect() {
    return signIn({
        burnerUrl: process.env.REACT_APP_BURNER_URL + '/login',
        siteName: `Merchant for ${process.env.REACT_APP_BURNER_NAME}`
    })
    .then(address => {
        store.set('address', address)
        return address
    })
}

export default connect