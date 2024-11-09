export const HandlerClear = (e, input, setInput, setOutput) => {
    e.preventDefault();
    if (input.trim() === '') return;

    if (input.trim().toLowerCase() === 'clear') {
        setOutput([]);
    } else {
        setOutput((prev) => [...prev]);
    }

    setInput('');
};