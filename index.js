document.querySelector("#in").value = localStorage.code ?? "";

var pointer = 0;
var runtime = 0;

var run;

document.querySelector("#run").addEventListener("mouseup", (e) => {
    clearInterval(run);
    const code = document.querySelector("#in").value;
    const lines = code.split("\n");

    const out = document.querySelector("#out");

    out.innerHTML = "";

    pointer = 0;
    runtime = 0;

    run = setInterval(() => {
        runtime++;
        document.querySelector("#runtime").innerHTML = `Runtime: ${runtime}`;
        document.querySelector("#pointer").innerHTML = `Pointer: ${pointer}`;
        console.log(`reading line ${pointer}`);

        const command = lines[pointer]?.split(":")[0];
        const args = lines[pointer]?.split(":")[1];

        if (!lines[pointer] || command == "STOP") clearInterval(run);
        if (command == "SKIP") {
            pointer += Number(args ?? 1) + 1;
            return;
        }
        if (command == "PRINT") {
            if (!(Number(args) + 1)) {
                pointer++;
                return;
            }
            out.innerHTML += lines[Number(args)];
            pointer++;
            return;
        }
        if (command == "PRINTLN") {
            if (!(Number(args) + 1)) {
                pointer++;
                return;
            }
            out.innerHTML += lines[Number(args)] + "<br/>";
            pointer++;
            return;
        }
        if (command == "GO") {
            if (!(Number(args) + 1)) {
                pointer++;
                return;
            }
            pointer = Number(args);
            return;
        }
        if (command == "CLEAR") {
            out.innerHTML = "";
            pointer++;
            return;
        }
    }, 100);
});

document.querySelector("#in").addEventListener("input", (e) => {
    localStorage.code = document.querySelector("#in").value;
});