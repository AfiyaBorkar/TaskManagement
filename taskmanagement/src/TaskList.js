// components/TaskList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import { Box, Button, Icon, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Toaster from "./Toaster";

import CancelIcon from "@mui/icons-material/Cancel";
import "./mystyle.css";

import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [newdueDate, setdueDate] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState("");
  const [editedTodoDescription, setEditedTodoDescription] = useState("");
  const [editedDueDate, setEditedDueDate] = useState(null);
  const [showedit, setshowedit] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userInfor"));
  const authToken = JSON.parse(localStorage.getItem("AuthToken"));
  const [taskStatus, setTaskStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const Logout = () => {
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("userInfor");
    // navigate("/");

    window.location.href = "/";
  };
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        // `${process.env.REACT_APP_BACKEND}`+`tasks/${userDetails}`,
        process.env.REACT_APP_BACKEND_URL + `tasks/${userDetails}`,

        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      // Handle error (redirect to login page or display error message)
    }
  };
  // Function to update a task
  const updateTask = async () => {
    try {
      await axios.put(
        // `http://localhost:5000/api/tasks/${userDetails}/${editingTodoId}`,
        process.env.REACT_APP_BACKEND_URL +
          `tasks/${userDetails}/${editingTodoId}`,

        {
          title: editedTodoTitle,
          description: editedTodoDescription,
          dueDate: editedDueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // After updating, fetch the tasks again to update the state
      fetchTasks();
      setTaskStatus({ msg: "Updated", key: Math.random(), variant: "success" });
      setshowedit(false);
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        // `http://localhost:5000/api/tasks/${userDetails}/${taskId}`,
        process.env.REACT_APP_BACKEND_URL + `tasks/${userDetails}/${taskId}`,

        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // After deleting, fetch the tasks again to update the state
      fetchTasks();
      setTaskStatus({ msg: "Deleted", key: Math.random(), variant: "error" });
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const addTask = async () => {
    try {
      await axios.post(
        // `http://localhost:5000/api/tasks/${userDetails}`,
        process.env.REACT_APP_BACKEND_URL + `tasks/${userDetails}`,

        {
          title: newTodoTitle,
          description: newTodoDescription,
          dueDate: newdueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // After adding, fetch the tasks again to update the state
      fetchTasks();
      setTaskStatus({ msg: "Added", key: Math.random(), variant: "success" });
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  async function editTodo(todoId) {
    setshowedit(true);
    setEditingTodoId(todoId);
    const todoToEdit = tasks.find((todo) => todo._id === todoId);
    setEditedTodoTitle(todoToEdit.title);
    setEditedTodoDescription(todoToEdit.description);
    setEditedDueDate(todoToEdit.dueDate);
  }

  const completedTask = async (todoId) => {
    try {
      await axios.post(
        // `http://localhost:5000/api/tasks/completed/${userDetails}/${todoId}`,
        process.env.REACT_APP_BACKEND_URL +
          `tasks/completed/${userDetails}/${todoId}`,

        { completed: !tasks.find((task) => task._id === todoId).completed },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // After updating, fetch the tasks again to update the state
      fetchTasks();
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div
        className="cont"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // height: "100vh",
        }}
      >
        <Box
          className="main-cont"
          style={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
            // height: "100vh",
          }}
        >
          <div
            className="todo"
            style={{
              // border: "1px solid ",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "10px",
              borderRadius: "15px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <div
              className="divheader"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
              }}
            >
              <div className="nametitle">
                <h3>Welcome back</h3>
              </div>
              <div className="logoutbtn">
                <IconButton onClick={() => Logout()}>
                  <LogoutIcon />
                </IconButton>
              </div>
            </div>
            <div
              className="todoconatiner"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginLeft: "15px",
              }}
            >
              <div className="inputcont">
                {/* <label>Title</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="enter the title of todo"
            /> */}
                <TextField
                  id="outlined-required"
                  label="Title"
                  variant="outlined"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  name="title"
                />
              </div>

              <div className="inputcont">
                {/* <label>Description</label>
            <input
              type="text"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              placeholder="enter the description of todo"
            /> */}

                <TextField
                  id="outlined-required"
                  label="Description"
                  variant="outlined"
                  value={newTodoDescription}
                  onChange={(e) => setNewTodoDescription(e.target.value)}
                  name="description"
                />
              </div>

              <div className="inputcont">
                {/* <label>Description</label>
            <input
              type="text"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              placeholder="enter the description of todo"
            /> */}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="DueDate"
                      value={newdueDate}
                      //   onChange={(e) => setdueDate(e.target.value)}
                      onChange={(newValue) => setdueDate(newValue)}
                      name="duedate"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <Button
                variant="outlined"
                onClick={() => {
                  // addTodo();
                  addTask();
                  setNewTodoTitle("");
                  setNewTodoDescription("");
                  setdueDate("");
                }}
                style={{ width: "fit-content" }}
              >
                Add
              </Button>
            </div>
            <div
              className="displayTodo"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "15px",
              }}
            >
              <h2>Todos</h2>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tasks.map((task) => (
                        <TableRow key={task._id}>
                          <TableCell>
                            <div
                              style={{
                                textDecoration: task.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {showedit && editingTodoId === task._id ? (
                                //   <input
                                //     type="text"
                                //     value={editedTodoTitle}
                                //     onChange={(e) =>
                                //       setEditedTodoTitle(e.target.value)
                                //     }
                                //   />

                                <TextField
                                  id="outlined-required"
                                  label="Title"
                                  variant="outlined"
                                  value={editedTodoTitle}
                                  onChange={(e) =>
                                    setEditedTodoTitle(e.target.value)
                                  }
                                  name="description"
                                />
                              ) : (
                                task.title
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                textDecoration: task.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {showedit && editingTodoId === task._id ? (
                                //   <input
                                //     type="text"
                                //     value={editedTodoDescription}
                                //     onChange={(e) =>
                                //       setEditedTodoDescription(e.target.value)
                                //     }
                                //   />
                                <TextField
                                  id="outlined-required"
                                  label="Description"
                                  variant="outlined"
                                  value={editedTodoDescription}
                                  onChange={(e) =>
                                    setEditedTodoDescription(e.target.value)
                                  }
                                  name="description"
                                />
                              ) : (
                                task.description
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                textDecoration: task.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {showedit && editingTodoId === task._id ? (
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <DesktopDatePicker
                                    label="Due Date"
                                    value={
                                      editedDueDate
                                        ? new Date(editedDueDate)
                                        : null
                                    }
                                    onChange={(newValue) =>
                                      setEditedDueDate(newValue)
                                    }
                                    name="duedate"
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                              ) : (
                                task.dueDate
                              )}
                            </div>
                          </TableCell>

                          <TableCell>
                            {showedit && editingTodoId === task._id ? (
                              <div className="iconss">
                                <IconButton>
                                  <SaveIcon
                                    sx={{ fontSize: 20 }}
                                    onClick={() => {
                                      updateTask();
                                    }}
                                  />
                                </IconButton>
                                <IconButton>
                                  <CancelIcon
                                    sx={{ fontSize: 20 }}
                                    onClick={() => setEditingTodoId(null)}
                                  />
                                </IconButton>
                              </div>
                            ) : (
                              <div className="iconss">
                                <IconButton>
                                  <EditIcon
                                    sx={{ fontSize: 20 }}
                                    onClick={() => editTodo(task._id)}
                                  />
                                </IconButton>
                                <IconButton>
                                  <DeleteIcon
                                    sx={{ fontSize: 20 }}
                                    onClick={() => deleteTask(task._id)}
                                  />
                                </IconButton>

                                <Checkbox
                                  checked={task.completed}
                                  onChange={() => completedTask(task._id)}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={tasks.length} // Assuming tasks contain total count of items
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        </Box>
        {taskStatus ? (
          <Toaster
            key={taskStatus.key}
            message={taskStatus.msg}
            variant={taskStatus.variant}
          />
        ) : null}
      </div>
    </>
  );
};

export default TaskList;
