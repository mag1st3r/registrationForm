import React from 'react';
import ServicesAPI from '../ServicesAPI';
import createUser from '../utils/createUser';
import cx from "classnames";

const urlList = ["countries", "states", "cities", "users"];

const servicesAPI = new ServicesAPI();


function Selected({data, onChange, classes, validState, value}) {
    return(
        <div className="form-group ">
            <label htmlFor={`select${classes}`}> {classes} </label>
            <select
                name={classes}
                id={`select${classes}`}
                className={validState}
                onChange={ onChange }
                value={value}
                required
            >
                 <option key={1} value=""  selected disabled >...</option>
                {data.map ( (item, id) =>
                    <option key={id + 1} value={item.id}>{item.name}</option>
                )}

            </select>
        </div>
    )
}


class RegisterPage extends React.Component {

    state = {
        id: '',
        dataAPI: [],
        name: '',
        email: '',
        country: '',
        state: '',
        city: '',
        phone: '',
        adress: '',
        about: '',
        loaded: false,
        success: false,
        validationErrors:{
            name: null,
            email: null,
            country: null,
            state: null,
            city: null,
            about: null,
            phoneNumber: null
        },
        inputsValidState: {
            name: null,
            email: null,
            country: null,
            state: null,
            city: null,
            about: null,
            phone: null
        },
    };

    async componentDidMount() {
        for (const url of urlList) {
            const
                dataAPI = [ ...this.state.dataAPI, await servicesAPI.getResourse(url) ],
                loaded = dataAPI.length === urlList.length;

            await new Promise(r => this.setState({ dataAPI, loaded }, r));
        }
    }

    isValidateField(fieldName, value){
        let { validationErrors, inputsValidState } = this.state;
        switch (fieldName) {
            case 'name':
                const nameCondition = value.match(/^[a-zа-яё]+$/i);
                inputsValidState.name = nameCondition
                    ? 'valid'
                    : 'invalid';
                validationErrors.name = nameCondition
                    ? 'LooksGood!'
                    : 'Can use only Letters!';
                break;
            case 'email':
                const emailCondition = value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
                inputsValidState.email = emailCondition
                    ? 'valid'
                    : 'invalid';
                validationErrors.email = emailCondition
                    ? 'Looks good!'
                    : 'Please, provide a correct email!';
                break;
            case 'phone':
                const phoneNumberCondition = value.match(/[0-9]|\./);
                inputsValidState.phone = phoneNumberCondition
                    ? 'valid'
                    : 'invalid';
                validationErrors.phone = phoneNumberCondition
                    ? 'Looks good!'
                    : 'Phone Number must be use only numbers!';
                break;
            case 'country':
                const countryCondition = value !== "" ? true : false
                inputsValidState.country = countryCondition
                    ? 'valid'
                    : 'invalid';
                break;
            case 'state':
                const stateCondition = value !== "" ? true : false
                inputsValidState.state = stateCondition
                    ? 'valid'
                    : 'invalid';
                break;
            case 'city':
                const cityCondition = value !== "" ? true : false
                inputsValidState.city = cityCondition
                    ? 'valid'
                    : 'invalid';
                break;
            case 'about':
                const aboutMeCondition = value.length > 500 ? false : true
                inputsValidState.about = aboutMeCondition
                    ? 'valid'
                    : 'invalid';
                validationErrors.about = aboutMeCondition
                    ? 'Looks good!'
                    : 'maximum length 500.!';
                break;

            default: break
        }
        this.setState({validationErrors, inputsValidState})
    }

    setUser = async(newUser) => {
         await servicesAPI.addNewUser(newUser).then( (body) => {
             this.resetForm();
            this.props.refreshData()
         })
    }

    resetForm() {
        this.setState({
            id: '',
            dataAPI: [...this.state.dataAPI],
            name: '',
            email: '',
            country: '',
            state: '',
            city: '',
            phone: '',
            adress: '',
            about: '',
            success: true,
            validationErrors:{
                name: null,
                email: null,
                country: null,
                state: null,
                city: null,
                about: null,
                phoneNumber: null
            },
            inputsValidState: {
                name: null,
                email: null,
                country: null,
                state: null,
                city: null,
                about: null,
                phone: null
            },
        })
    }

    onSubmit =  (e) => {
        e.preventDefault();
        const {country, state, city} = this.state;
        if (country !== "" && state !== "" && city !== "") {
            const newUser = createUser({...this.state});
            this.setUser(newUser);
        } else {
            const validateSelect = [country, state, city];
            const fieldName = ["country", "state", "city"];
            return validateSelect.map( (item, index) =>
                this.isValidateField(fieldName[index],item)
            )

        }
    }

    onInputTextChange = (e) => {
        const key = e.target.name.toLowerCase();
        let value = e.target.value;
        this.isValidateField(key, value);
        this.setState({
            [key]:value
        })
    };


    render (){
        const {dataAPI, country, state, validationErrors, inputsValidState, loaded} = this.state;
        if(!loaded) { return <div>isLoading</div>}
        else {

            const countries =  dataAPI[0];

            const states = country !== '' ? dataAPI[1].filter( (item) => {
                    return item.country_id === country})
                   : new Array(1);

            const cities = state !== '' ? dataAPI[2].filter ( (item) => {
                    return item.state_id === state })
                   : new Array(1)

            const nameInputClass = cx({[`form-control is-${inputsValidState.name}`]: true});
            const nameErrorClass = cx({[`${inputsValidState.name}-feedback`]: true});
            const emailInputClass = cx({[`form-control is-${inputsValidState.email}`]: true});
            const emailErrorClass = cx({[`${inputsValidState.email}-feedback`]: true});
            const phonelInputClass = cx({[`form-control is-${inputsValidState.phone}`]: true});
            const phoneErrorClass = cx({[`${inputsValidState.phone}-feedback`]: true});
            const aboutlInputClass = cx({[`form-control is-${inputsValidState.about}`]: true});
            const aboutErrorClass = cx({[`${inputsValidState.about}-feedback`]: true});
            const countrylInputClass = cx({[`form-control is-${inputsValidState.country}`]: true});
            const statelInputClass = cx({[`form-control is-${inputsValidState.state}`]: true});
            const citylInputClass = cx({[`form-control is-${inputsValidState.city}`]: true});

            return(
                <div className="col-sm-4">
                    <form className='register-form' onSubmit={this.onSubmit}>
                        <div className="form-group ">
                            <label htmlFor="inputName">Name</label>
                            <input type="text"
                                   name="name"
                                   id='inputName'
                                   className={nameInputClass}
                                   value={this.state.name}
                                   onChange={ (e) =>{ this.onInputTextChange(e) }}
                                   required
                            />
                            <div className={nameErrorClass}>
                                <span>{validationErrors.name}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail"> Email </label>
                            <input type="email"
                                   name="email"
                                   className={emailInputClass}
                                   id='inputEmail'
                                   title="Contact's email (format: xxx@xxx.xxx)"
                                   pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"
                                   value={this.state.email}
                                   onChange={ (e) =>{ this.onInputTextChange(e) }}
                                   required
                            />
                            <div className={emailErrorClass}>
                                <span>{validationErrors.email}</span>
                            </div>
                        </div>
                        <Selected
                            data={countries}
                            classes="Country"
                            validState={countrylInputClass}
                            value={this.state.country}
                            onChange={(e) =>{ this.onInputTextChange(e) }}
                        />
                        <Selected
                            data={states}
                            classes="State"
                            validState={statelInputClass}
                            value={this.state.state}
                            onChange={(e) =>{ this.onInputTextChange(e) }}
                        />
                        <Selected
                            data={cities}
                            classes="City"
                            value={this.state.city}
                            validState={citylInputClass}
                            onChange={(e) =>{ this.onInputTextChange(e) }}
                        />
                        <div className="form-group ">
                            <label htmlFor="inputTel"> Phone Number </label>
                            <input type="tel"
                                   pattern="^[ 0-9]+$"
                                   title="Only a Numbers"
                                   name="phone"
                                   className={phonelInputClass}
                                   id='inputTel'
                                   value={this.state.phone}
                                   onChange={ (e) =>{ this.onInputTextChange(e) }}
                                   required
                            />
                            <div className={phoneErrorClass}>
                                <span>{validationErrors.phone}</span>
                            </div>
                        </div>
                        <div className="form-group ">
                            <label htmlFor="inputAddress"> Address </label>
                            <input type="text"
                                   name="adress"
                                   className="form-control"
                                   id='inputAddress'
                                   value={this.state.adress}
                                   onChange={ (e) =>{ this.onInputTextChange(e) }}

                            />
                        </div>
                        <div className="form-group ">
                            <label htmlFor="textareaAboutme"> About Me </label>
                            <textarea
                                name="about"
                                style={{resize: "none"}}
                                id='textareaAboutme'
                                className={aboutlInputClass}
                                value={this.state.about}
                                onChange={ (e) =>{ this.onInputTextChange(e) }}

                            />
                            <div className={aboutErrorClass}>
                                <span>{validationErrors.about}</span>
                            </div>
                        </div>
                        <button className="btn btn-primary">Submit form</button>
                        {this.state.success ? <div>Форма успешно отправленная</div> : <div> </div>}
                    </form>
                </div>
            )}
    }
}

export default RegisterPage;
