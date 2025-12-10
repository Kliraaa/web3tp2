import { animate, splitText, stagger } from "https://esm.sh/animejs";


//Animation du tapissage du texte
const paragraphs = document.querySelectorAll(".message p");

/*paragraphs.forEach((p, index) => {

    const { chars } = splitText(p, {
        chars: { wrap: "clip" }
    });

    animate(chars, {
        x: [{ to: ["100%", "0%"] }],
        duration: 0,
        ease: "out(1)",
        delay: stagger(30, { start: index * 300 }),
    });

});*/

function typeParagraph(element, speed = 30) {
    return new Promise(resolve => {

        const text = element.textContent.trim();
        
        element.textContent = "";               
        element.style.visibility = "visible";

        let i = 0;

        function type() {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }

        type();
    });
}

async function typeAllParagraphs() {
    const paragraphs = document.querySelectorAll(".message p");

    for (const p of paragraphs) {
        await typeParagraph(p, 40);
    }
}

typeAllParagraphs();


const typeSynth = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: {
        attack: 0.001,
        decay: 0.05,
        sustain: 0,
        release: 0.05
    }
}).toDestination();

function typeParagraph(element, speed = 30) {
    return new Promise(resolve => {
        const text = element.textContent.trim();
        element.textContent = "";
        let i = 0;

        async function type() {
            if (i < text.length) {
                element.textContent += text[i];

                typeSynth.triggerAttackRelease("C6", "8n");  

                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }

        type();
    });
}

async function typeAllParagraphs() {
    const paragraphs = document.querySelectorAll(".message p");

    for (const p of paragraphs) {
        await typeParagraph(p, 40); 
    }
}

typeAllParagraphs();


window.addEventListener("click", async () => {
    await Tone.start();
    console.log("🔊 Audio enabled");
}, { once: true });
