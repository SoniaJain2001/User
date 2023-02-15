import { useState } from "react";
import "./app.css";
import FormInput from "./form/FormInput";
import axios from "axios"

const App = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    mobile: ""
    // password: "",
    // confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      errorMessage:"Age should be more than 18+",
      label: "Birthday",
    },
    {
      id: 4,
      name: "mobile",
      type: "Number",
      placeholder: "Mobile",
      label:"Mobile",
      // pattern:
      
      required: true,
    },
    
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = () => {
    const{username,email,birthday,mobile}= values
    if(username && email && birthday && mobile){
     axios.post("http://localhost:9002/submit",values)
     .then(res =>console.log(res))
  }else{
    alert("invalid input")
  }}

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>User Form</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button onClick={submit}>Submit</button> 
        {/* <div className="button" onClick={submit}>Submit</div> */}
      </form>
    </div>
  );
};

export default App;