import React from 'react';
import Post from './Post';
export default class Postlist extends React.Component {
    state = {
        posts: [],
        deleteItems: [],
    };
    
    //Returnerar en array med alla posts wrappade i en ul
    deletePost= (key) => {
        localStorage.removeItem(key);
        this.setState({posts: this.getItems()});
        return localStorage;
    }

    deletePosts = () => {
        this.state.deleteItems.map((key) => {
            localStorage.removeItem(key.key);
        }) ;
        this.setState({posts: this.getItems()});
    }

    handleChange = (e, post) => {
        if (e.target.checked){
            this.state.deleteItems.push(post);
        }
        else {
            this.state.deleteItems.map(
                (item, index) => {
                    if ( item.key === post.key) { 
                        this.state.deleteItems.splice(index, 1); 
                    }
                }
            );
        }
    }

    getItems = () => {
        this.state.posts = [];
        
        for(let i=0;i<localStorage.length; i++) {
            const key = localStorage.key(i);
            const item = JSON.parse(localStorage.getItem(key));
            const now = new Date().getTime();
            const time = new Date(item.deleteDate).getTime();
            if ( time <= now ) {
                this.deletePost(key);
            }
            else {
                this.state.posts.push(<Post key={key}><input onChange={(e)=>this.handleChange(e, {key})} type="checkbox" id={this.props.key} /><label htmlFor={this.props.key}>{item.value}</label></Post>);     
            }
        }
        return this.state.posts;
    }
    render() {
        return(
        <div>
            <button onClick={() => this.deletePosts()}>Radera markerade</button>
            <div className="diary-display-posts">{this.getItems()}</div>
        </div>);
    }
}