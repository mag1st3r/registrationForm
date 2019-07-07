import PropTypes from 'prop-types';

export const createUser = ({ name, email, phone, adress, about, country, state, city}) => {
    return {
        "id": "" ,
        "name": name,
        "email": email,
        "phone_number": phone,
        "address": adress !== "" ? adress : null,
        "about_me": about !== "" ? about: null,
        "country_id": country,
        "state_id": state,
        "city_id": city,
        "createdAt": ""
    }
};
export default createUser;

createUser.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    address: PropTypes.string,
    about_me: PropTypes.string,
    country_id: PropTypes.string,
    state_id: PropTypes.string,
    city_id: PropTypes.string,
    createdAt: PropTypes.number

};
