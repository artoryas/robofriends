import React from 'react'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>  response.json())
            .then(users => this.setState({robots: users}))
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }
    render(){
        const filteredRobots = this.state.robots.filter(robots =>{
            return robots.name.toLowerCase().includes(this.state.searchField.toLowerCase()); 
        });
        return(
            <div className='tc'>
                <h1 className='tc'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                    
                </Scroll>
                
            </div>
        )
    }
}
export default App;