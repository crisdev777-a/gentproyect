// src/components/Background.js
import React, { useRef, useEffect } from 'react';

const Background = ({ isDarkMode }) => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Ajustar el tamaño del canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Configuración de nodos
        const nodes = [];
        const nodeCount = 200;
        const maxDistance = 150;
        let cursorNode = { x: 0, y: 0, active: false };
        let hue = 0;

        // Crear nodos
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                color: `hsl(${hue}, 100%, 50%)`
            });
        }

        canvas.addEventListener("mousemove", (event) => {
            cursorNode.x = event.clientX;
            cursorNode.y = event.clientY;
            cursorNode.active = true;
        });

        function updateNodeColors() {
            hue = (hue + 1) % 360;
            nodes.forEach(node => {
                node.color = `hsl(${hue}, 100%, 50%)`;
            });
        }

        setInterval(updateNodeColors, 100);

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach((node, index) => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();

                for (let j = index + 1; j < nodes.length; j++) {
                    const otherNode = nodes[j];
                    const dist = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
                    if (dist < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();

                        const distToCursor = Math.hypot(cursorNode.x - node.x, cursorNode.y - node.y);
                        if (distToCursor < maxDistance && cursorNode.active) {
                            ctx.beginPath();
                            ctx.moveTo(cursorNode.x, cursorNode.y);
                            ctx.lineTo(node.x, node.y);
                            ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
                            ctx.lineWidth = 0.8;
                            ctx.stroke();
                        }
                    }
                }

                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        animate();
    }, [isDarkMode]); // Añade isDarkMode como dependencia

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                backgroundColor: isDarkMode ? 'black' : 'white', // Cambia el color de fondo según el modo
            }}
        />
    );
};

export default Background;
