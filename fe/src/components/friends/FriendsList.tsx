import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_USERS, ADD_FRIEND, REMOVE_FIREND, MY_FREINDS } from './friends.query';

interface UserInterface {
    id: string,
    name: string,
    friends: {id: string, name: string}[]
}

function notInFriends(user: UserInterface, friends: any): boolean {
    if (!friends && ! friends?.myConnections) {
        return true
    }
    return !friends.myConnections.find(({id}: {id: string}) => id === user.id)
}

function FriendsList() {
    const { data: all } = useQuery<{ users: UserInterface[] }>(ALL_USERS)
    const { data: friends, client } = useQuery<{ myConnections: UserInterface[] }>(MY_FREINDS);
    const [ addFreind ] = useMutation(ADD_FRIEND, {
        onCompleted: client.resetStore,
        onError: () => {},
    });
    const [ removeFriend ] = useMutation(REMOVE_FIREND, {
        onCompleted: client.resetStore,
        onError: () => {},
    });

    return (
        <section className="section">
            <h1 className="title has-text-centered">Connections</h1>
            <div className="columns is-centered">
                <div className="column has-text-centered is-one-quarter">
                    <h1 className="has-text-weight-bold subtitle has-text-centered">Other users</h1>
                    {
                        all?.users?.filter(u => notInFriends(u, friends)).map((user: any) => 
                            <div className="box" key={user.id}>
                                <article className="media">
                                    <div className="media-content">
                                        <nav className="level">
                                            <div className="level-left">
                                                <div className="level-item">{user.name}</div>
                                            </div>
                                            <div className="level-right">
                                                <div className="level-item">
                                                    <button onClick={() => addFreind({ variables: { userId: user.id } })} className="button is-success">
                                                    <span>Add</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </article>
                            </div>
                        )
                    }
                </div>
                <div className="column has-text-centered is-one-quarter">
                    <h1 className="has-text-weight-bold subtitle has-text-centered">Your connections</h1>
                    {
                        friends?.myConnections?.map((user: any) => 
                            <div className="box" key={user.id}>
                                <article className="media">
                                    <div className="media-content">
                                        <nav className="level">
                                            <div className="level-left">
                                                <div className="level-item">{user.name}</div>
                                            </div>
                                            <div className="level-right">
                                                <div className="level-item">
                                                    <button onClick={() => removeFriend({ variables: { userId: user.id } })} className="button is-danger">
                                                    <span>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </article>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default FriendsList;