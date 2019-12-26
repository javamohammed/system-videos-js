import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import HeaderContainer from "../containers/HeaderContainer/HeaderContainer";
import BodyContainer from "../containers/BodyContainer/BodyContainer";

const HOST = "http://localhost:5000/confirm/email";
const ConfirmEmail = props => {
    const [message, setMessage] = useState('')

    let { id } = useParams();
    let { emailParam } = useParams();
    useEffect(() => {
      fetch(`${HOST}/${id}/${emailParam}`, {
        method: "GET"
      })
      .then(res => res.json())
        .then(res => {
            if (res.hasError) {
                    setMessage(res.errors[0].msg);
            }else{
                setMessage(` ${res.email} ${res.msg} go to login page :)`);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, [emailParam, id]);
  return (
    <React.Fragment>
      <HeaderContainer />
      <BodyContainer>
        <h4>{message}</h4>
      </BodyContainer>
    </React.Fragment>
  );
};

export default ConfirmEmail;
