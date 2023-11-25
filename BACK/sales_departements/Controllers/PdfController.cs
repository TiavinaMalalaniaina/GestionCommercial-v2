
using Aspose.Pdf;
using Microsoft.AspNetCore.Mvc;
using sales_departements.Models;

namespace sales_departements.Controllers
{
    [Route ("pdf")]
    public class PdfController : Controller
    {
        // private readonly ExportPdf _pdfService;

        // public PdfController(ExportPdf pdfService)
        // {
        //     _pdfService = pdfService;
        // }


        [HttpGet]
        [Route("create-table")]
        public IActionResult CreatePdfWithTable()
        {
            ExportPdf exportPdf = new ExportPdf();
            var pdfPath = "/home/mirlin/ITUniversity/Projets/S5/Mr_Tovo/PDF/file/document.pdf";
            var imagePath = "/home/mirlin/ITUniversity/Projets/S5/Mr_Tovo/PDF/file/logo.jpg";
            exportPdf.CreatePdf(pdfPath, "");
            exportPdf.CreatePdfWithImage(pdfPath, imagePath);
            exportPdf.CreatePdfWithTable(pdfPath);

            return PhysicalFile(pdfPath, "application/pdf", "document.pdf");
        }


    }
}
