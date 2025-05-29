document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formatButton").addEventListener("click", function () {
        let input = document.getElementById("phoneNumbers").value.trim();
        if (!input) {
            alert("Please enter phone numbers.");
            return;
        }

        let callerNumbers = [];
        let calleeNumbers = [];

        // Process each line of input
        input.split("\n").forEach(line => {
            let numbers = line.split(/\s+/).map(num => num.trim()); // Split on spaces or tabs
            if (numbers.length === 2) {
                callerNumbers.push(`"+${numbers[0]}"`);
                calleeNumbers.push(`"+${numbers[1]}"`);
            }
        });

        if (callerNumbers.length === 0 || calleeNumbers.length === 0) {
            alert("Invalid input format. Ensure two columns of phone numbers.");
            return;
        }

        let formattedString = `{\"query\": {\"bool\": {\"must\": [` +
            `{\"terms\": {\"caller\": [${callerNumbers.join(", ")}]}} ,` +
            `{\"terms\": {\"callee\": [${calleeNumbers.join(", ")}]}}` +
            `]}}}`;

        document.getElementById("output").value = formattedString;

        // Copy to clipboard
        navigator.clipboard.writeText(formattedString).then(() => {
            alert("Copied!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    });
});
