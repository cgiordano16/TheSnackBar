import React, {Component} from 'react'
import {info} from './inventory'
import '../App.css'


export default class Catalog_List extends Component{
    constructor(props){
        super(props);
        this.getAllSnacks = this.getAllSnacks.bind(this);
        this.state = {};
    }

    componentDidMount(){
        window.addEventListener('load', this.getAllSnacks);
    }

    getAllSnacks(){
        fetch('http://localhost:9000/snacks',{
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(result => {
            this.setState({result})
            console.log(this.state)
            console.log('Success: ', result);
        })
        .catch(error => {
          console.error('Error: ', error)
        });  
    }

    getSnack(snack, index){
        console.log(snack.name)
        return(
            <div key = {index} className = 'catalog-container'>
                <h3 className = 'catalog-itemName'>
                    {snack.name} 
                </h3>
                <p className= 'catalog-itemDesc'>
                    {snack.description}
                </p>
            </div>
        )
    }

    render(){
        const {data = []} = this.state
        return(
            <>
                <h2 className = 'page-header'>Catalog</h2>
                <p className = 'page_desc'>Scroll below to see your reccomended items!</p>
                <br/>
                <div>
                    {console.log(data)}
                    {
                        data.map((snack,index) => {
                            return this.getSnack(snack, index);
                        })
                    }
                </div>
                <footer>
                    I pledge my honor that I have abided by the Stevens Honor Code.  <br></br>
                    Christopher Giordano, Dhru Patel
                </footer>
            </>
        );
    }
}

