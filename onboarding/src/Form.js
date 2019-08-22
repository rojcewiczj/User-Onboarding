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
                   </ul>
                 
            ))}
        </div>
       
    )
}

const FormikOnboardForm = withFormik ({
    mapPropsToValues ({ name, email, password, termsOfService}) {
        return {
            termsOfService: termsOfService || false,
            name: name ||"",
            email: email || "",
            password: password || "",
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    

    }),

    
})