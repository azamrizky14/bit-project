import jsPDF from 'jspdf';
import { numberToText } from './terbilang';

const monthName = ['Januari', 'Februari', 'Maret', 'April','Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

export const kasbankByVoucher = async (data) => {

    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'portrait' });

    const maxWidth = doc.internal.pageSize.width - 20
    const firstTableY = 10;
    const firstCellHeight = 15;
    const firstCellWidths = [maxWidth * 0.275, maxWidth * 0.45, maxWidth * 0.275]

    // Define the positions and dimensions for manual table
    const tableX = 10;
    const tableY = 25;
    const cellWidths = [maxWidth * 0.25, maxWidth * 0.50, maxWidth * 0.25]; // Adjust cell widths as needed
    const cellHeight = 10;

    // Manual Table Height
    const manualTableHeight = (data.transData.length + 1) * cellHeight

    // Calculate the positions for the squares and text
    const squareWidth65 = maxWidth * 0.65;
    const squareWidth35 = maxWidth * 0.35;
    const squareHeight = manualTableHeight + 15;
    const squareY = 10;

    doc.setFontSize(8);
    doc.rect(tableX, firstTableY, firstCellWidths[0], firstCellHeight);
    doc.text(tableX + 2, firstTableY + 5, data.oleh);
    doc.rect(tableX + firstCellWidths[0], firstTableY, firstCellWidths[1], firstCellHeight);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.text(tableX + firstCellWidths[0] + 25, firstTableY + 10, data.title);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal'); // Set font to bold
    doc.rect(tableX + firstCellWidths[0] + firstCellWidths[1], firstTableY, firstCellWidths[2], firstCellHeight);
    doc.text(tableX + firstCellWidths[0] + firstCellWidths[1] + 2, firstTableY + 5, 'Nomor : ' + data.nomor);
    doc.line(tableX + firstCellWidths[0] + firstCellWidths[1], firstTableY + 7.5, tableX + firstCellWidths[0] + firstCellWidths[1] + firstCellWidths[2], firstTableY + 7.5); // Draw line below "Nomor" title
    doc.text(tableX + firstCellWidths[0] + firstCellWidths[1] + 2, firstTableY + 12.5, 'Tanggal : ' + data.tgl); // Draw text below the line


    // Draw the headers manually
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.rect(tableX, tableY, cellWidths[0], cellHeight);
    doc.text(tableX + 13.5, tableY + 7, 'Kode Akun');
    doc.rect(tableX + cellWidths[0], tableY, cellWidths[1], cellHeight);
    doc.text(tableX + cellWidths[0] + 37.5, tableY + 7, 'Nama Akun');
    doc.rect(tableX + cellWidths[0] + cellWidths[1], tableY, cellWidths[2], cellHeight);
    doc.text(tableX + cellWidths[0] + cellWidths[1] + 15, tableY + 7, 'Nominal');
    
    console.log('fase 0')
    // Draw the data cells manually
    let currentY = tableY + cellHeight;
    data.transData.forEach(item => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal'); // Set font to bold
        doc.rect(tableX, currentY, cellWidths[0], cellHeight);
        doc.text(tableX + 2, currentY + 6, item.code);
        doc.rect(tableX + cellWidths[0], currentY, cellWidths[1], cellHeight);
        doc.text(tableX + cellWidths[0] + 2, currentY + 6, item.name);
        doc.rect(tableX + cellWidths[0] + cellWidths[1], currentY, cellWidths[2], cellHeight);
        doc.text(tableX + cellWidths[0] + cellWidths[1] + 2, currentY + 6, 'Rp. ' + item.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        currentY += cellHeight;
    });
    console.log('fase 1')
    // Draw the first square and underline
    doc.rect(10, squareY + squareHeight, squareWidth65, 10);
    doc.setFontSize(12);
    doc.text(12, squareY + squareHeight + 6, 'Terbilang : '+ numberToText(data.transData.reduce((sum, item) => sum + parseInt(item.nominal), 0)));
    doc.line(33, squareHeight + 18, 7 + squareWidth65, squareHeight + 18);

    // Draw the second square and underline
    doc.rect(10 + squareWidth65, squareY + squareHeight, squareWidth35, 10);
    doc.text(squareWidth65 + 12, squareY + squareHeight + 7, 'Total : Rp. ' + data.transData.reduce((sum, item) => sum + parseInt(item.nominal), 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    doc.line(25 + squareWidth65, squareHeight + 18, 7 + squareWidth35 + squareWidth65, squareHeight + 18);

    console.log('fase 2')

    // Draw square shape with "Note:" text
    const noteText = 'Catatan :';
    const noteBoxWidth = maxWidth;
    const noteBoxHeight = 30;
    const noteBoxX = 10;
    const noteBoxY = squareY + squareHeight + 10; // Adjust the Y position to provide spacing between the squares and the note

    doc.rect(noteBoxX, noteBoxY, noteBoxWidth, noteBoxHeight);
    doc.text(noteBoxX + 2, noteBoxY + 5, noteText);
    doc.setFontSize(12);
    doc.text(noteBoxX + 7.5, noteBoxY + 10, data.catatan);

    // Draw four smaller squares with different texts and underlines
    const smallerSquareWidth = noteBoxWidth / 4;
    const smallerSquareHeight = 30;
    const smallerSquaresY = noteBoxY + noteBoxHeight; // Adjust spacing
    const smallerSquareTexts = ['Pembukuan', 'Mengetahui', 'Kasir', 'Penerima'];

    doc.setFontSize(10);
    for (let i = 0; i < 4; i++) {
        const smallerSquareX = noteBoxX + (smallerSquareWidth * i);
        doc.rect(smallerSquareX, smallerSquaresY, smallerSquareWidth, smallerSquareHeight);

        // Calculate text position for top center
        const textWidth = doc.getStringUnitWidth(smallerSquareTexts[i]) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textX = smallerSquareX + (smallerSquareWidth - textWidth) / 2;
        const textY = smallerSquaresY + 5; // Adjust vertical position

        doc.text(textX, textY, smallerSquareTexts[i]);

        // Draw underline below the text
        const underlineStartX = smallerSquareX;
        const underlineEndX = smallerSquareX + smallerSquareWidth;
        const underlineY = smallerSquaresY + 5 + 2; // Adjust for text position

        doc.line(underlineStartX, underlineY, underlineEndX, underlineY);
    }


    // Generate data for the main table (similar to previous code)
    // ...

    // Generate signatures table (similar to previous code)
    // ...

    doc.save(data.nomor + '.pdf');

};
export const kasbankByDate = async (data) => {

    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'portrait' });

    const maxWidth = doc.internal.pageSize.width - 20
    const firstTableY = 10;
    const firstCellWidths = [maxWidth * 0.275, maxWidth * 0.45, maxWidth * 0.275]

    // Define the positions and dimensions for manual table
    const tableX = 10;
    const tableY = 25;
    const cellWidths = [maxWidth * 0.15, maxWidth * 0.30, maxWidth * 0.15, maxWidth * 0.20, maxWidth * 0.20]; // Adjust cell widths as needed
    const cellHeight = 5;

    // Manual Table Height
    const manualTableHeight = (data.transData.length + 1) * cellHeight

    // Calculate the positions for the squares and text
    const squareWidth60 = maxWidth * 0.60;
    const squareWidth20 = maxWidth * 0.20;
    const squareHeight = manualTableHeight + 15;
    const squareY = 10;

    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.text(tableX + firstCellWidths[0] + 20, firstTableY + 7.5, data.title);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal'); // Set font to bold
    doc.text(tableX + firstCellWidths[0] + firstCellWidths[1] + 2, firstTableY + 12.5, 'Tanggal : ' + data.tgl); // Draw text below the line


    // Draw the headers manually
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.rect(tableX, tableY, cellWidths[0], cellHeight+5);
    doc.text(tableX + 5, tableY + 7, 'No. Bukti');
    doc.rect(tableX + cellWidths[0], tableY, cellWidths[1], cellHeight+5);
    doc.text(tableX + cellWidths[0] + 10, tableY + 7, 'Uraian Transaksi');
    doc.rect(tableX + cellWidths[0] + cellWidths[1], tableY, cellWidths[2], cellHeight+5);
    doc.text(tableX + cellWidths[0] + cellWidths[1] + 6, tableY + 7, 'Perkiraan');
    doc.rect(tableX + cellWidths[0] + cellWidths[1] + cellWidths[2], tableY, cellWidths[3], cellHeight+5);
    doc.text(tableX + cellWidths[0] + cellWidths[1] + cellWidths[2] + 6, tableY + 7, 'Penerimaan');
    doc.rect(tableX + cellWidths[0] + cellWidths[1] + cellWidths[2]+ cellWidths[3], tableY, cellWidths[3], cellHeight+5);
    doc.text(tableX + cellWidths[0] + cellWidths[1] + cellWidths[2]+ cellWidths[3] + 6, tableY + 7, 'Pengeluaran');

    // Draw the data cells manually
    let currentY = tableY + cellHeight+5;
    data.transData.forEach(item => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal'); // Set font to bold
        doc.rect(tableX, currentY, cellWidths[0], cellHeight);
        doc.text(tableX + 2, currentY + 3.5, item.bukti);
        doc.rect(tableX + cellWidths[0], currentY, cellWidths[1], cellHeight);
        doc.text(tableX + cellWidths[0] + 2, currentY + 3.5, item.name);
        doc.rect(tableX + cellWidths[0] + cellWidths[1], currentY, cellWidths[2], cellHeight);
        doc.text(tableX + cellWidths[0] + cellWidths[1] + 2, currentY + 3.5, item.code);
        doc.rect(tableX + cellWidths[0] + cellWidths[1], currentY, cellWidths[2] + cellWidths[3], cellHeight);
        doc.text(tableX + cellWidths[0] + cellWidths[1] + cellWidths[2] + 2, currentY + 3.5, 'Rp. ' + item.kredit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        doc.rect(tableX + cellWidths[0] + cellWidths[1], currentY, cellWidths[2] + cellWidths[3] + cellWidths[4], cellHeight);
        doc.text(tableX + cellWidths[0] + cellWidths[1] + cellWidths[2] + cellWidths[3] + 2, currentY + 3.5, 'Rp. ' + item.debet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        currentY += cellHeight;
    });
    
    console.log('fase 4')
    // Draw the first square and underline

    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.text(25 + squareWidth20 + squareWidth20, squareY + squareHeight +5 + 6, 'Total :');
    // Draw the second square and underline
    doc.rect(10 + squareWidth60, squareY + squareHeight+5, squareWidth20, 10);
    doc.text(squareWidth60 + 12, squareY + squareHeight+5 + 6, 'Rp. ' + data.transData.reduce((sum, item) => sum + item.kredit, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    // Draw the second square and underline

    
    console.log('fase 5')
    doc.rect(10 + squareWidth60, squareY + squareHeight+5, squareWidth20 + squareWidth20, 10);
    doc.text(squareWidth60 + squareWidth20 + 12, squareY + squareHeight+5 + 6, 'Rp. ' + data.transData.reduce((sum, item) => sum + item.debet, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    
    
    console.log('fase 6')
    doc.text(25 + squareWidth20 + squareWidth20, squareY + squareHeight+5 + 10 + 6, 'Saldo Awal :');
    // Draw the second square and underline
    doc.rect(10 + squareWidth60, squareY + squareHeight+5 + 10, squareWidth20 + squareWidth20, 10);
    doc.text(squareWidth60 + 12, squareY + squareHeight+5 + 10 + 6, 'Rp. ' + data.saldoAwal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    // Draw the second square and underline
    
    console.log('fase 7')
    doc.text(25 + squareWidth20 + squareWidth20, squareY + squareHeight+5 + 20 + 6, 'Saldo Akhir :');
    // Draw the second square and underline
    doc.rect(10 + squareWidth60, squareY + squareHeight+5 + 20, squareWidth20 + squareWidth20, 10);
    doc.text(squareWidth60 + 12, squareY + squareHeight+5 + 20 + 6, 'Rp. ' + (data.saldoAwal + data.transData.reduce((sum, item) => sum + item.kredit, 0) - data.transData.reduce((sum, item) => sum + item.debet, 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    
    console.log('fase 8')
    // Draw square shape with "Note:" text
    const noteBoxWidth = maxWidth;
    const noteBoxHeight = 30 + 25;
    const noteBoxX = 10;
    const noteBoxY = squareY + squareHeight+5; // Adjust the Y position to provide spacing between the squares and the note
    
    doc.setFont('helvetica', 'normal'); // Set font to bold
    doc.rect(noteBoxX, noteBoxY, noteBoxWidth, noteBoxHeight);
    doc.setFontSize(9);
    doc.text(noteBoxX + 2.5, noteBoxY + 14.5, 'Uang Tunai');
    doc.text(noteBoxX + 2.5, noteBoxY + 21, 'Bon Sementara');    
    doc.text(noteBoxX + 2.5, noteBoxY + 27.5, 'Saldo Kasir');    
    doc.text(noteBoxX + 2.5, noteBoxY + 34, 'Sisa Keuangan');    
    doc.text(noteBoxX + 2.5, noteBoxY + 40.5, 'Beda Kas');
        
    doc.text(noteBoxX + 30, noteBoxY + 14.5, ': Rp.');
    doc.line(noteBoxX + 37.5, noteBoxY + 14.5, noteBoxX + 72.5, noteBoxY + 14.5);
    doc.text(noteBoxX + 30, noteBoxY + 21, ': Rp.');
    doc.line(noteBoxX + 37.5, noteBoxY + 21, noteBoxX + 72.5, noteBoxY + 21);
    doc.text(noteBoxX + 30, noteBoxY + 27.5, ': Rp.');
    doc.line(noteBoxX + 37.5, noteBoxY + 27.5, noteBoxX + 72.5, noteBoxY + 27.5);
    doc.text(noteBoxX + 30, noteBoxY + 34, ': Rp.');
    doc.line(noteBoxX + 37.5, noteBoxY + 34, noteBoxX + 72.5, noteBoxY + 34);
    doc.text(noteBoxX + 30, noteBoxY + 40.5, ': Rp.');
    doc.line(noteBoxX + 37.5, noteBoxY + 40.5, noteBoxX + 72.5, noteBoxY + 40.5);

    // Draw four smaller squares with different texts and underlines
    const smallerSquareWidth = noteBoxWidth / 5;
    const smallerSquareHeight = 25;
    const smallerSquaresY = noteBoxY + 30; // Adjust spacing
    const smallerSquareTexts = ['Kasir', 'Accounting', 'Pimpinan'];

    doc.setFontSize(10);
    for (let i = 0; i < 3; i++) {
        const smallerSquareX = noteBoxX + (smallerSquareWidth * (i+2));
        doc.rect(smallerSquareX, smallerSquaresY, smallerSquareWidth, smallerSquareHeight);

        // Calculate text position for top center
        const textWidth = doc.getStringUnitWidth(smallerSquareTexts[i]) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textX = smallerSquareX + (smallerSquareWidth - textWidth) / 2;
        const textY = smallerSquaresY + 5; // Adjust vertical position

        doc.text(textX, textY, smallerSquareTexts[i]);

        // Draw underline below the text
        const underlineStartX = smallerSquareX;
        const underlineEndX = smallerSquareX + smallerSquareWidth;
        const underlineY = smallerSquaresY + 5 + 2; // Adjust for text position

        doc.line(underlineStartX, underlineY, underlineEndX, underlineY);
    }


    // Generate data for the main table (similar to previous code)
    // ...

    // Generate signatures table (similar to previous code)
    // ...

    doc.save(data.nomor + '.pdf');

};
export const kasbankByMonth = (data) => {
    console.log('ini',data)
    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });

    const maxWidth = doc.internal.pageSize.width - 20
    const firstTableY = 10; 
    const firstCellHeight = 15;
    const firstCellWidths = [maxWidth * 0.275, maxWidth * 0.45, maxWidth * 0.275]

    // Define the positions and dimensions for manual table
    const tableX = 10;
    const tableY = 25;
    const cellWidths = [maxWidth * 0.10, maxWidth * 0.20, maxWidth * 0.10]; // Adjust cell widths as needed
    const sisaWidths = maxWidth / 0.40
    const cellHeight = 6;

    // Manual Table Height
    const manualTableHeight = (data.saldoAwal.length + 1) * cellHeight

    // Calculate the positions for the squares and text
    const squareWidth65 = maxWidth * 0.65;
    const squareWidth35 = maxWidth * 0.35;
    const squareHeight = manualTableHeight + 15;
    const squareY = 10;

    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.text(tableX + firstCellWidths[0] + 25, firstTableY + 10, data.title);
    doc.setFontSize(12);
    doc.text(tableX + firstCellWidths[0] + firstCellWidths[1] + 2, firstTableY + 12.5, 'Bulan : ' + data.tgl); // Draw text below the line


    // Draw the headers manually
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.rect(tableX, tableY, cellWidths[0], cellHeight + 4);
    doc.text(tableX + 3, tableY + 7, 'Kode Akun');
    doc.rect(tableX + cellWidths[0], tableY, cellWidths[1], cellHeight + 4);
    doc.text(tableX + cellWidths[0] + 22.5, tableY + 7, 'Uraian');
    doc.rect(tableX + cellWidths[0] + cellWidths[1], tableY, cellWidths[2], cellHeight + 4);
    doc.text(tableX + cellWidths[0] + cellWidths[1] + 9, tableY + 7, 'Total');
    
    let currentY = tableY + cellHeight + 10;
    doc.rect(tableX, tableY + 10, cellWidths[2] + cellWidths[2] + cellWidths[1], cellHeight);
    doc.text(tableX + 5, tableY + 14.5, 'Saldo Awal Keuangan');
    // Draw the data cells manually
    data.saldoAwal.forEach(item => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal'); // Set font to bold
        doc.rect(tableX, currentY, cellWidths[0], cellHeight);
        doc.text(tableX + 2, currentY + 4, item.code);
        doc.rect(tableX + cellWidths[0], currentY, cellWidths[1], cellHeight);
        doc.text(tableX + cellWidths[0] + 2, currentY + 4, item.name);
        doc.rect(tableX + cellWidths[0] + cellWidths[1], currentY, cellWidths[2], cellHeight);
        doc.text(tableX + cellWidths[0] + cellWidths[1] + 2, currentY + 4, 'Rp. ' + item.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        currentY += cellHeight;
    });
    // Draw the first square and underline
    doc.rect(10, squareY + squareHeight + 10, cellWidths[0], cellHeight);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold'); // Set font to bold

    // Draw the second square and underline
    doc.rect(10 + cellWidths[0], squareY + squareHeight + 10, cellWidths[1], cellHeight);
    doc.text(10 + 2.5 + cellWidths[0], squareY + squareHeight + 10 + 4, 'Total : ');

    // Draw the second square and underline
    doc.rect(10 + cellWidths[1] + cellWidths[0], squareY + squareHeight + 10, cellWidths[0], cellHeight);
    doc.text(10 + 2.5 + cellWidths[1] + cellWidths[0], squareY + squareHeight + 10 + 4, 'Rp. ' + data.saldoAwal.reduce((sum, item) => sum + item.nominal, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    // batas
    let currentY1 = currentY + 16;
    doc.rect(tableX, currentY1 - 10, cellWidths[2] + cellWidths[2] + cellWidths[1], cellHeight);
    doc.text(tableX + 5, currentY1 - 5.5, 'Saldo Penerimaan Keuangan');
    // Draw the data cells manually
    data.saldoAwal.forEach(item => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal'); // Set font to bold
        doc.rect(tableX, currentY1 - 4, cellWidths[0], cellHeight);
        doc.text(tableX + 2, currentY1, item.code);
        doc.rect(tableX + cellWidths[0], currentY1 - 4, cellWidths[1], cellHeight);
        doc.text(tableX + cellWidths[0] + 2, currentY1, item.name);
        doc.rect(tableX + cellWidths[0] + cellWidths[1], currentY1 - 4, cellWidths[2], cellHeight);
        doc.text(tableX + cellWidths[0] + cellWidths[1] + 2, currentY1, 'Rp. ' + item.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        currentY1 += cellHeight;
    });
    


    doc.save(data.nomor + '.pdf');
};