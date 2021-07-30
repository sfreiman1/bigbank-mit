import React, { useState } from "react";



// Context for storing user database
const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(-1);

  return (
    <UserContext.Provider
      value={{
        users: [
          {
            name: "scott",
            email: "scott@qwire.com",
            password: "123456",
            balance: 100,
          },
          {
            name: "fred",
            email: "fred@qwire.com",
            password: "123456",
            balance: 100,
          },
        ],
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
