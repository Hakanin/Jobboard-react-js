import React from 'react';

const CircleBackground = () => {
    const colors = ['#0056A8', '#FF4081', '#FFD700', '#0D47A1', '#FF5252', '#3e4249'];
    const circleCount = 30; // Ajuste le nombre de cercles ici

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const getRandomColor = () => colors[getRandomInt(0, colors.length)];

    const circles = Array.from({ length: circleCount }).map((_, index) => {
        const size = getRandomInt(10, 60); // Taille des cercles entre 10px et 60px
        const top = getRandomInt(0, 100); // Position verticale en pourcentage
        const left = getRandomInt(0, 100); // Position horizontale en pourcentage

        return (
            <div
                key={index}
                className="circle"
                style={{
                    width: size,
                    height: size,
                    backgroundColor: getRandomColor(),
                    top: `${top}%`,
                    left: `${left}%`,
                }}
            />
        );
    });

    return <div className="circles-container">{circles}</div>;
};

export default CircleBackground;