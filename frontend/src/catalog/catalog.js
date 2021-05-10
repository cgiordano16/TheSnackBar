import React, {Component} from 'react'
import {info} from './inventory'
import '../App.css'
import ReactDOM from 'react-dom';


export default class Catalog_List extends Component{
    constructor(props){
        super(props);
        // this.getAllSnacks = this.getAllSnacks.bind(this);
        this.state = {
            json:{},
            loading: true
        };
    }

    componentWillMount(){
        fetch('http://localhost:9000/snacks',{
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(result => {
            console.log(this);
            this.setState({json: result});
            this.setState({loading: false});
        })
        .catch(error => {
          console.error('Error: ', error)
        });  
    }

    getAllSnacks(){
        fetch('http://localhost:9000/snacks',{
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(result => {
            this.setState({json: result});
            this.setState({loading: false});
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
        if (this.state.loading === true) {
            return <h2>Loading...</h2>
        }
        console.log(this.state);
        return(
            <>
                <h2 className = 'page-header'>Catalog</h2>
                <p className = 'page_desc'>Scroll below to see your reccomended items!</p>
                <br/>
                <div className='reload'>
                    {this.state.json.map(json => (
                        <li>
                            <div className = 'catalog-container'>
                                <h3 className = 'catalog-itemName'>
                                    {json.name} 
                                </h3>
                                <p className= 'catalog-itemDesc'>
                                    {json.description}
                                </p>
                            </div>
                        </li>
                    ))}
                    {/* {console.log(data)}
                    {
                        data.map((snack,index) => {
                            this.getSnack(snack, index);
                        })
                    } */}
                </div>
                <footer>
                    I pledge my honor that I have abided by the Stevens Honor Code.  <br></br>
                    Christopher Giordano, Dhru Patel
                </footer>
            </>
        );
    }
}

// ReactDOM.render(
//     <Catalog_List />,
//     document.getElementsByClassName('reload')[0]
// )