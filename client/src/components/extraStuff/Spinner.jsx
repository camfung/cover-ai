import React from "react";
import Sketch from "react-p5";
import { Button } from "@mui/material";
const Spinner = () => {
    let angle = 0;
    let spinning = false;
    let spinDuration = 0;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(400, 400).parent(canvasParentRef);
    };

    const draw = (p5) => {
        p5.clear(); // Makes the background transparent

        // Draw the spinning circle
        p5.push(); // Save the current drawing state
        p5.translate(p5.width / 2, p5.height / 2);
        p5.rotate(angle);
        p5.fill("red");
        p5.arc(0, 0, 300, 300, 0, p5.PI);
        p5.fill("blue");
        p5.arc(0, 0, 300, 300, p5.PI, p5.TWO_PI);
        p5.pop();

        p5.fill("black");
        p5.triangle(p5.width / 2 - 10, 0, p5.width / 2 + 10, 0, p5.width / 2, 50);

        // Spin logic
        if (spinning) {
            angle += 0.1;
            if (angle > spinDuration) {
                spinning = false;
                angle = angle % p5.TWO_PI;
            }
        }
    };

    const spin = () => {
        spinning = true;
        spinDuration = Math.random() * 10 + 10;
    };

    return (
        <div>
            <Sketch setup={setup} draw={draw} />
            <Button variant="contained" onClick={spin}>Spin</Button>
        </div>
    );
};

export default Spinner;
