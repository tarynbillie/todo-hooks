import React, { useState, useRef, useEffect } from "react";
// import ReactDOM from "react-dom";
import styled from "styled-components";

// import "./styles.css";

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  /* Change width of the form depending if the bar is opened or not */
  width: ${props => (props.barOpened ? "25rem" : "0.5rem")};
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
  cursor: ${props => (props.barOpened ? "auto" : "pointer")};
  padding: 2rem;
  height: 0.5rem;
  border-radius: 10rem;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Input = styled.input`
  font-size: 16px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${props => (props.barOpened ? "1rem" : "0rem")};
  border: none;
  color: black;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: black;
  }
`;

const Button = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.barOpened ? "auto" : "none")};
  cursor: ${props => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: black;
`;

function Search() {
    const [input, setInput] = useState("");
    const [barOpened, setBarOpened] = useState(false);
    const formRef = useRef();
    const inputFocus = useRef();

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // cleanup event when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    // When user clicks outside of the form, set bar opened to false, to close it
    const handleClick = e => {
        if (formRef.current.contains(e.target)) {
            // click was inside form, do nothing
            return;
        }
        console.log("Click outside the form, close it");
        setBarOpened(false);
    };

    const onFormSubmit = e => {
        // When form submited, clear input, close the searchbar and do something with input
        e.preventDefault();
        setInput("");
        setBarOpened(false);
        // After form submit, do what you want with the input value
        console.log(`Form was submited with input: ${input}`);
    };

    return (
        <div className="App">
            <Form
                barOpened={barOpened}
                onClick={() => {
                    // When form clicked, set state of baropened to true and focus the input
                    setBarOpened(true);
                    inputFocus.current.focus();
                }}
                // On submit, call the onFormSubmit function
                onSubmit={onFormSubmit}
                ref={formRef}
            >
                <Button type="submit" barOpened={barOpened}>
                    <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5,14 L14.71,14 L14.43,13.73 C15.41,12.59 16,11.11 16,9.5 C16,5.91 13.09,3 9.5,3 C5.91,3 3,5.91 3,9.5 C3,13.09 5.91,16 9.5,16 C11.11,16 12.59,15.41 13.73,14.43 L14,14.71 L14,15.5 L19,20.49 L20.49,19 L15.5,14 L15.5,14 Z M9.5,14 C7.01,14 5,11.99 5,9.5 C5,7.01 7.01,5 9.5,5 C11.99,5 14,7.01 14,9.5 C14,11.99 11.99,14 9.5,14 L9.5,14 Z" id="path-1">
                        </path>
                    </svg>
                </Button>
                <Input
                    onChange={e => setInput(e.target.value)}
                    ref={inputFocus}
                    value={input}
                    barOpened={barOpened}
                    placeholder="Search for a list..."
                />
            </Form>
        </div>
    );
}

export default Search;