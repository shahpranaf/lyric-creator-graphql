import React, { Component } from 'react'
import gql from "graphql-tag";
import {  graphql } from 'react-apollo'


class LyricCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { content: "" }
    }

    
    onLyricChange(event) {
        this.setState({content: event.target.value});
    }

    onLyricSubmit() {
        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content: this.state.content
            },
        }). then( res => this.setState({content: ""}))
    }

    render() {
        return (
            <form onSubmit={() => this.onLyricSubmit()}>
                <label>Add a Lyric</label>
                <input value={this.state.content} onChange={($event) => this.onLyricChange($event)}/>
            </form>
        )
    }
}

const mutation = gql`
    mutation AddLyric($content: String, $songId: ID!) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);