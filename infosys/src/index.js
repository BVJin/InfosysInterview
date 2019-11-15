import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    };

    handleStateChange = (fieldName, e) => {
        let obj = {};
        obj[fieldName] = e.target.value;
        this.setState(obj);
    };

    handleSubmit = () => {

        const instance = axios.create({
            baseURL: "localhost:8000",
            timeout: 60000
        });

        instance.request({
            url: '/api/addUser', method: "post", data: {
                username: this.state.username,
                password: this.state.password
            }, req_headers: {'Content-Type': 'application/json'}
        }).then((succ)=>{
            console.log('User saved');
        }, (err)=> {
            console.log('User save failed', err);
        });

    };

    render(){
        return (
            <div>
                <p>Username</p>
                <input onChange={(e) => this.handleStateChange('username', e)}></input>
                <p>Password</p>
                <input onChange={(e) => this.handleStateChange('password', e)}></input>
                <br/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
};


ReactDOM.render(<App />, document.getElementById('root'));