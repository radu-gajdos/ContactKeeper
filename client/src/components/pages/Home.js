import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    return (
        <div style={{ margin: "5%" }}>
            <div className="grid-2">
                <div>
                    <ContactForm />
                </div>
                <div>
                    <ContactFilter />
                    <Contacts />
                </div>
            </div>
        </div>
    );
};

export default Home;
