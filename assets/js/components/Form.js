import React from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = props.handleSubmit;
        this.state = {
            typePassword: 'password',
            typeConfirm: 'password',
        };
        this.togglePassword = this.togglePassword.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
    }

    static validate(values) {
        const errors = {};

        if (!values.email) {
            errors.email = 'E-mail required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid E-mail address';
        }

        const spaceAndEOL = /[\s\n\r]/.test(values.password);
        const wholeRegex = new RegExp('^(?=.*[A-Z]{2,})(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        const length = /.{8,}/.test(values.password);
        const upper = /(?=.*[A-Z]{2,})/.test(values.password);
        const special = /(?=.*[!@#$%^&*])/.test(values.password);
        const numeric = /(?=.*[0-9])/.test(values.password);

        if (!values.password) {
            errors.password = 'Password required';
        } else if (spaceAndEOL) {
            errors.password = 'Password should not contain spaces or line breaks';
        } else if (!length || !upper || !special || !numeric) {
            let passwordErrors = [];
            if (!length) {
                passwordErrors.push('8 characters');
            }

            if (!upper) {
                passwordErrors.push('2 uppercase letters');
            }
            if (!special) {
                passwordErrors.push('1 special character (!, @)');
            }
            if (!numeric) {
                passwordErrors.push('1 numeric character');
            }
            errors.password = 'Password must contain at least ' + passwordErrors.join(', ');
        } else if (!wholeRegex.test(values.password)) {
            errors.password = 'Invalid password';
        }

        if (!values.confirm && !values.password) {
            errors.confirm = 'Password required';
        } else if (values.password !== values.confirm) {
            errors.confirm = 'Passwords don\'t match';
        }

        return errors;
    }

    static renderField({input, label, type, meta: {touched, error}}) {
        return (
            <div className="jd-input-container">
                <input {...input} placeholder={label} type={type}/>
                {touched && (error && <span className="jd-form-error">{error}</span>)}
            </div>
        )
    }

    togglePassword(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            typePassword: this.state.typePassword === 'input' ? 'password' : 'input'
        });
    }

    toggleConfirm(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            typeConfirm: this.state.typeConfirm === 'input' ? 'password' : 'input'
        });
    }
}