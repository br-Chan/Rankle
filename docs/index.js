const wordleStat = document.getElementById('wordlestat');
const connectionsStat = document.getElementById('connectionsstat');
const submitButton = document.querySelector('.submit');
const rankleStat = document.querySelector('.ranklestat');
const copyButton = document.querySelector('.copyrankle');

function processStat(selectElement) {
    const stat = selectElement.value;
    const mark = stat * 100 / (selectElement.options.length-1);

    return mark;
}

submitButton.addEventListener("click", () => {
    const wordleMark = processStat(wordleStat);
    const connectionsMark = processStat(connectionsStat);
    const average = (wordleMark + connectionsMark) / 2;

    let grade = "F";
    if (average >= 85) {
        grade = "S";
    }
    else if (average >= 70){
        grade = "A";
    }
    else if (average >= 50) {
        grade = "B";
    }
    else if (average >= 35) {
        grade = "C";
    }
    else if (average >= 20) {
        grade = "D";
    }

    rankleStat.textContent = "TODAY'S RANKLE: " + grade;
})

copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(rankleStat.textContent);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
})