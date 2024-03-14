import React, { useEffect } from "react";
import { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../layout/Spinner";

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, getContacts, filtered, loading } = contactContext;

    useEffect(() => {
        getContacts();
        //es-lint-disable-next-line
    }, []);

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map((contact) => (
                              <CSSTransition
                                  key={contact.id}
                                  timeout={500}
                                  classNames="item"
                              >
                                  <ContactItem contact={contact} />
                              </CSSTransition>
                          ))
                        : contacts.map((contact) => (
                              <CSSTransition
                                  key={contact.id}
                                  timeout={500}
                                  classNames="item"
                              >
                                  <ContactItem contact={contact} />
                              </CSSTransition>
                          ))}
                </TransitionGroup>
            ) : (
                <Spinner />
            )}
        </Fragment>
    );
};

export default Contacts;
