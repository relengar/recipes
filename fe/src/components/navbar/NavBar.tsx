import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import AuthModule from "./authModule/AuthModule";
import { AuthType } from "./navbar.model";
import { CURRENT_USER, LOGOUT } from "./authModule/auth_module_query";
import { MY_FREINDS } from "../friends/friends.query";

function NavBar() {
  const { data, loading, client } = useQuery(CURRENT_USER, {
    onError: (err) => console.log(err),
    errorPolicy: "ignore",
  });
  const [loadUser, { data: lazyData }] = useLazyQuery(CURRENT_USER);
  const history = useHistory();
  const [logOut] = useMutation(LOGOUT, {
    onCompleted: () => {
      client.resetStore().catch(() => null);
      history.push("/");
    },
  });

  const user = data?.currentUser ?? lazyData?.currentUser;
  const { data: friends } = useQuery(MY_FREINDS, {
    errorPolicy: "ignore",
    onError: (err) => console.log(err),
  });

  return (
    <nav className="navbar has-background-light">
      <div className="navbar-menu">
        <div className="navbar-start">
          <NavLink className="navbar-item" to="/">
            Home
          </NavLink>
          <NavLink className="navbar-item" to="/search">
            Search
          </NavLink>
          {user && (
            <>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Shopping Lists</a>
                <div className="navbar-dropdown">
                  <NavLink
                    to={`/shopping-lists/${user.id}`}
                    className="navbar-item"
                  >
                    {user.name}&nbsp;<i>(yours)</i>
                  </NavLink>
                  {friends?.myConnections?.map((friend: any) => (
                    <NavLink
                      key={friend.id}
                      to={`/shopping-lists/${friend.id}`}
                      className="navbar-item"
                    >
                      {friend.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <NavLink className="navbar-item" to="/connections">
                Connections
              </NavLink>
            </>
          )}
          <NavLink className="navbar-item" to="/random">
            Random Recipe
          </NavLink>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">{loading && "...loading"}</div>
          {user && (
            <>
              <div className="navbar-item">{user.name}</div>
              <div className="navbar-item">
                <button className="button" onClick={() => logOut()}>
                  Log Out
                </button>
              </div>
            </>
          )}
          {!loading && !user && (
            <>
              <div className="navbar-item">
                <AuthModule authType={AuthType.LOGIN} loadUser={loadUser} />
              </div>
              <div className="navbar-item">
                <AuthModule authType={AuthType.SIGNUP} loadUser={loadUser} />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
