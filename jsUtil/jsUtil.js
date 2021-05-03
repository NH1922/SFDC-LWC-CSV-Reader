const parseCSV = function* (str) {
    for (var quote = 0, arr = [], row = 0, col = 0, c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c + 1];       // Current character, next character
        arr[col] = arr[col] || '';   // Create a new column (start with empty string) if necessary

        // If the current character is a quotation mark, and we're inside a
        // quoted field, and the next character is also a quotation mark,
        // add a quotation mark to the current column and skip the next character
        cc == '"' && quote && nc == '"' ? (arr[col] += cc, ++c) :

            // If it's just one quotation mark, begin/end quoted field
            cc == '"' ? (quote = !quote) :

                // If it's a comma and we're not in a quoted field, move on to the next column
                cc == ',' && !quote ? (++col) :

                    // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
                    // and move on to the next row and move to column 0 of that new row
                    cc == '\r' && nc == '\n' && !quote ? (yield arr, col = 0, arr = [], ++c) :

                        // If it's a newline (LF or CR) and we're not in a quoted field,
                        // move on to the next row and move to column 0 of that new row
                        (cc == '\n' || cc == '\r') && !quote ? (yield arr, col = 0, arr = []) :

                            // Otherwise, append the current character to the current column
                            (arr[col] += cc)
    }
    arr.length && (yield arr)
}

const parseCSVSync = function (str) {
    var arr = [];
    var quote = false;  // 'true' means we're inside a quoted field

    // Iterate over each character, keep track of current row and column (of the returned array)
    for (var row = 0, col = 0, c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c + 1];        // Current character, next character
        arr[row] = arr[row] || [];             // Create a new row if necessary
        arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary

        // If the current character is a quotation mark, and we're inside a
        // quoted field, and the next character is also a quotation mark,
        // add a quotation mark to the current column and skip the next character
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

        // If it's just one quotation mark, begin/end quoted field
        if (cc == '"') { quote = !quote; continue; }

        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == ',' && !quote) { ++col; continue; }

        // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
        // and move on to the next row and move to column 0 of that new row
        if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

        // If it's a newline (LF or CR) and we're not in a quoted field,
        // move on to the next row and move to column 0 of that new row
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }
        if (cc == '\r' && !quote) { ++row; col = 0; continue; }

        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
    }
    return arr;
}

export { parseCSV, parseCSVSync }