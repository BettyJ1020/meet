import React, { useState } from "react";
import './SignUp.css'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import Calendar from '../Calendar/Calendar'; // Import the Calendar component from the Calendar directory

const SignUp = () => {
    const [eventName, setEventName] = useState(""); // State variable to capture event name
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch('http://localhost:5191/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: eventName, // Pass the event name in the request body
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to store data');
            }

            console.log('Data stored successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (event) => {
        setEventName(event.target.value);
    };

    return (
        <div className="container">
            <div className="leftContainer">
                <h1 className="header">Date</h1>     
                <Calendar />          
            </div>
            <div className="rightContainer">
                <h1 className="header">Sign Up</h1>
                <form onSubmit={handleSubmit}> {/* Handle form submission */}
                    <div className="inputsContainer">
                        <div className="input">
                            {/* <input type="text" id="eventName" placeholder="New Event Name"/> */}
                            <input 
                                type="text" 
                                id="eventName" 
                                placeholder="New Event Name" 
                                value={eventName} // Bind value to state variable
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>   
                        <button type="submit" className="submitButton">Create</button>                                        
                    </div>
                </form>
                
            </div>            
        </div>
    )
}

export default SignUp