import React, { useEffect, useState } from 'react';

export default function Documentation() {

    useEffect(() => {
        fetch("http://localhost:8080/dog")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            });
    }, []);

    return (
        <div>
        </div>
    );
}