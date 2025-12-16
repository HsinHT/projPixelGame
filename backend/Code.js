function doGet(e) {
    const params = e.parameter;
    const action = params.action;

    if (action === 'getQuestions') {
        return getQuestions(params.count);
    }

    return corsResponse({ error: 'Invalid action' });
}

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const action = data.action;

        if (action === 'submitScore') {
            return submitScore(data.payload);
        }

        return corsResponse({ error: 'Invalid action' });
    } catch (err) {
        return corsResponse({ error: err.toString() });
    }
}

function getQuestions(count) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('題目');
    const rows = sheet.getDataRange().getValues();
    const headers = rows.shift();

    const n = parseInt(count) || 5;
    const shuffled = rows.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, n);

    const questions = selected.map(row => ({
        id: row[0],
        text: row[1],
        options: [row[2], row[3], row[4], row[5]]
    }));

    return corsResponse({ questions: questions });
}

function submitScore(payload) {
    const userId = payload.userId;
    const userAnswers = payload.answers;

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Calculate Score
    const qSheet = ss.getSheetByName('題目');
    const qRows = qSheet.getDataRange().getValues();
    qRows.shift();

    const qMap = {};
    qRows.forEach(r => {
        qMap[r[0]] = r[6]; // Ans in Col 7 (Index 6)
    });

    let correctCount = 0;
    userAnswers.forEach(ans => {
        const correct = qMap[ans.questionId];
        if (correct && String(correct).trim() === String(ans.selectedOption).trim()) {
            correctCount++;
        }
    });

    // 2. Update '回答' Sheet
    const aSheet = ss.getSheetByName('回答');
    const aRows = aSheet.getDataRange().getValues();

    let rowIndex = -1;
    // Start from row 2 (index 1) to skip header
    for (let i = 1; i < aRows.length; i++) {
        if (String(aRows[i][0]).trim() === String(userId).trim()) {
            rowIndex = i + 1;
            break;
        }
    }

    const timestamp = new Date();
    const threshold = payload.threshold || 3;

    if (rowIndex === -1) {
        // New User
        // Columns: [ID, Count, Total, Max, FirstPass, Attempts, Time]
        const newRow = [
            userId,
            1,                                   // Count
            correctCount,                        // Total
            correctCount,                        // Max
            (correctCount >= threshold) ? correctCount : "", // FirstPass
            (correctCount >= threshold) ? 1 : "",            // Attempts
            timestamp
        ];
        aSheet.appendRow(newRow);
    } else {
        // Existing User
        const rowRange = aSheet.getRange(rowIndex, 1, 1, 7);
        const rowValues = rowRange.getValues()[0];

        let playCount = Number(rowValues[1]) + 1;
        let currentTotal = Number(rowValues[2]) + correctCount;
        let currentMax = Math.max(Number(rowValues[3]), correctCount);
        let firstPassScore = rowValues[4];
        let attemptsToPass = rowValues[5];

        // Logic for First Pass: Only update if it wasn't set before
        if (firstPassScore === "" && correctCount >= threshold) {
            firstPassScore = correctCount;
            attemptsToPass = playCount;
        }

        const updatedRow = [
            userId,
            playCount,
            currentTotal,
            currentMax,
            firstPassScore,
            attemptsToPass,
            timestamp
        ];

        rowRange.setValues([updatedRow]);
    }

    // Create details map: qId -> correct answer text
    const answerDetails = {};
    userAnswers.forEach(ans => {
        answerDetails[ans.questionId] = qMap[ans.questionId];
    });

    return corsResponse({
        success: true,
        score: correctCount,
        totalQuestions: userAnswers.length,
        details: answerDetails
    });
}

function corsResponse(data) {
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}

