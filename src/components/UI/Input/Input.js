import React from "react";
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';

class Input extends React.Component {
    state = {
        focused: false
    };

    renderMonthElement = ({month, onMonthSelect, onYearSelect}) => {
        const currentYear = moment().year();
        const startYear = currentYear - 100;
        const endYear = currentYear + 100;
        const years = [];
        for (let i = startYear; i <= endYear; i++) {
            years.push(i);
        }

        const yearOptions = years.map(year => {
            return <option key={year} value={year}>{year}</option>;
        });

        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div>
                    <select
                        value={month.month()}
                        onChange={(e) => onMonthSelect(month, e.target.value)}
                    >
                        {moment.months().map((label, value) => (
                            <option key={label} value={value}>{label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                        {yearOptions}
                    </select>
                </div>
            </div>
        );
    };

    render() {
        let input = null;
        let errorClass = '';
        let errorDiv = '';
        if (this.props.touched && this.props.errors && this.props.errors.length) {
            errorClass = 'is-invalid';
            errorDiv =
                <div className='invalid-feedback'>
                    {
                        this.props.errors.map(error => (
                            <div key={error}>
                                {this.props.errorMessages[error]}
                            </div>
                        ))
                    }
                </div>;
        }

        if (this.props.show) {
            switch (this.props.elemType) {
                case 'text':
                case 'number':
                case 'password':
                    input =
                        <>
                            <label className='form-label' key={'fl' + this.props.itemKey}>
                                {this.props.label}
                            </label>
                            <input className={'form-control ' + errorClass}
                                   type={this.props.elemType}
                                   key={this.props.itemKey}
                                   name={this.props.itemKey}
                                   value={this.props.value}
                                   placeholder={this.props.label}
                                   onChange={this.props.changed}
                            />
                        </>;
                    break;
                case 'date':
                    input =
                        <>
                            <label className='form-label' key={'fl' + this.props.itemKey}>
                                {this.props.label}
                            </label>
                            <SingleDatePicker
                                date={this.props.value}
                                onDateChange={this.props.changed}
                                focused={this.state.focused}
                                onFocusChange={({focused}) => this.setState({focused})}
                                id={this.props.itemKey}
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                                renderMonthElement={this.renderMonthElement}
                            />
                        </>;
                    break;
                case 'radio':
                    const radios = this.props.options.map(r => {
                        const checked = r.value === this.props.value;
                        return (
                            <React.Fragment key={'rr-' + r.key}>
                                <input className={'form-control ' + errorClass}
                                       type={this.props.elemType}
                                       key={r.key}
                                       name={r.name}
                                       checked={checked}
                                       value={r.value}
                                       onChange={this.props.changed}
                                />
                                <label key={'ll-' + this.props.itemKey}>{r.label}</label>
                            </React.Fragment>
                        );
                    });
                    input = <>{radios}</>;
                    break;
                case 'select':
                    const options = this.props.options.map(s => {
                        return (
                            <React.Fragment key={'oo-' + s.value}>
                                <option key={s.value}
                                        value={s.value}
                                >{s.label}</option>
                            </React.Fragment>
                        );
                    });
                    input =
                        <>
                            <label className='form-label' key={'fl' + this.props.itemKey}>
                                {this.props.label}
                            </label>
                            <select className={'form-control ' + errorClass}
                                    onChange={this.props.changed}
                            >
                                {options}
                            </select>
                        </>;
                    break;
                case 'checkbox':
                    const checkboxes = this.props.options.map(c => {
                        let checked = this.props.value && this.props.value.length && this.props.value.indexOf(c.value) > -1;
                        console.log(checked, 'checkboxChecked?');

                        return (
                            <React.Fragment key={'cc-' + c.key}>
                                <input key={c.key}
                                       type={this.props.elemType}
                                       checked={checked}
                                       value={c.value}
                                       onChange={this.props.changed}
                                />
                            </React.Fragment>
                        );
                    });

                    input = <>{checkboxes}</>;
                    break;
                default:
                    input = null;
                    break;
            }
        }

        return (
            <div className='form-group' key={this.props.itemKey}>
                {input}
                {errorDiv}
            </div>
        );
    }
}

export default Input;
