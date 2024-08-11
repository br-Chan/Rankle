const inputModules = [
    {
        query_text: "Guesses made:",
        button_labels: [1, 2, 3, 4, 5, 6, "X"],
        button_values: [100, 90, 80, 60, 40, 20, 0],
    }
]

const statModules = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        game_name: 'Wordle',
        // input_modules: [inputModules[0]],
        theme_color: '#67a561',
    },
]

module.exports = {
    statModules,
};
