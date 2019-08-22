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
            <h1></h1>
        </div>
       
    )
}

export default OnboardForm;