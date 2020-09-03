import React, { Component } from 'react'
import { TextField, SelectField, MenuItem } from 'material-ui'
import axios from 'axios'

import ImgResult from './ImgResult'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            amount: 15,
            apiUrl: 'https://pixabay.com/api',
            apiKey: '18160098-1784a763444c4299333756d58',
            images: [],
            loading: true
        }
    }

    isChange = (event) => {
        const val = event.target.value;
        this.setState({
            [event.target.name]: val
        }, () => {
            if(val === '')
                this.setState({
                    images: []
                })
            else {
                axios
                    .get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amout}`)
                    .then(res => this.setState({
                        images: res.data.hits,
                        loading: false
                    }))
                    .catch(err => console.log("error:" + err))
            }
        })
    }

    isAmountChange = (e, index, value) => {
        this.setState({
            amount: value
        })
    }

    render() {

        const { searchText, amount, images, loading } = this.state;
        const { isChange, isAmountChange } = this;
 
        return (
            <div>
                <TextField 
                    floatingLabelText = "Search"
                    name = "searchText"
                    value = { searchText }
                    onChange = { isChange }
                    fullWidth = { true }
                />
                <SelectField 
                    floatingLabelText = "Amout"
                    name = "amount"
                    value = { amount }
                    onChange = { isAmountChange }
                >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br />
                { images.length > 0 && <ImgResult images={images} loading={loading}/>}
            </div>
        )
    }
}
