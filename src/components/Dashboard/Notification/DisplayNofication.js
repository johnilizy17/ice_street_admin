import React, { useState, useEffect } from "react";

export default function NotificationVendDisplay({ item, id, disable, setDisable, tracker, setTracker }) {
    const [reading, setReading] = useState(0);
    const [alert, setAlert] = useState(false);
    const [clicked, setclicked] = useState(false);
    const scrollingId = id * 150;
    useEffect(() => {
        if (item.status == "read") {
            setclicked(true);
        }
        if (id == tracker) {
        } else {
            setReading(0);
            setAlert(false);
        }
    }, [tracker]);

    function toggleAlert() {
        setTracker(id);
        if (alert) {
            setAlert(false);
            setDisable(false);
        } else {
            setAlert(true);
            setDisable(true);
        }
    }

    function collaspe() {
        setclicked(true);

        setTracker(id);
        const add = reading + 1;
        if (reading < 1) {
            setReading(add);
        } else {
            setReading(0);
        }
    }

    function DeletedData() {
        toggleAlert();

    }


    const ActivateButton = () => {
        console.log("hello")
    };

    return (
        <div className="CardPosition">
            {alert && (
                <div className="AlertNotifcation">
                    {/* <X
                        style={{ marginLeft: "92%", marginTop: -5 }}
                        onClick={() => toggleAlert()}
                    /> */}
                    <div className="AlertChoose">
                        <div className="AlertChooseText"
                            onClick={() => {
                                if (reading != 0) {
                                    toggleAlert();
                                    setReading(0);
                                }
                            }}
                            style={reading == 0 ? { color: "green" } : { color: "green" }}
                        >
                            Accept
                        </div>

                        <div className="AlertChooseText"
                            onClick={() => {
                                if (!clicked) {
                                    setclicked(true);
                                    toggleAlert();
                                }
                            }}
                            style={clicked ? { color: "red" } : { color: "red" }}
                        >
                            Reject
                        </div>

                        <div className="AlertChooseText"
                            onClick={() => {
                                DeletedData();
                            }}
                            style={{color:"blue"}}
                        >
                            View
                        </div>
                    </div>
                </div>
            )}

            <div className="NotificationCard"
                key={item.uniqueID}
                style={
                    clicked && reading < 1
                        ? {
                            background: "#000",
                            border: "2px solid #000",
                            height: 110,
                        }
                        : clicked
                            ? {
                                background: "#003333",
                                border: "2px solid #003333",
                                borderRadius: 8,
                            }
                            : reading < 1
                                ? { height: 108, border: "2px solid #003333" }
                                : { borderRadius: 8, border: "2px solid #000" }
                }
            >
                {reading > 0 && (
                    <div
                        onClick={() => {
                            if (!disable) {
                                toggleAlert();
                            }
                        }}
                        style={{ marginLeft: "95%", marginTop: -2 }}
                    >
                        <svg width="6" height="23" viewBox="0 0 6 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.10003 22.0108C4.25982 22.0108 5.20001 21.1421 5.20001 20.0704C5.20001 18.9987 4.25982 18.1299 3.10003 18.1299C1.94024 18.1299 1 18.9987 1 20.0704C1 21.1421 1.94024 22.0108 3.10003 22.0108Z" fill="#007575" stroke="#007575" stroke-width="0.264603" stroke-miterlimit="22.9256" />
                            <path d="M3.10003 13.5089C4.25982 13.5089 5.20001 12.6401 5.20001 11.5684C5.20001 10.4967 4.25982 9.62793 3.10003 9.62793C1.94024 9.62793 1 10.4967 1 11.5684C1 12.6401 1.94024 13.5089 3.10003 13.5089Z" fill="#007575" stroke="#007575" stroke-width="0.264603" stroke-miterlimit="22.9256" />
                            <path d="M3.10003 5.00792C4.25982 5.00792 5.20001 4.13914 5.20001 3.06744C5.20001 1.99574 4.25982 1.12695 3.10003 1.12695C1.94024 1.12695 1 1.99574 1 3.06744C1 4.13914 1.94024 5.00792 3.10003 5.00792Z" fill="#007575" stroke="#007575" stroke-width="0.264603" stroke-miterlimit="22.9256" />
                        </svg>

                        {/* <Menu /> */}
                    </div>
                )}

                {/*  */}
                <div className="NotificationCardContainer">
                    <div
                        onClick={() => {
                            if (!disable) {
                                collaspe();
                            }
                        }}
                    >
                        <img src="/brand/trophy.png" alt="logo"
                            style={{ width: 40 }} />
                    </div>
                    {reading < 1 && (
                        <div
                            style={{ right: 10, top: 7, position: "absolute" }}
                            onClick={() => {
                                if (!disable) {
                                    toggleAlert();
                                }
                            }}
                        >
                            <svg width="6" height="23" viewBox="0 0 6 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.10003 22.0108C4.25982 22.0108 5.20001 21.1421 5.20001 20.0704C5.20001 18.9987 4.25982 18.1299 3.10003 18.1299C1.94024 18.1299 1 18.9987 1 20.0704C1 21.1421 1.94024 22.0108 3.10003 22.0108Z" fill="#007575" stroke="#007575" stroke-width="0.264603" stroke-miterlimit="22.9256" />
                                <path d="M3.10003 13.5089C4.25982 13.5089 5.20001 12.6401 5.20001 11.5684C5.20001 10.4967 4.25982 9.62793 3.10003 9.62793C1.94024 9.62793 1 10.4967 1 11.5684C1 12.6401 1.94024 13.5089 3.10003 13.5089Z" fill="#007575" stroke="#007575" stroke-width="0.264603" stroke-miterlimit="22.9256" />
                                <path d="M3.10003 5.00792C4.25982 5.00792 5.20001 4.13914 5.20001 3.06744C5.20001 1.99574 4.25982 1.12695 3.10003 1.12695C1.94024 1.12695 1 1.99574 1 3.06744C1 4.13914 1.94024 5.00792 3.10003 5.00792Z" fill="#007575" stroke="#007575" stroke-width="0.264603" stroke-miterlimit="22.9256" />
                            </svg>

                        </div>
                    )}
                    <div className="CardContent">
                        <div className="CardContentHeader"
                            onClick={() => {
                                if (!disable) {
                                    collaspe();
                                }
                            }}
                        >
                            <h4>{item.header}</h4>
                            {reading > 0 && (
                                <div
                                    style={{
                                        width: "50px",
                                        borderBottom: "1px solid #006E72",
                                        marginBottom: 18,
                                    }}
                                ></div>
                            )}
                        </div>
                        <div className="CardContentBody">
                            <div className="CardContentBodyParagraph"
                                onClick={() => {
                                    if (!disable) {
                                        collaspe();
                                    }
                                }}
                                style={
                                    reading < 1
                                        ? { WebkitLineClamp: 1 }
                                        : reading < 2
                                            ? { WebkitLineClamp: 3, color: "#C6F6F2" }
                                            : { WebkitLineClamp: 20, color: "#C6F6F2" }
                                }
                            >
                                {item.text}
                            </div>
                            {reading > 0 && (
                                <div className="CardContentOptions"
                                    onClick={() => {
                                        if (!disable) {
                                            if (reading < 2) {
                                                setReading(2);
                                            } else {
                                                setReading(1);
                                            }
                                        }
                                    }}
                                >
                                    {reading < 2 ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                marginLeft: 4,
                                                flexDirection: "row",
                                            }}
                                        >
                                            Read more{" "}
                                            {/* <Dropdown style={{ marginLeft: 10, marginTop: 6 }} /> */}
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex",
                                                marginLeft: 4,
                                                flexDirection: "row",
                                            }}
                                        >
                                            Show less{" "}
                                            {/* <UpArrow style={{ marginLeft: 10, marginTop: 6 }} /> */}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="CardContentTimeStampContainer"
                    onClick={() => {
                        if (!disable) {
                            collaspe();
                        }
                    }}
                >
                    <p
                        style={
                            reading < 1
                                ? { marginTop: -8, color: "#00D0BE" }
                                : { color: "#00D0BE", marginTop: 15 }
                        }
                    >
                        20.30 hrs
                    </p>
                </div>
            </div>
        </div>
    );
}
