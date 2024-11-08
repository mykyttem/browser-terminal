const HandlerClear = (e, input, setInput, setOutput) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add the input command to the output
    setOutput((prev) => [...prev, `> ${input}`]);

    // Check for the "clear" command
    if (input.trim().toLowerCase() === 'clear') {
        setOutput([]);
    } else {
        setOutput((prev) => [...prev, 'Unknown command, try read documentation']);
    }

    setInput('');
};


export { 
    HandlerClear
};