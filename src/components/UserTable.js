import { useState } from "react";

const UserTable = (props) => {
  const { data, onMakeAdmin, onDeleteUser } = props;

  const [clickedUpdate, setClickedUpdate] = useState({});
  const [clickedDelete, setClickedDelete] = useState({});

  const [searchQuery, setSearchQuery] = useState("");

  const keys = Object.keys(data[0] || {});

  const toggleUpdate = (id) => {
    setClickedUpdate((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const toggleDelete = (id) => {
    setClickedDelete((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const onClickUpdate = (item) => {
    setClickedUpdate(false);
    onMakeAdmin(item);
  };

  const filteredData = data.filter((item) => {
    return keys.some((key) => {
      const value = item[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  });


  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              {keys.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}

              {!clickedUpdate[item.id] && (
                <td style={{ paddingLeft: 0, paddingRight: 0, width: "175px" }}>
                  {item.role === "customer" && <button onClick={() => toggleUpdate(item.id)}>Make Admin</button>}
                </td>
              )}

              {clickedUpdate[item.id] && (
                <td style={{ paddingLeft: "40px", paddingRight: 0, width: "175px" }}>
                  <button style={{ marginLeft: 0, marginRight: "15px" }} onClick={() => onClickUpdate(item)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg></button>

                  <button style={{ marginLeft: 0, marginRight: 0 }} onClick={() => toggleUpdate(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg></button>
                </td>
              )}


              {!clickedDelete[item.id] && (
                <td style={{ paddingLeft: 0, paddingRight: "20px", width: "175px" }}>
                  <button onClick={() => toggleDelete(item.id)}>Delete User</button>
                </td>
              )}

              {clickedDelete[item.id] && (
                <td style={{ paddingLeft: "40px", paddingRight: 0, width: "175px" }}>
                  <button style={{ marginLeft: 0, marginRight: "15px" }} onClick={() => onDeleteUser(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg></button>

                  <button style={{ marginLeft: 0, marginRight: 0 }} onClick={() => toggleDelete(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg></button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
