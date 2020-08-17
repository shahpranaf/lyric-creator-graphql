import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router';
import query from '../queries/fetchSongs';
import gql from "graphql-tag";

class LyricList extends Component {
    onLike(id, likes) {
        this.props.mutate({
            variables: {
                id
            },
            optimisticResponse: {
                __typeName: "Mutation",
                likeLyric : {
                    __typename: "LyricType",
                    id,
                    likes : likes + 1
                }
            }
        }).then(res => console.log(res));
    }

    renderLyric() {
        // const { song } = this.props.data;
        const lyrics = this.props.lyrics;
        return lyrics.map(({content, id, likes}) => (
            content ? 
            <li className="collection-item" key={id}> 
                    {content}

                    <span className="right">
                        <i onClick={() => this.onLike(id, likes)} className="material-icons">thumb_up</i>
                        {likes}
                    </span>
                </li>
                : null
        ))
    }

    render() {
        return (
            <div>
                <ul className="collection">
                    {this.renderLyric()}
                </ul>
            </div>
        )
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID){
        likeLyric(id: $id){
            id
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);