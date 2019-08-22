import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const OnboardForm = ({errors, touched, values, status}) => {
   const [users, setUsers] = useState([]);
   console.log('this is touched', touched);
   useEffect(() => {
       if (status) {
           setUsers([...users, status]);
       }
   }, [status]);


    return (
        <div className="onboard-form">
            <h1>User-Onboard Form</h1>
            <Form>
              <Field type="text" name="name" placeholder="Name" />
              {touched.name && errors.name && (
                  <p className="error">{errors.name}</p>
              )}

              <Field type="text" name="email" placeholder="Email" />
              {touched.email && errors.email && <p className="error">{errors.email}</p>}
            
              <Field type="password" name="password" placeholder="Password" />
              {touched.password && errors.password && <p className="error">{errors.password}</p>}

              <Field component="select" className="role-select" name="role">
          <option>Please Choose an Option</option>
          <option value="tank">Tank</option>
          <option value="healer">Healer</option>
          <option value="dps">DPS</option>
        </Field>
            
              <label className="checkbox-container">
                  Terms of Service
                  <Field
                    type="checkbox"
                    name="termsOfService"
                    checked={values.termsOfService}
                    />
                    <span className="checkmark" />
              </label>
              <button type= "submit"> Submit </button>
              

            </Form>
            {users.map(user => (
               <ul key={user.id}>
                   <li>Name: {user.name}</li>
                   <li>Email: {user.email}</li>
                   <li>Password:{user.password}</li>
                   <li>Role: {user.role}</li>
                   </ul>
                 
            ))}
        </div>
       
    )
}

const FormikOnboardForm = withFormik ({
    mapPropsToValues ({ name, email, password, role, termsOfService}) {
        return {
            termsOfService: termsOfService || false,
            name: name ||"",
            email: email || "",
            password: password || "",
            role: role || "",
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("for real?").min(3).max(50),
        email: Yup.string().required("you sure?").min(3).max(25).email(),
        password: Yup.string().required("hows bout you try again...").min(6).max(15)
        

    }),
    
    handleSubmit (values, { setStatus } ) {
        axios
          .post("https://reqres.in/api/users", values)
          .then(res => {
              setStatus(res.data);
          })
          .catch(err => console.log(err.response));
        

    }

})(OnboardForm);

export default FormikOnboardForm;