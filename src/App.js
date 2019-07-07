import React from 'react';
import './App.css';


import RegisterForm from './components/RegisterForm'
import UserList from './components/UserList';


class App extends React.Component {
    state ={
        addUser: false
    }

    refreshData = () => {
        this.setState({
            addUser: !this.state.addUser
        })
    }

    render() {
        console.log(this.state);
        return (
            <div className="container">
                <div className="row">
                    <RegisterForm
                        refreshData={ ()=> {this.refreshData()}}
                    />
                    <UserList
                        data={this.state}
                        refreshData={ ()=> {this.refreshData()}}
                    />
                </div>

            </div>

        )
    }
}

export default App;