import React from 'react';
import ServicesAPI from '../ServicesAPI';

const servicesAPI = new ServicesAPI();

const urlList = ["countries", "states", "cities", "users"];

function find(id, arr) {

    return arr.find(x => +x.id === +id).name;
}

function getNormalDate(date) {
    const savedDate = new Date(date);
    return  d2(savedDate.getDate()) + "-" + d2(savedDate.getMonth() + 1) + "-" + savedDate.getFullYear();
}

function Table({data, country, states, cities}) {

    return (
    <div className='table-responsive-sm'>
        <table className="table">
            <thead>
            <tr>
                <th>№</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country, State, city</th>
                <th>Creating Date</th>
            </tr>
            </thead>
            <tbody>
            { data.map( (item, index) =>(
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                    <td>{find(item.country_id, country)} {find(item.state_id, states)}  {find(item.city_id, cities)}</td>
                    <td>{getNormalDate(item.createdAt)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    )
}

function d2( n ) {
    return (n < 10 ? "0" : "") + n;
}


class UserList extends React.Component {
    state ={
        dataAPI: [],
        isLoading: false
    }

     async componentDidUpdate(prevProps) {
        if(this.props.data.addUser && prevProps.data.addUser !== true) {
            const dataAPI = [];
            await new Promise(r => this.setState({ dataAPI, isLoading: false }, r));

            for (const url of urlList) {

                const
                    dataAPI = [ ...this.state.dataAPI, await servicesAPI.getResourse(url) ],
                    isLoading = dataAPI.length === urlList.length;

                await new Promise(r => this.setState({ dataAPI, isLoading }, r));
            }

            this.props.refreshData()
        }

    }

    async componentDidMount() {
        for (const url of urlList) {
            const
                dataAPI = [ ...this.state.dataAPI, await servicesAPI.getResourse(url) ],
                isLoading = dataAPI.length === urlList.length;

            await new Promise(r => this.setState({ dataAPI, isLoading }, r));
        }
    }

    render() {
        const {isLoading } = this.state;
        const country = this.state.dataAPI[0];
        const states = this.state.dataAPI[1];
        const cities = this.state.dataAPI[2];

        if(!isLoading) { return <div> is Loading </div> }
        else {
            return (
                <div className="col-sm-8">
                    <div className="item-list list-group">

                        <Table data={this.state.dataAPI[3]}
                               country={country}
                               states={states}
                               cities={cities}
                        />

                    </div>
                </div>
            )
        }

    }
}
export default UserList;