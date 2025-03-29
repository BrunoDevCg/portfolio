// Função para mesclar os PDFs
async function mergePDFs(pdfFile1, pdfFile2) {
    const { PDFDocument } = PDFLib;  // Carrega a biblioteca PDF-lib
    
    // Carrega os arquivos PDF
    const pdfBytes1 = await pdfFile1.arrayBuffer();
    const pdfBytes2 = await pdfFile2.arrayBuffer();

    // Cria um novo documento PDF
    const mergedPdf = await PDFDocument.create();

    // Carrega os documentos PDF existentes
    const pdf1 = await PDFDocument.load(pdfBytes1);
    const pdf2 = await PDFDocument.load(pdfBytes2);

    // Adiciona as páginas dos PDFs ao novo documento
    const pagesPdf1 = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
    const pagesPdf2 = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());

    // Insere as páginas no documento final
    pagesPdf1.forEach(page => mergedPdf.addPage(page));
    pagesPdf2.forEach(page => mergedPdf.addPage(page));

    // Serializa o PDF combinado para um array de bytes
    const mergedPdfBytes = await mergedPdf.save();
    return mergedPdfBytes;
}

// Função para lidar com o evento de clique no botão de mesclar
document.getElementById('mergeBtn').addEventListener('click', async () => {
    const fileInput1 = document.getElementById('pdf1');
    const fileInput2 = document.getElementById('pdf2');

    if (fileInput1.files.length === 0 || fileInput2.files.length === 0) {
        alert('Por favor, selecione dois arquivos PDF.');
        return;
    }

    const pdfFile1 = fileInput1.files[0];
    const pdfFile2 = fileInput2.files[0];

    try {
        // Chama a função para mesclar os PDFs
        const mergedPdfBytes = await mergePDFs(pdfFile1, pdfFile2);

        // Cria um link para download do PDF combinado
        const downloadLink = document.getElementById('downloadLink');
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.style.display = 'block';  // Torna o link visível
    } catch (error) {
        alert('Erro ao mesclar os PDFs: ' + error.message);
    }
});
