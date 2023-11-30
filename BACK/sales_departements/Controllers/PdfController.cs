using Aspose.Pdf;
using Microsoft.AspNetCore.Mvc;
using sales_departements.Context;
using sales_departements.Models;
using sales_departements.Models.pdf;

namespace sales_departements.Controllers
{
    [Route ("pdf")]
    public class PdfController : Controller
    {


        [HttpGet]
        [Route("create")]
        public ActionResult CreatePdfWithTable(string supplierId, List<string> requestDetailsString)
        {
            string? exception = null;
            object? data = null;
            try
            {
                SalesDepartementsContext context = new ();
                Supplier supplier = new Supplier().GetSupplier(context, supplierId);
                List<RequestDetail> requestDetails = new RequestDetail().GetRequestDetailsByListString(context, requestDetailsString);

                ExportPdf exportPdf = new ExportPdf();

                var pdfPath = "D:/ITUniversity/Projets/S5/Mr Tovo/SALES/document.pdf";
                var imagePath = "D:/ITUniversity/Projets/S5/Mr Tovo/SALES/logo.jpg";

                exportPdf.CreatePdf(pdfPath, "");
                //exportPdf.CreatePdfWithImage(pdfPath, imagePath);
                Document document = new Document();
                Page page = document.Pages.Add();

                exportPdf.AddCompanyInformation(context, supplier, pdfPath, document, page);
                exportPdf.CreateTable(pdfPath, document, page, requestDetails);
                exportPdf.Text(pdfPath, document, page, supplier.Name, "info", "ordi cahier stylo");
                return PhysicalFile(pdfPath, "application/pdf", "document.pdf");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
           

            return null;
        }
        


    }
}
