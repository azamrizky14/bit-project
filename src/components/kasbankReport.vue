<template>
    <b-dropdown id="dropdown2" variant="primary" size="xs" right>
        <b-dropdown-item>
            <div>
                <strong>Export</strong>
            </div>
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click="generatePDF">PDF</b-dropdown-item>
        <b-dropdown-item>xls</b-dropdown-item>
    </b-dropdown>
</template>
  
<script>
import jsPDF from 'jspdf';

export default {
    methods: {
    generatePDF() {

        const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'portrait' });

      // Your array data
      const dataArray = [
        { code: '001', name: 'Kas Besar', nominal: 20000 },
        { code: '001', name: 'Kas Besar', nominal: 20000 },
        { code: '002', name: 'Kas Kecil', nominal: 15000 },
        { code: '002', name: 'Kas Kecil', nominal: 30000 },
      ];
      const firstTableX = 0;
      const firstCellHeight = 15;
      const firstCellWidths = [maxWidth * 0.275, maxWidth * 0.45, maxWidth * 0.275 ]

      // Define the positions and dimensions for manual table
      const maxWidth = doc.internal.pageSize.width - 20
      const tableX = 10;
      const tableY = 10;
      const cellWidths = [ maxWidth * 0.25, maxWidth * 0.50, maxWidth * 0.25]; // Adjust cell widths as needed
      const cellHeight = 10;

      // Manual Table Height
      const manualTableHeight = (dataArray.length + 1) * cellHeight

    // Calculate the positions for the squares and text
    const squareWidth65 = maxWidth * 0.65;
      const squareWidth35 = maxWidth * 0.35;
      const squareHeight = manualTableHeight;
      const squareY = 10;


      doc.rect(firstTableX, tableY, firstCellWidths[0], firstCellHeight);
      doc.text(firstTableX + 10, tableY + 7, 'Kode Akun');
      doc.rect(firstTableX + firstCellWidths[0], tableY, firstCellWidths[1], firstCellHeight);
      doc.text(firstTableX + firstCellWidths[0] + 35, tableY + 7, 'Nama Akun');
      doc.rect(firstTableX + firstCellWidths[0] + firstCellWidths[1], tableY, firstCellWidths[2], firstCellHeight);
      doc.text(firstTableX + firstCellWidths[0] + firstCellWidths[1] + 12, tableY + 7, 'Nominal');

      // Draw the headers manually
      doc.rect(tableX, tableY, cellWidths[0], cellHeight);
      doc.text(tableX + 10, tableY + 7, 'Kode Akun');
      doc.rect(tableX + cellWidths[0], tableY, cellWidths[1], cellHeight);
      doc.text(tableX + cellWidths[0] + 35, tableY + 7, 'Nama Akun');
      doc.rect(tableX + cellWidths[0] + cellWidths[1], tableY, cellWidths[2], cellHeight);
      doc.text(tableX + cellWidths[0] + cellWidths[1] + 12, tableY + 7, 'Nominal');

      // Draw the data cells manually
      let currentY = tableY + cellHeight;
      dataArray.forEach(item => {
        doc.setFontSize(12);
        doc.rect(tableX, currentY, cellWidths[0], cellHeight);
        doc.text(tableX + 2, currentY + 7, item.code);
        doc.rect(tableX + cellWidths[0], currentY, cellWidths[1], cellHeight);
        doc.text(tableX + cellWidths[0] + 2, currentY + 7, item.name);
        doc.rect(tableX + cellWidths[0] + cellWidths[1], currentY, cellWidths[2], cellHeight);
        doc.text(tableX + cellWidths[0] + cellWidths[1] + 2, currentY + 7, item.nominal.toString());
        currentY += cellHeight;
      });

      // Draw the first square and underline
      doc.rect(10, squareY + squareHeight, squareWidth65, 10);
      doc.setFontSize(12);
      doc.text(12, squareY + squareHeight + 6, 'Terbilang :');
      doc.line(33, squareHeight + 18, 7 + squareWidth65, squareHeight + 18);

      // Draw the second square and underline
      doc.rect(10 + squareWidth65, squareY + squareHeight, squareWidth35, 10);
      doc.text(squareWidth65 + 12, squareY + squareHeight + 7, 'Total :');
      doc.line(25 + squareWidth65, squareHeight + 18, 7 + squareWidth35 + squareWidth65, squareHeight + 18);
    

      // Draw square shape with "Note:" text
      const noteText = 'Catatan :';
      const noteBoxWidth = maxWidth;
      const noteBoxHeight = 30;
      const noteBoxX = 10;
      const noteBoxY = squareY + squareHeight + 10; // Adjust the Y position to provide spacing between the squares and the note

      doc.rect(noteBoxX, noteBoxY, noteBoxWidth, noteBoxHeight);
      doc.text(noteBoxX + 2, noteBoxY + 5, noteText);
      doc.setFontSize(12);
      doc.text(noteBoxX + 7.5, noteBoxY + 10, noteText);

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

      doc.save('document_with_squares_and_underlines.pdf');
    }   
      
    //     generatePdf() {

    //         const doc = new jsPDF();
    //   const tableData = [
    //     { prop1: 'A1', prop2: 'B1', prop3: 'C1' },
    //     { prop1: 'A2', prop2: 'B2', prop3: 'C2' },
    //     { prop1: 'A3', prop2: 'B3', prop3: 'C3' }
    //   ];
    //   const tableHeader = [
    //     { label: 'Header 1', key: 'prop1' },
    //     { label: 'Header 2', key: 'prop2' },
    //     { label: 'Header 3', key: 'prop3' }
    //   ];

    //   const pageWidth = maxWidth;
    //   const title = 'Laporan List Data Kasbank';
    //   const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    //   const titleX = (pageWidth - titleWidth) / 2;

    //         const filteredData = this.header.columns.filter(x => x.data !== 'action')
    //   // Start creating PDF
    //   doc.autoTable({
    //     head: [filteredData.map(item => item.title)],
    //     body: this.data.map(item => filteredData.map(header => item[header.data])),
    //     startY: 40
    //   });

    //   doc.text(title, titleX, 20);
    //   doc.save('tabledata.pdf');
    // }
    },
    props: {
        data: Array,
        header: Object
    },
};
</script>
<style>
</style>
  