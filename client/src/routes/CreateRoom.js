import React from "react";
import { v1 as uuid } from "uuid";

const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        props.history.push(`/admin/${id}`);
    }

    return (
        <button class="button" onClick={create}>Start Study</button>
    );
}

export default CreateRoom;