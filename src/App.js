import React, { useState } from "react";
import classNames from "classnames";
import { Button, Grid, Paper, Box } from "@material-ui/core";
import "./App.scss";

import users from "./users";

function App() {
  const [free, setFree] = useState(users);
  const [selectedFree, setSelectedFree] = useState([]);
  const [allotted, setAllotted] = useState([]);
  const [selectedAllotted, setSelectedAllotted] = useState([]);

  function assign() {
    setAllotted([
      ...allotted,
      ...free.filter((user) => selectedFree.includes(user.id)),
    ]);
    setFree(free.filter((user) => !selectedFree.includes(user.id)));
    setSelectedFree([]);
  }

  function revoke() {
    setFree([
      ...free,
      ...allotted.filter((user) => selectedAllotted.includes(user.id)),
    ]);
    setAllotted(allotted.filter((user) => !selectedAllotted.includes(user.id)));
    setSelectedAllotted([]);
  }

  function toggleFreeUser(id) {
    if (selectedFree.includes(id)) {
      setSelectedFree(selectedFree.filter((i) => i !== id));
    } else {
      setSelectedFree([...selectedFree, id]);
    }
  }

  function toggleAllottedUser(id) {
    if (selectedAllotted.includes(id)) {
      setSelectedAllotted(selectedAllotted.filter((i) => i !== id));
    } else {
      setSelectedAllotted([...selectedAllotted, id]);
    }
  }

  function User({ user: { id, avatar, first_name, last_name }, onClick }) {
    return (
      <div
        className={classNames({
          user: true,
          selected: selectedFree.includes(id) || selectedAllotted.includes(id),
        })}
        key={id}
        onClick={onClick}
      >
        <img src={avatar} />
        <span className="name">{`${first_name} ${last_name}`}</span>
      </div>
    );
  }

  function Left({ users }) {
    return (
      <Paper className="users" elevation={3}>
        {users.map((user) => (
          <User
            user={user}
            onClick={() => {
              toggleFreeUser(user.id);
            }}
            key={user.id}
          />
        ))}
      </Paper>
    );
  }

  function Right({ users }) {
    return (
      <Paper className="users" elevation={3}>
        {users.map((user) => (
          <User
            user={user}
            onClick={() => toggleAllottedUser(user.id)}
            key={user.id}
          />
        ))}
      </Paper>
    );
  }

  return (
    <Paper elevation={3}>
     <Grid container direction="row" item sm md={12} alignItems="center" justify="center">
     {"Resource allocation application"}
          </Grid>
      <Box p={6}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid container item sm md={5} >
            <Left users={free} />
          </Grid>
          <Grid container item sm md={2} direction="column" justify="space-between" alignItems="center">
            <Box my="1rem">
              <Button
                disabled={selectedFree.length === 0}
                color="primary"
                variant="contained"
                onClick={assign}
              >
                {"Assign >>"}
              </Button>
            </Box>
            <Box mb="1rem">
              <Button
                disabled={selectedAllotted.length === 0}
                color="primary"
                variant="contained"
                onClick={revoke}
              >
                {"<< Revoke"}
              </Button>
            </Box>
          </Grid>
          <Grid container item sm md={5}>
            <Right users={allotted} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default App;
