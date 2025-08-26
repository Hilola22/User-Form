import React, { useState, useEffect } from "react";
import "./User.css";

const User = () => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    age: "",
    job: "",
  });

  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [active, setActive] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { id: Date.now(), ...form };
    setList([...list, newUser]);
    setForm({ fname: "", lname: "", email: "", age: "", job: "" });
  };

  const handleDelete = (id) => {
    const updated = list.filter((user) => user.id !== id);
    setList(updated);
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(list));
  }, [list]);

  return (
    <div className="wrap">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={form.fname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={form.lname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="job"
            placeholder="Job"
            value={form.job}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="list-box">
        {list.length > 0 ? (
          list.map((user) => (
            <div key={user.id} className="card">
              <div className="avatar">{user.fname.charAt(0).toUpperCase()}</div>
              <div className="info">
                <h4>
                  {user.fname} {user.lname}
                </h4>
                <p>{user.job}</p>
              </div>
              <div className="btns">
                <button onClick={() => setActive(user)}>More</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No users information here</p>
        )}
      </div>
      {active && (
        <div className="popup" onClick={() => setActive(null)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setActive(null)}>
              &times;
            </button>
            <h3>User Info</h3>
            <p>
              <b>First Name:</b> {active.fname}
            </p>
            <p>
              <b>Last Name:</b> {active.lname}
            </p>
            <p>
              <b>Email:</b> {active.email}
            </p>
            <p>
              <b>Age:</b> {active.age}
            </p>
            <p>
              <b>Job:</b> {active.job}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default User;